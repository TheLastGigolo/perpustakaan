import { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar, Nav, Container, Button, Image, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { logout } from '../services/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

// SVG Icons (same as AllBooks.jsx)
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

export default function BookReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  // Default placeholder image (same as AllBooks.jsx)
  const defaultPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIENvdmVyPC90ZXh0Pgo8L3N2Zz4K";

  // Image base URL
  const imageBaseURL = 'http://localhost:3001';

  // Function to get book cover URL (same as AllBooks.jsx)
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

  // Handle image error (same as AllBooks.jsx)
  const handleImageError = useCallback((e) => {
    if (e.target.src !== defaultPlaceholder) {
      e.target.src = defaultPlaceholder;
    }
  }, [defaultPlaceholder]);

  const fetchReservations = useCallback(async () => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/borrowings/member', { 
        signal: abortControllerRef.current.signal
      });
      
      if (response.data.status === 'success') {
        setReservations(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch reservations');
      }
    } catch (error) {
      if (error.name === 'AbortError' || axios.isCancel(error)) {
        return;
      }
      
      console.error('Error fetching reservations:', error);
      setError(error.response?.data?.message || 'Failed to fetch reservations');
      setReservations([]);
      
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  }, []);

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
    fetchReservations();
  }, [fetchReservations]);

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      await axios.put(`/borrowings/${id}/status`, { status });
      fetchReservations(); // Refresh list
    } catch (error) {
      console.error('Gagal update status', error);
      setError(error.response?.data?.message || 'Failed to update status');
    } finally {
      setLoading(false);
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

  const getStatusInfo = (status) => {
    switch (status) {
      case 'antri': return { text: 'Menunggu Konfirmasi', className: 'status-waiting' };
      case 'dipinjam': return { text: 'Dipinjam', className: 'status-ready' };
      case 'dikembalikan': return { text: 'Dikembalikan', className: 'status-expired' };
      case 'dibatalkan': return { text: 'Dibatalkan', className: 'status-expired' };
      default: return { text: 'Unknown', className: 'status-default' };
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar - Same as AllBooks.jsx */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav-custom">
              <Nav.Link href="/dashboard" className="nav-item-custom">Home</Nav.Link>
              <Nav.Link href="/user/Books" className="nav-item-custom">Daftar Buku</Nav.Link>
              <Nav.Link href="/user/reservations" className="nav-item-custom active">Reservasi Buku</Nav.Link>
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

      {/* Main Content */}
      <Container className="reservations-section">
        {/* Page Title */}
        <div className="section-header">
          <h1 className="text-2xl font-bold text-gray-800">Reservasi Buku</h1>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="success" />
            </div>
            <p className="text-center text-gray-500 mt-2">Memuat data reservasi...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <Alert variant="danger" className="text-center">
              <strong>Error:</strong> {error}
            </Alert>
            <div className="text-center mt-2">
              <Button variant="outline-primary" onClick={fetchReservations}>
                Coba Lagi
              </Button>
            </div>
          </div>
        )}

        {/* Reservations List */}
        {!loading && !error && (
          <>
            <div className="books-list">
              {reservations.length === 0 ? (
                <div className="no-books">
                  <div className="text-center py-5">
                    <i className="fas fa-book fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">Tidak ada reservasi yang ditemukan.</h4>
                  </div>
                </div>
              ) : (
                reservations.map(reservation => {
                  const coverUrl = getBookCoverUrl(reservation.book || {});
                  const statusInfo = getStatusInfo(reservation.status);
                  
                  return (
                    <div key={reservation.id} className="books-card">
                      <div className="book-cover-container">
                        <img 
                          src={coverUrl}
                          alt={reservation.book?.title}
                          className="books-cover"
                          onError={handleImageError}
                          loading="lazy"
                        />
                        {coverUrl === defaultPlaceholder && (
                          <div className="no-cover-overlay">
                            <span>No Cover</span>
                          </div>
                        )}
                      </div>
                      <div className="books-info">
                        <h3 className="books-title">{reservation.book?.title || 'Unknown Book'}</h3>
                        <p className="books-author">{reservation.book?.author || 'Unknown Author'}</p>
                        <div className="detail-row">
                          <span className="label">Tanggal:</span>
                          <span className="value">{reservation.borrow_date}</span>
                        </div>
                        <div className="detail-row">
                          <span className="label">Status:</span>
                          <span className={`value ${statusInfo.className}`}>{statusInfo.text}</span>
                        </div>
                        <div className="status-actions">
                          {reservation.status === 'antri' && (
                            <Button 
                              variant="danger" 
                              size="sm" 
                              onClick={() => updateStatus(reservation.id, 'dibatalkan')}
                              disabled={loading}
                            >
                              Batalkan
                            </Button>
                          )}
                          {reservation.status === 'dipinjam' && (
                            <Button 
                              variant="success" 
                              size="sm" 
                              onClick={() => updateStatus(reservation.id, 'dikembalikan')}
                              disabled={loading}
                            >
                              Kembalikan
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </Container>

      {/* Footer - Same as AllBooks.jsx */}
      <footer className="footer">
        <p>&copy; 2025 Universitas Perjuangan</p>
      </footer>

      {/* Styles - Mostly same as AllBooks.jsx with some additions */}
      <style jsx="true">{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        /* Navbar Styles - Same as AllBooks.jsx */
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

        /* Main Content */
        .reservations-section {
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

        /* Books List - Same as AllBooks.jsx */
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
          display: flex;
          flex-direction: column;
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
          flex: 1;
          display: flex;
          flex-direction: column;
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

        .detail-row {
          display: flex;
          margin-bottom: 5px;
          font-size: 14px;
        }

        .label {
          font-weight: 500;
          color: #666;
          margin-right: 5px;
        }

        .value {
          color: #333;
        }

        /* Status Classes */
        .status-waiting {
          color: #92400e;
          background-color: #fef3c7;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
        }

        .status-ready {
          color: #065f46;
          background-color: #d1fae5;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
        }

        .status-expired {
          color: #991b1b;
          background-color: #fee2e2;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
        }

        .status-default {
          color: #374151;
          background-color: #f3f4f6;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
        }

        .status-actions {
          margin-top: auto;
          padding-top: 10px;
          display: flex;
          justify-content: flex-end;
        }

        .no-books {
          grid-column: 1 / -1;
          padding: 40px 0;
          color: #666;
          text-align: center;
        }

        /* Footer - Same as AllBooks.jsx */
        .footer {
          background-color: #56804E;
          color: white;
          padding: 20px 0;
          text-align: center;
          margin-top: auto;
        }

        /* Responsive Design - Same as AllBooks.jsx */
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