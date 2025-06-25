import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Dropdown, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Katalog = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    year: '',
    sort: 'newest'
  });

  useEffect(() => {
    // Fetch books data from API
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/book');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // Implement filter functionality here
    console.log('Applying filters:', filters);
  };

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Item>
                <Nav.Link href="homepage.php">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link active href="katalog.php">Daftar Buku</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="reservasi.php">Reservasi Buku</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="layanan.php">Layanan & Bantuan</Nav.Link>
              </Nav.Item>
            </Nav>
            {/* Profile Dropdown */}
            <div className="navbar-profile">
              <Dropdown>
                <Dropdown.Toggle variant="transparent" id="dropdown-basic">
                  <img 
                    src="https://www.w3schools.com/howto/img_avatar.png" 
                    alt="Profile" 
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item href="profiluser.php">Profile</Dropdown.Item>
                  <Dropdown.Item 
                    href="login.php" 
                    className="logout"
                    style={{
                      color: '#fff',
                      backgroundColor: '#dc3545',
                      margin: '5px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      padding: '4px 10px',
                      fontSize: '12px'
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-4 flex-grow-1">
        <Row>
          <Col xs={12}>
            <h1 className="page-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
              Daftar Buku
            </h1>
          </Col>
        </Row>
        
        {/* Search Box */}
        <Row>
          <Col xs={12}>
            <Form onSubmit={handleSearch} className="d-flex max-width-600 mx-auto mb-3">
              <Form.Control
                type="text"
                placeholder="Cari buku, penulis, tahun terbit"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: '8px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '4px 0 0 4px',
                  height: '40px'
                }}
              />
              <Button 
                type="submit" 
                className="search-button"
                style={{
                  padding: '0 15px',
                  backgroundColor: '#56804E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  height: '40px'
                }}
              >
                Cari
              </Button>
            </Form>
          </Col>
        </Row>

        <Row>
          {/* Filter Section (Left Side) */}
          <Col md={3} className="mb-4">
            <div 
              className="filter-section p-3"
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div 
                className="filter-title mb-3"
                style={{
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                Filter Buku
              </div>
              
              <div className="filter-group mb-3">
                <Form.Label className="filter-label" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Kategori
                </Form.Label>
                <Form.Select 
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="filter-select"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <option value="">Semua Kategori</option>
                  <option value="fiksi">Fiksi</option>
                  <option value="non-fiksi">Non-Fiksi</option>
                  <option value="sains">Sains</option>
                  <option value="sejarah">Sejarah</option>
                </Form.Select>
              </div>
              
              <div className="filter-group mb-3">
                <Form.Label className="filter-label" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Tahun Terbit
                </Form.Label>
                <Form.Select 
                  name="year"
                  value={filters.year}
                  onChange={handleFilterChange}
                  className="filter-select"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <option value="">Semua Tahun</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                  <option value="2020">2020</option>
                </Form.Select>
              </div>
              
              <div className="filter-group mb-3">
                <Form.Label className="filter-label" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
                  Urutkan
                </Form.Label>
                <Form.Select 
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="filter-select"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <option value="newest">Terbaru</option>
                  <option value="oldest">Terlama</option>
                  <option value="title-asc">Judul (A-Z)</option>
                  <option value="title-desc">Judul (Z-A)</option>
                </Form.Select>
              </div>
              
              <Button 
                onClick={applyFilters}
                className="filter-button w-100"
                style={{
                  backgroundColor: '#56804E',
                  color: 'white',
                  border: 'none',
                  padding: '8px 15px',
                  borderRadius: '4px'
                }}
              >
                Terapkan Filter
              </Button>
            </div>
          </Col>
          
          {/* Book List (Right Side) */}
          <Col md={9}>
            <div 
              className="book-list"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '20px'
              }}
            >
              {books.map(book => (
                <a 
                  key={book.id} 
                  href={`book.php?id=${book.id}`} 
                  className="text-decoration-none text-dark"
                >
                  <div 
                    className="book-card"
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      padding: '15px'
                    }}
                  >
                    <img 
                      src={book.cover} 
                      alt="Book Cover" 
                      className="book-cover w-100"
                      style={{
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <div 
                      className="book-info pt-2"
                      style={{ paddingTop: '10px' }}
                    >
                      <div 
                        className="book-title"
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          marginBottom: '5px'
                        }}
                      >
                        {book.title}
                      </div>
                      <div 
                        className="book-author"
                        style={{
                          color: '#666',
                          fontSize: '14px'
                        }}
                      >
                        {book.author}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer 
        className="footer mt-auto"
        style={{
          backgroundColor: '#56804E',
          color: 'white',
          padding: '9px 15px',
          textAlign: 'center'
        }}
      >
        <p>@2025 Universitas Perjuangan</p>
      </footer>
    </div>
  );
};

export default Katalog;