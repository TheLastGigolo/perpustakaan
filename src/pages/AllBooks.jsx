import { useState, useCallback, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Button, Form, InputGroup, Image, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { logout } from '../services/auth';

// SVG Icons
const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

export default function AllBooks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
    per_page: 12
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  // Default placeholder image
  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K";

  // Image base URL
  const imageBaseURL = 'http://localhost:3001';

  // Function to get book cover URL
  const getBookCoverUrl = useCallback((book) => {
    if (book.cover_url) {
      if (book.cover_url.startsWith('/uploads')) {
        return `${imageBaseURL}${book.cover_url}`;
      }
      if (book.cover_url.startsWith('http')) {
        return book.cover_url;
      }
      return `${imageBaseURL}/uploads/${book.cover_url}`;
    }
    return defaultPlaceholder;
  }, [imageBaseURL, defaultPlaceholder]);

  // Fetch books from API
  const fetchBooks = useCallback(async (page = 1, search = '', limit = 12) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);
      
      const params = {
        page,
        limit,
        sort: sortBy,
        ...(search && { search })
      };
      
      const response = await axios.get('/books', { 
        params,
        signal: abortControllerRef.current.signal
      });
      
      if (response.data.status === 'success' && response.data.message) {
        const booksData = response.data.message.books || [];
        const paginationData = response.data.message.pagination || {
          current_page: page,
          total_pages: 1,
          total: 0,
          per_page: limit
        };
        
        setBooks(booksData);
        setPagination(paginationData);
      } else {
        throw new Error(response.data.message || 'Failed to fetch books');
      }
      
    } catch (error) {
      if (error.name === 'AbortError' || axios.isCancel(error)) {
        return;
      }
      
      console.error('Error fetching books:', error);
      setError(error.response?.data?.message || 'Failed to fetch books');
      setBooks([]);
      
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Initial load
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handle search
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    fetchBooks(1, searchQuery);
  }, [searchQuery, fetchBooks]);

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() || searchQuery === '') {
        fetchBooks(1, searchQuery);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchBooks]);

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileDropdown(false);
    navigate('/profiluser');
  };

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  }, [navigate]);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setShowSortDropdown(false);
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      fetchBooks(newPage, searchQuery);
    }
  }, [fetchBooks, searchQuery, pagination.total_pages]);

  // Handle book click - navigate to detail page
  const handleBookClick = useCallback((bookId) => {
    navigate(`/user/Books/${bookId}`);
  }, [navigate]);

  // Handle image error
  const handleImageError = useCallback((e) => {
    if (e.target.src !== defaultPlaceholder) {
      e.target.src = defaultPlaceholder;
    }
  }, [defaultPlaceholder]);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav-custom">
              <Nav.Link href="/dashboard" className="nav-item-custom">Home</Nav.Link>
              <Nav.Link href="/user/Books" className="nav-item-custom active">Daftar Buku</Nav.Link>
              <Nav.Link href="/user/reservations" className="nav-item-custom">Reservasi Buku</Nav.Link>
              <Nav.Link href="/user/FAQ" className="nav-item-custom">Layanan & Bantuan</Nav.Link>
            </Nav>
            <div className="navbar-profile">
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 rounded-lg px-3 py-1 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <img 
                      src="https://www.w3schools.com/howto/img_avatar.png" 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {/* <a 
                      href="#" 
                      onClick={handleProfileClick}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profil
                    </a> */}
                    <a 
                      href="#" 
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Rest of the component remains the same... */}
      {/* Main Content */}
      <Container className="books-section">
        {/* Page Title and Search */}
        <div className="section-header">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Buku</h1>
          
          <div className="flex gap-2">
            <Form onSubmit={handleSearch}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Cari buku, penulis, tahun terbit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-80"
                />
                <Button variant="success" type="submit" disabled={loading}>
                  {loading ? 'Mencari...' : 'Cari'}
                </Button>
              </InputGroup>
            </Form>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                variant="outline-secondary"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2"
              >
                Filter ▼
              </Button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => handleSortChange('title')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'title' ? 'bg-green-50 text-green-700' : ''}`}
                  >
                    Judul A-Z
                  </button>
                  <button
                    onClick={() => handleSortChange('author')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'author' ? 'bg-green-50 text-green-700' : ''}`}
                  >
                    Penulis A-Z
                  </button>
                  <button
                    onClick={() => handleSortChange('year')}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${sortBy === 'year' ? 'bg-green-50 text-green-700' : ''}`}
                  >
                    Tahun Terbaru
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="success" />
            </div>
            <p className="text-center text-gray-500 mt-2">Memuat buku...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <Alert variant="danger" className="text-center">
              <strong>Error:</strong> {error}
            </Alert>
            <div className="text-center mt-2">
              <Button variant="outline-primary" onClick={() => fetchBooks()}>
                Coba Lagi
              </Button>
            </div>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <>
            <div className="books-list">
              {books.map(book => {
                const coverUrl = getBookCoverUrl(book);
                return (
                  <div key={book.id} className="books-card">
                    <div 
                      className="books-link"
                      onClick={() => handleBookClick(book.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="book-cover-container">
                        <img 
                          src={coverUrl}
                          alt={book.title}
                          className="books-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        {coverUrl === defaultPlaceholder && (
                          <div className="no-cover-overlay">
                            <span>No Cover</span>
                          </div>
                        )}
                        {book.stock === 0 && (
                          <div className="stock-badge unavailable">
                            Habis
                          </div>
                        )}
                      </div>
                      <div className="books-info">
                        <h3 className="books-title">{book.title}</h3>
                        <p className="books-author">{book.author}</p>
                        <p className="books-year">{book.publication_year}</p>
                        {book.categories && book.categories.length > 0 && (
                          <div className="books-categories">
                            {book.categories.slice(0, 2).map((category, index) => (
                              <span key={index} className="category-badge">
                                {typeof category === 'object' ? category.name : category}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="books-stock">
                          <span className={`stock-badge ${book.stock > 0 ? 'available' : 'unavailable'}`}>
                            {book.stock > 0 ? `Tersedia: ${book.stock}` : 'Tidak Tersedia'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="pagination-container">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(pagination.current_page - 1)}
                        disabled={pagination.current_page === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(Math.min(5, pagination.total_pages))].map((_, index) => {
                      let pageNum;
                      if (pagination.total_pages <= 5) {
                        pageNum = index + 1;
                      } else if (pagination.current_page <= 3) {
                        pageNum = index + 1;
                      } else if (pagination.current_page >= pagination.total_pages - 2) {
                        pageNum = pagination.total_pages - 4 + index;
                      } else {
                        pageNum = pagination.current_page - 2 + index;
                      }
                      
                      return (
                        <li key={pageNum} className={`page-item ${pagination.current_page === pageNum ? 'active' : ''}`}>
                          <button 
                            className="page-link"
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${pagination.current_page === pagination.total_pages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => handlePageChange(pagination.current_page + 1)}
                        disabled={pagination.current_page === pagination.total_pages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
                
                <div className="pagination-info">
                  <p className="text-center text-gray-600">
                    Menampilkan {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} dari {pagination.total} buku
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* No Books Found */}
        {!loading && !error && books.length === 0 && (
          <div className="no-books">
            <div className="text-center py-5">
              <i className="fas fa-book fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">
                {searchQuery ? `Tidak ada buku yang ditemukan untuk "${searchQuery}".` : 'Tidak ada buku yang tersedia.'}
              </h4>
              {searchQuery && (
                <Button 
                  variant="outline-primary" 
                  onClick={() => {
                    setSearchQuery('');
                    fetchBooks();
                  }}
                  className="mt-3"
                >
                  Lihat Semua Buku
                </Button>
              )}
            </div>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Universitas Perjuangan</p>
      </footer>

      {/* Styles remain the same */}
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

        .books-section {
          margin-top: 40px;
          margin-bottom: 40px;
          flex: 1;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .loading-state, .error-state {
          padding: 40px 0;
          text-align: center;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .books-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          padding: 15px;
          border: none;
        }

        .books-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .book-cover-container {
          position: relative;
          width: 100%;
          height: 200px;
          border-radius: 10px;
          overflow: hidden;
          background-color: #f8f9fa;
        }

        .books-cover {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          background-color: #f8f9fa;
        }

        .books-card:hover .books-cover {
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
          padding-top: 10px;
        }

        .books-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
          color: #000;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          min-height: 40px;
        }

        .books-author {
          color: #666;
          font-size: 14px;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .books-year {
          color: #888;
          font-size: 12px;
          margin-bottom: 5px;
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
          margin-bottom: 5px;
        }

        .stock-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: bold;
          display: inline-block;
        }

        .stock-badge.available {
          background-color: #d4edda;
          color: #155724;
        }

        .stock-badge.unavailable {
          background-color: #f8d7da;
          color: #721c24;
        }

        .book-cover-container .stock-badge.unavailable {
          position: absolute;
          top: 10px;
          right: 10px;
        }

        .books-link {
          color: inherit;
          text-decoration: none;
          display: block;
        }

        .no-books {
          grid-column: 1 / -1;
          padding: 40px 0;
          color: #666;
          text-align: center;
        }

        .pagination-container {
          margin-top: 30px;
        }

        .pagination-info {
          margin-top: 15px;
        }

        .page-link {
          color: #56804E;
          border-color: #56804E;
        }

        .page-link:hover {
          color: white;
          background-color: #56804E;
          border-color: #56804E;
        }

        .page-item.active .page-link {
          background-color: #56804E;
          border-color: #56804E;
        }

        .footer {
          background-color: #56804E;
          color: white;
          padding: 20px 0;
          text-align: center;
          margin-top: auto;
        }

        @media (max-width: 992px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
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
          
          .books-list {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .books-list {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }

        @media (max-width: 576px) {
          .books-list {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .books-card {
            padding: 10px;
          }
          
          .book-cover-container {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}