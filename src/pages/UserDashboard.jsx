import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Card, Button, Form, InputGroup, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../services/api';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  // Refs untuk mencegah multiple requests dan infinite loops
  const hasFetchedRef = useRef(false);
  const mountedRef = useRef(false);
  const abortControllerRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  
  // Default placeholder image yang stabil
  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K";
  
  // Independent image base URL for uploads (port 3001)
  const imageBaseURL = 'http://localhost:3001';
  
  // Memoize user data untuk mencegah re-render
  const user = useMemo(() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }, []);

  // Function to get book cover URL with independent image handling
  const getBookCoverUrl = useCallback((book) => {
    // Check for cover_url from API response
    if (book.cover_url) {
      // If it's a relative path starting with /uploads
      if (book.cover_url.startsWith('/uploads')) {
        return `${imageBaseURL}${book.cover_url}`;
      }
      // If it's a relative path without /uploads, add it
      if (book.cover_url.startsWith('/') && !book.cover_url.startsWith('/uploads')) {
        return `${imageBaseURL}/uploads${book.cover_url}`;
      }
      // If it's already a full URL
      if (book.cover_url.startsWith('http')) {
        return book.cover_url;
      }
      // If it's just a filename, prepend with uploads path
      if (!book.cover_url.startsWith('/')) {
        return `${imageBaseURL}/uploads/${book.cover_url}`;
      }
    }
    
    // Fallback to cover property (for backward compatibility)
    if (book.cover) {
      // If it's a relative path starting with /uploads
      if (book.cover.startsWith('/uploads')) {
        return `${imageBaseURL}${book.cover}`;
      }
      // If it's a relative path without /uploads, add it
      if (book.cover.startsWith('/') && !book.cover.startsWith('/uploads')) {
        return `${imageBaseURL}/uploads${book.cover}`;
      }
      // If it's already a full URL
      if (book.cover.startsWith('http')) {
        return book.cover;
      }
      // If it's just a filename, prepend with uploads path
      if (!book.cover.startsWith('/')) {
        return `${imageBaseURL}/uploads/${book.cover}`;
      }
    }
    
    // Return placeholder if no cover found
    return defaultPlaceholder;
  }, [imageBaseURL, defaultPlaceholder]);

  // Stable function yang tidak berubah antar render
  const fetchPopularBooks = useCallback(async () => {
    // Prevent multiple calls
    if (hasFetchedRef.current || !mountedRef.current) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    hasFetchedRef.current = true;
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get('/books/popular', {
        signal: abortControllerRef.current.signal,
        timeout: 15000, // 15 second timeout
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      // Only update state if component is still mounted
      if (!mountedRef.current) {
        return;
      }
      
      const booksData = response.data.message?.books || response.data.data || response.data;
      const processedBooks = Array.isArray(booksData) ? booksData.slice(0, 6) : [];
      
      setBooks(processedBooks);
      setError('');
      
    } catch (error) {
      // Only handle errors if component is still mounted and request wasn't aborted
      if (!mountedRef.current) {
        return;
      }
      
      if (error.name === 'AbortError' || axios.isCancel(error)) {
        console.log('Request was cancelled');
        return;
      }
      
      console.error('Error fetching books:', error);
      setError('Gagal memuat daftar buku. Silakan coba lagi.');
      setBooks([]); // Clear books on error
      
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, []); // Empty dependency array - function is stable

  // Mount/unmount tracking
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      hasFetchedRef.current = false;
      
      // Cleanup
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Single fetch on mount
  useEffect(() => {
    if (mountedRef.current && !hasFetchedRef.current) {
      fetchPopularBooks();
    }
  }, [fetchPopularBooks]);

  // Stable search handler
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Navigate to AllBooks page with search query
    navigate(`/user/Books?search=${encodeURIComponent(searchQuery.trim())}`);
  }, [searchQuery, navigate]);

  const handleLogout = useCallback(() => {
    try {
      // Cancel ongoing requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      // Clear storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
      // Navigate to login
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even on error
      navigate('/login');
    }
  }, [navigate]);

  // Updated to match AllBooks navigation pattern
  const handleBookClick = useCallback((bookId) => {
    if (bookId) {
      navigate(`/user/Books/${bookId}`);
    }
  }, [navigate]);

  // Updated to match AllBooks navigation pattern  
  const handleViewAllBooks = useCallback(() => {
    navigate('/user/Books');
  }, [navigate]);

  // Manual refresh function
  const handleRefresh = useCallback(() => {
    hasFetchedRef.current = false; // Reset fetch flag
    fetchPopularBooks();
  }, [fetchPopularBooks]);

  // Handle image error with proper fallback
  const handleImageError = useCallback((e, bookTitle) => {
    // Prevent infinite loop by checking if already using placeholder
    if (e.target.src !== defaultPlaceholder) {
      console.log(`Failed to load image for: ${bookTitle}, trying placeholder`);
      e.target.src = defaultPlaceholder;
    }
  }, [defaultPlaceholder]);

  // Handle image load success
  const handleImageLoad = useCallback((e, bookTitle) => {
    // console.log(`Successfully loaded image for: ${bookTitle}`);
  }, []);

  // Render books list
  const renderBooks = useMemo(() => {
    if (!books.length) {
      return (
        <div className="text-center no-books">
          <p>Tidak ada buku yang ditemukan.</p>
          {error && (
            <Button 
              variant="outline-primary" 
              onClick={handleRefresh}
              disabled={loading}
            >
              Coba Lagi
            </Button>
          )}
        </div>
      );
    }

    return books.map(book => {
      const coverUrl = getBookCoverUrl(book);
      
      return (
        <Card key={`book-${book.id}`} className="books-card">
          <div 
            className="books-link" 
            onClick={() => handleBookClick(book.id)}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleBookClick(book.id);
              }
            }}
          >
            <div className="book-cover-container">
              <Card.Img 
                variant="top" 
                src={coverUrl} 
                alt={`Cover buku ${book.title}`}
                className="books-cover"
                loading="lazy"
                onError={(e) => handleImageError(e, book.title)}
                onLoad={(e) => handleImageLoad(e, book.title)}
              />
              {coverUrl === defaultPlaceholder && (
                <div className="no-cover-overlay">
                  <span>No Cover</span>
                </div>
              )}
              {book.stock === 0 && (
                <div className="stock-badge unavailable stock-overlay">
                  Habis
                </div>
              )}
            </div>
            <Card.Body className="books-info">
              <Card.Title className="books-title">{book.title}</Card.Title>
              <Card.Text className="books-author">{book.author}</Card.Text>
              <Card.Text className="books-year">Tahun: {book.publication_year}</Card.Text>
              
              {/* Show categories if available */}
              {book.categories && book.categories.length > 0 && (
                <div className="books-categories">
                  {book.categories.slice(0, 2).map((category, index) => (
                    <span key={index} className="category-badge">
                      {typeof category === 'object' ? category.name : category}
                    </span>
                  ))}
                </div>
              )}
              
              <Card.Text className="books-stock">
                <span className={`stock-badge ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                  {book.stock > 0 ? `Tersedia: ${book.stock}` : 'Tidak Tersedia'}
                </span>
              </Card.Text>
              
              {book.borrow_count > 0 && (
                <Card.Text className="books-popularity">
                  <small className="text-muted">Dipinjam: {book.borrow_count} kali</small>
                </Card.Text>
              )}
            </Card.Body>
          </div>
        </Card>
      );
    });
  }, [books, handleBookClick, handleRefresh, error, loading, getBookCoverUrl, handleImageError, handleImageLoad, defaultPlaceholder]);

  return (
    <>
      <div className="dashboard-container">
        {/* Navbar */}
        <Navbar expand="lg" className="navbar-custom">
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="navbar-nav-custom">
                <Nav.Link href="/dashboard" className="nav-item-custom active">Home</Nav.Link>
                <Nav.Link href="/user/Books" className="nav-item-custom">Daftar Buku</Nav.Link>
                <Nav.Link href="/user/reservations" className="nav-item-custom">Reservasi Buku</Nav.Link>
                <Nav.Link href="/user/FAQ" className="nav-item-custom">Layanan & Bantuan</Nav.Link>
              </Nav>
              <div className="navbar-profile">
                <div className="dropdown">
                  <Image
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Profile"
                    id="profileDropdown"
                    roundedCircle
                    className="profile-image"
                    data-bs-toggle="dropdown"
                  />
                  <div className="dropdown-menu dropdown-menu-end">
                    <a className="dropdown-item" href="/profiluser">Profile</a>
                    <button 
                      className="dropdown-item logout" 
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Welcome and Search Section */}
        <Container className="search-box">
          <div className="welcome-container">
            <div className="text-section">
              <h2 className="welcome-title">Selamat Datang{user?.name ? `, ${user.name}` : ''}</h2>
              <h3 className="welcome-subtitle">di Perpustakaan Universitas Perjuangan</h3>
              <br />
              <Form onSubmit={handleSearch}>
                <InputGroup className="search-input-group">
                  <Form.Control
                    type="text"
                    placeholder="Cari buku, penulis, tahun terbit"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    maxLength={100}
                    className="search-input"
                  />
                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={loading || !searchQuery.trim()}
                    className="search-button"
                  >
                    {loading ? 'Mencari...' : 'Cari'}
                  </Button>
                </InputGroup>
              </Form>
            </div>
            
            <div className="right-section">
              <img 
                src="https://th.bing.com/th/id/OIP.XGE6dPdRe6p4JRwicO88mQHaHS?rs=1&pid=ImgDetMain" 
                alt="Library illustration" 
                className="right-image"
                loading="lazy"
              />
            </div>
          </div>
        </Container>

        {/* Error Message */}
        {error && (
          <Container>
            <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
              <span>{error}</span>
              <Button 
                variant="outline-danger" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
              >
                {loading ? 'Memuat...' : 'Coba Lagi'}
              </Button>
            </div>
          </Container>
        )}

        {/* Popular Books Section */}
        <Container className="books-section">
          <div className="section-header">
            <h3 className="section-title">Buku Populer</h3>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={handleRefresh}
              disabled={loading}
            >
              {loading ? 'Memuat...' : 'Refresh'}
            </Button>
          </div>
          
          {loading && !books.length ? (
            <div className="text-center loading-section">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="loading-text">Memuat daftar buku...</p>
            </div>
          ) : (
            <>
              <div className="books-list">
                {renderBooks}
              </div>
              
              {/* View All Books Button */}
              {books.length > 0 && (
                <div className="text-center view-all-section">
                  <Button 
                    variant="outline-success" 
                    size="lg" 
                    onClick={handleViewAllBooks}
                    className="view-all-btn"
                  >
                    Lihat Semua Buku
                  </Button>
                </div>
              )}
            </>
          )}
        </Container>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2025 Universitas Perjuangan</p>
        </footer>
      </div>

      <style jsx="true">{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .navbar-custom {
          background-color: #56804E !important;
          padding: 15px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .navbar-nav-custom {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
        }

        .nav-item-custom {
          color: white !important;
          font-weight: 500;
          margin-right: 30px;
          padding: 8px 15px !important;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .nav-item-custom:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
        }

        .nav-item-custom.active {
          background-color: rgba(255, 255, 255, 0.2) !important;
          font-weight: 600;
        }

        .navbar-profile {
          margin-left: auto;
        }

        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          transition: all 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.8);
        }

        .search-box {
          margin-top: 50px;
          margin-bottom: 30px;
        }

        .welcome-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          margin-top: 20px;
        }

        .text-section {
          flex: 1;
        }

        .welcome-title {
          color: #333;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .welcome-subtitle {
          color: #56804E;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .search-input-group {
          margin-bottom: 20px;
        }

        .search-input {
          border: 2px solid #e0e0e0;
          border-radius: 25px 0 0 25px;
          padding: 12px 20px;
          font-size: 16px;
        }

        .search-input:focus {
          border-color: #56804E;
          box-shadow: 0 0 0 0.2rem rgba(86, 128, 78, 0.25);
        }

        .search-button {
          background-color: #56804E;
          border-color: #56804E;
          border-radius: 0 25px 25px 0;
          padding: 12px 25px;
          font-weight: bold;
        }

        .search-button:hover {
          background-color: #4a6d43;
          border-color: #4a6d43;
        }

        .right-section {
          width: 300px;
          height: 300px;
          background-color: #f3f3f3;
          border-radius: 15px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .right-image {
          width: 90%;
          height: 90%;
          object-fit: contain;
          border-radius: 10px;
        }

        .books-section {
          margin-top: 20px;
          margin-bottom: 40px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .section-title {
          color: #333;
          font-weight: bold;
          margin: 0;
        }

        .loading-section {
          padding: 60px 0;
        }

        .loading-text {
          margin-top: 15px;
          color: #666;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .books-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          border: none;
          height: 100%;
        }

        .books-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .books-link {
          color: inherit;
          text-decoration: none;
          display: block;
          height: 100%;
        }

        .book-cover-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background-color: #f8f9fa;
        }

        .books-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .books-cover:hover {
          transform: scale(1.05);
        }

        .no-cover-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0,0,0,0.7);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: bold;
          white-space: nowrap;
          pointer-events: none;
        }

        .books-info {
          padding: 20px;
        }

        .books-title {
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 8px;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 50px;
          line-height: 1.4;
        }

        .books-author {
          color: #666;
          font-size: 14px;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .books-year {
          color: #888;
          font-size: 13px;
          margin-bottom: 10px;
        }

        .books-categories {
          margin-bottom: 8px;
        }

        .category-badge {
          display: inline-block;
          background-color: #e9ecef;
          color: #495057;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          margin-right: 4px;
          margin-bottom: 2px;
        }

        .books-stock {
          margin-bottom: 8px;
        }

        .books-popularity {
          margin-bottom: 0;
        }

        .stock-badge {
          padding: 6px 12px;
          border-radius: 15px;
          font-size: 12px;
          font-weight: bold;
        }

        .stock-badge.available {
          background-color: #d4edda;
          color: #155724;
        }

        .stock-badge.unavailable {
          background-color: #f8d7da;
          color: #721c24;
        }

        .stock-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .view-all-section {
          margin-top: 40px;
          padding: 30px 0;
        }

        .view-all-btn {
          border: 2px solid #56804E;
          color: #56804E;
          font-weight: bold;
          padding: 12px 40px;
          border-radius: 30px;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .view-all-btn:hover {
          background-color: #56804E;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(86, 128, 78, 0.3);
        }

        .no-books {
          grid-column: 1 / -1;
          padding: 60px 0;
          color: #666;
        }

        .footer {
          background-color: #56804E;
          color: white;
          padding: 20px 0;
          text-align: center;
          margin-top: auto;
        }

        .dropdown-item.logout {
          color: #fff !important;
          background-color: #dc3545;
          margin: 5px;
          border-radius: 5px;
          text-align: center;
          padding: 8px 15px;
          font-size: 14px;
          width: auto;
          border: none;
        }

        .dropdown-item.logout:hover {
          background-color: #c82333;
        }

        .dropdown-menu {
          left: auto !important;
          right: 0 !important;
        }

        @media (max-width: 992px) {
          .welcome-container {
            flex-direction: column;
            text-align: center;
          }
          
          .right-section {
            width: 100%;
            max-width: 400px;
            margin-top: 30px;
          }
          
          .books-list {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
          }
          
          .navbar-nav-custom {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .nav-item-custom {
            margin-right: 0;
            margin-bottom: 10px;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .books-list {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 15px;
          }
          
          .search-box {
            margin-top: 30px;
          }
          
          .welcome-container {
            gap: 20px;
          }
          
          .right-section {
            height: 250px;
          }
        }

        @media (max-width: 576px) {
          .books-list {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .right-section {
            height: 200px;
          }
          
          .books-card {
            font-size: 14px;
          }
          
          .book-cover-container {
            height: 160px;
          }
          
          .books-info {
            padding: 15px;
          }
          
          .books-title {
            font-size: 16px;
            min-height: 40px;
          }
        }
      `}</style>
    </>
  );
}