import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Image, Card, Row, Col, Badge, Spinner, Alert, Navbar, Nav, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../services/api';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { logout } from '../services/auth';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [reservationError, setReservationError] = useState(null);
  const [reservationSuccess, setReservationSuccess] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reservationLoading, setReservationLoading] = useState(false);
  const [memberId, setMemberId] = useState(null);
  
  // Default placeholder image
  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K";

  // Image base URL
  const imageBaseURL = 'http://localhost:3001';

  // Function to get current user and member ID
  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/auth/me');
      if (response.data.status === 'success') {
        const user = response.data.message.user;
        setCurrentUser(user);
        
        // Fetch member data to get member ID
        const memberResponse = await axios.get(`/members/user/${user.id}`);
        if (memberResponse.data.status === 'success') {
          setMemberId(memberResponse.data.message.member.id);
        }
        
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  // Function to get book cover URL
  const getBookCoverUrl = useCallback((book) => {
    if (!book) return defaultPlaceholder;
    
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

  // Fetch book details
  const fetchBookDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/books/${id}`);
      
      if (response.data.status === 'success' && response.data.message.book) {
        setBook(response.data.message.book);
      } else {
        throw new Error(response.data.message || 'Failed to fetch book details');
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError(error.response?.data?.message || 'Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Fetch current user when component mounts
    getCurrentUser();
    fetchBookDetails();
  }, [fetchBookDetails]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleReserve = () => {
    if (!currentUser) {
      setReservationError('Anda harus login untuk melakukan peminjaman');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }
    
    if (!memberId) {
      setReservationError('Data member tidak ditemukan. Silakan hubungi admin.');
      return;
    }
    
    if (book.stock <= 0) {
      setReservationError('Stok buku tidak tersedia');
      return;
    }
    
    setShowReserveModal(true);
    setReservationError(null);
    setReservationSuccess(null);
  };

  const handleCloseReserveModal = () => {
    setShowReserveModal(false);
    setReservationError(null);
    setReservationSuccess(null);
    
    // Reset dates
    setBorrowDate(new Date());
    setDueDate(new Date(new Date().setDate(new Date().getDate() + 7)));
  };

  const handleBorrowDateChange = (date) => {
    setBorrowDate(date);
    // Automatically set due date to 7 days after borrow date
    const newDueDate = new Date(date);
    newDueDate.setDate(newDueDate.getDate() + 7);
    setDueDate(newDueDate);
    setReservationError(null);
  };

  const handleDueDateChange = (date) => {
    const maxDueDate = new Date(borrowDate);
    maxDueDate.setDate(maxDueDate.getDate() + 7);
    
    if (date > maxDueDate) {
      setReservationError('Maksimal peminjaman adalah 7 hari');
      return;
    }
    
    if (date <= borrowDate) {
      setReservationError('Tanggal pengembalian harus setelah tanggal peminjaman');
      return;
    }
    
    setReservationError(null);
    setDueDate(date);
  };

  const submitReservation = async () => {
    try {
      setReservationLoading(true);
      setReservationError(null);
      setReservationSuccess(null);
      
      // Validate user and member
      if (!currentUser || !memberId) {
        setReservationError('Anda harus login untuk melakukan peminjaman');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
      
      // Validate dates
      if (dueDate <= borrowDate) {
        setReservationError('Tanggal pengembalian harus setelah tanggal peminjaman');
        return;
      }
      
      // Calculate difference in days
      const diffTime = Math.abs(dueDate - borrowDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 7) {
        setReservationError('Maksimal peminjaman adalah 7 hari');
        return;
      }
      
      // Validate borrow date is not in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedBorrowDate = new Date(borrowDate);
      selectedBorrowDate.setHours(0, 0, 0, 0);
      
      if (selectedBorrowDate < today) {
        setReservationError('Tanggal peminjaman tidak boleh di masa lalu');
        return;
      }
      
      // Format dates to YYYY-MM-DD
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      const borrowingData = {
        book_id: parseInt(id),
        member_id: parseInt(memberId),
        borrow_date: formatDate(borrowDate),
        due_date: formatDate(dueDate)
      };
      
      console.log('Submitting borrowing data:', borrowingData);
      
      const response = await axios.post('/borrowings', borrowingData);
      
      if (response.data.status === 'success') {
        setReservationSuccess('Peminjaman berhasil diajukan! Status: Antri');
        // Refresh book details to update stock if needed
        await fetchBookDetails();
        
        // Auto close modal after 3 seconds
        setTimeout(() => {
          handleCloseReserveModal();
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Failed to create reservation');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      
      // Handle specific error messages
      let errorMessage = 'Gagal mengajukan peminjaman';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setReservationError(errorMessage);
    } finally {
      setReservationLoading(false);
    }
  };

  const handleImageError = (e) => {
    if (e.target.src !== defaultPlaceholder) {
      e.target.onerror = null; // Prevent infinite loop
      e.target.src = defaultPlaceholder;
    }
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

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.navbar-profile')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Spinner animation="border" variant="success" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3" style={{ fontSize: '1.2rem' }}>Memuat detail buku...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <Alert variant="danger" className="text-center" style={{ maxWidth: '600px', width: '100%' }}>
            <strong>Error:</strong> {error}
            <div className="mt-3">
              <Button variant="outline-primary" onClick={handleBack}>
                Kembali
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    if (!book) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
          <Alert variant="warning" className="text-center" style={{ maxWidth: '600px', width: '100%' }}>
            Buku tidak ditemukan
            <div className="mt-3">
              <Button variant="outline-primary" onClick={handleBack}>
                Kembali
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    const coverUrl = getBookCoverUrl(book);

    return (
      <>
        <Button 
          variant="outline-secondary" 
          onClick={handleBack} 
          className="mb-4 back-button"
        >
          <FaArrowLeft className="me-2" />
          Kembali
        </Button>

        <Card className="book-detail-card">
          <Row className="g-0">
            <Col md={4} className="book-cover-col">
              <div className="book-cover-container">
                <Image
                  src={coverUrl}
                  alt={book.title}
                  className="book-cover-img"
                  onError={handleImageError}
                  fluid
                />
                {coverUrl === defaultPlaceholder && (
                  <div className="no-cover-overlay">
                    <span>No Cover</span>
                  </div>
                )}
              </div>
              
              <Button 
                variant={isFavorite ? "danger" : "outline-danger"} 
                className="favorite-button mt-3"
                onClick={toggleFavorite}
              >
                <FaHeart className="me-2" />
                {isFavorite ? 'Favorit' : 'Tambahkan ke Favorit'}
              </Button>
              
              <Button 
                variant="success" 
                className="reserve-button mt-2"
                onClick={handleReserve}
                disabled={book.stock <= 0 || !book.is_active}
              >
                {!book.is_active ? 'Buku Tidak Aktif' : 
                 book.stock > 0 ? 'Reservasi Buku' : 'Stok Habis'}
              </Button>
            </Col>

            <Col md={8} className="book-info-col">
              <Card.Body>
                <Card.Title className="book-title">{book.title}</Card.Title>
                
                {book.categories && book.categories.length > 0 && (
                  <div className="mb-3">
                    {book.categories.map((category, index) => (
                      <Badge key={index} bg="secondary" className="me-2">
                        {typeof category === 'object' ? category.name : category}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="synopsis-section mb-4">
                  <h5 className="section-title">Sinopsis</h5>
                  <p className="synopsis-text">
                    {book.description || 'Tidak ada sinopsis tersedia.'}
                  </p>
                </div>
                
                <div className="details-section mb-4">
                  <h5 className="section-title">Detail Buku</h5>
                  <Row>
                    <Col md={6}>
                      <div className="detail-item">
                        <span className="detail-label">Penulis:</span>
                        <span className="detail-value">{book.author || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Penerbit:</span>
                        <span className="detail-value">{book.publisher || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">ISBN/ISSN:</span>
                        <span className="detail-value">{book.isbn || '-'}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="detail-item">
                        <span className="detail-label">Tahun Terbit:</span>
                        <span className="detail-value">{book.publication_year || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Halaman:</span>
                        <span className="detail-value">{book.pages || '-'}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Stok:</span>
                        <span className={`detail-value ${book.stock > 0 ? 'text-success' : 'text-danger'}`}>
                          {book.stock > 0 ? `Tersedia (${book.stock})` : 'Habis'}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </div>
                
                {book.additional_info && (
                  <div className="additional-info-section">
                    <h5 className="section-title">Informasi Tambahan</h5>
                    <p className="additional-info-text">
                      {book.additional_info}
                    </p>
                  </div>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>

        {/* Reservation Modal */}
        <Modal show={showReserveModal} onHide={handleCloseReserveModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reservasi Buku</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reservationSuccess ? (
              <Alert variant="success">
                <div className="d-flex align-items-center">
                  <div>
                    <strong>✓ {reservationSuccess}</strong>
                    <br />
                    <small>Modal akan tertutup otomatis dalam 3 detik...</small>
                  </div>
                </div>
              </Alert>
            ) : (
              <>
                <div className="mb-3">
                  <h6>Buku: {book?.title}</h6>
                  <p className="text-muted">Silakan pilih tanggal peminjaman dan pengembalian. Maksimal peminjaman adalah 7 hari.</p>
                </div>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Peminjaman</Form.Label>
                  <DatePicker
                    selected={borrowDate}
                    onChange={handleBorrowDateChange}
                    minDate={new Date()}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Pilih tanggal peminjaman"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Pengembalian</Form.Label>
                  <DatePicker
                    selected={dueDate}
                    onChange={handleDueDateChange}
                    minDate={new Date(borrowDate.getTime() + 24 * 60 * 60 * 1000)} // Next day
                    maxDate={new Date(new Date(borrowDate).setDate(borrowDate.getDate() + 7))}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Pilih tanggal pengembalian"
                  />
                </Form.Group>
                
                {reservationError && (
                  <Alert variant="danger" className="mt-3">
                    <strong>Error:</strong> {reservationError}
                  </Alert>
                )}

                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted">
                    <strong>Catatan:</strong>
                    <ul className="mb-0 mt-1">
                      <li>Peminjaman maksimal 7 hari</li>
                      <li>Status awal peminjaman adalah "Antri"</li>
                      <li>Admin akan memproses peminjaman Anda</li>
                    </ul>
                  </small>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {reservationSuccess ? (
              <Button variant="success" onClick={handleCloseReserveModal}>
                Tutup
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={handleCloseReserveModal}>
                  Batal
                </Button>
                <Button 
                  variant="primary" 
                  onClick={submitReservation}
                  disabled={reservationLoading || !!reservationError}
                >
                  {reservationLoading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Mengajukan...</span>
                    </>
                  ) : 'Ajukan Peminjaman'}
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  };

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
              <div className="position-relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="btn p-0 border-0 bg-transparent"
                >
                  <div className="profile-container">
                    <img 
                      src="https://www.w3schools.com/howto/img_avatar.png" 
                      alt="Profile" 
                      className="profile-image"
                    />
                  </div>
                </button>
                
                {showProfileDropdown && (
                  <div className="profile-dropdown">
                    <button 
                      onClick={handleLogout}
                      className="dropdown-item-custom logout-btn"
                    >
                      <LogOut className="me-2" style={{ width: '16px', height: '16px' }} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="book-detail-container">
        {renderContent()}
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Universitas Perjuangan</p>
      </footer>

      <style jsx="true">{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Navbar styles */
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

        .profile-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid white;
          transition: all 0.3s ease;
        }

        .profile-container:hover {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.8);
        }

        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          margin-top: 8px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          padding: 8px;
          min-width: 120px;
          z-index: 1000;
        }

        .dropdown-item-custom {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          border-radius: 4px;
          transition: all 0.2s ease;
          font-size: 14px;
        }

        .logout-btn {
          color: #dc3545;
        }

        .logout-btn:hover {
          background-color: #f8f9fa;
          color: #c82333;
        }

        /* Book Detail Content */
        .book-detail-container {
          padding-top: 30px;
          padding-bottom: 50px;
          flex: 1;
          background-color: #f8f9fa;
        }
        
        .back-button {
          border-radius: 20px;
          padding: 8px 20px;
          font-weight: 500;
        }
        
        .book-detail-card {
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: none;
          background-color: white;
        }
        
        .book-cover-col {
          padding: 30px;
          background-color: #f8f9fa;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .book-cover-container {
          width: 100%;
          max-width: 300px;
          height: 400px;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background-color: #e9ecef;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .book-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .no-cover-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          z-index: 1;
        }
        
        .favorite-button, .reserve-button {
          width: 100%;
          max-width: 300px;
          border-radius: 20px;
          padding: 10px;
          font-weight: 500;
        }
        
        .book-info-col {
          padding: 30px;
          background-color: white;
        }
        
        .book-title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #333;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
                color: #56804E;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 2px solid #f0f0f0;
    }

    .synopsis-text {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
      text-align: justify;
    }

    .details-section {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .detail-item {
      margin-bottom: 12px;
      display: flex;
    }

    .detail-label {
      font-weight: 600;
      color: #333;
      min-width: 120px;
    }

    .detail-value {
      color: #555;
      margin-left: 10px;
    }

    .additional-info-text {
      font-size: 15px;
      line-height: 1.5;
      color: #555;
    }

    /* Footer styles */
    .footer {
      background-color: #56804E;
      color: white;
      text-align: center;
      padding: 20px 0;
      margin-top: auto;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .book-cover-col, .book-info-col {
        padding: 20px;
      }

      .book-cover-container {
        height: 300px;
      }

      .book-title {
        font-size: 24px;
      }

      .detail-item {
        flex-direction: column;
      }

      .detail-label {
        margin-bottom: 5px;
      }

      .detail-value {
        margin-left: 0;
      }
    }

    @media (max-width: 576px) {
      .book-cover-container {
        height: 250px;
      }

      .book-title {
        font-size: 22px;
      }

      .section-title {
        font-size: 16px;
      }

      .synopsis-text, .additional-info-text {
        font-size: 14px;
      }
    }
  `}</style>
</div>
  );
}