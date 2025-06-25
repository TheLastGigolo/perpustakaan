import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Card, Button, Form, InputGroup, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDashboard() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/book');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="UserDashboard" active>Home</Nav.Link>
              <Nav.Link href="/Katalog">Daftar Buku</Nav.Link>
              <Nav.Link href="/reservasi">Reservasi Buku</Nav.Link>
              <Nav.Link href="/layanan">Layanan & Bantuan</Nav.Link>
            </Nav>
            <div className="navbar-profile dropdown">
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
                <button className="dropdown-item logout" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome and Search Section */}
      <Container className="text-center search-box">
        <div className="welcome-container">
          <div className="text-section">
            <h2>Selamat Datang</h2>
            <h3>di Perpustakaan Universitas Perjuangan</h3>
            <br />
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Cari buku, penulis, tahun terbit"
                aria-label="Search"
              />
              <Button variant="success">Cari</Button>
            </InputGroup>
          </div>
          
          <div className="right-section">
            <img 
              src="https://th.bing.com/th/id/OIP.XGE6dPdRe6p4JRwicO88mQHaHS?rs=1&pid=ImgDetMain" 
              alt="Placeholder" 
              className="right-image"
            />
          </div>
        </div>
      </Container>

      {/* Book List */}
      <Container className="book-section">
        <h3>Daftar Buku</h3>
        <div className="book-list">
          {books.map(book => (
            <Card key={book.id} className="book-card">
              <a href={`/book/${book.id}`} className="book-link">
                <Card.Img 
                  variant="top" 
                  src={book.cover} 
                  alt="Book Cover" 
                  className="book-cover"
                />
                <Card.Body className="book-info">
                  <Card.Title className="book-title">{book.title}</Card.Title>
                  <Card.Text className="book-author">{book.author}</Card.Text>
                </Card.Body>
              </a>
            </Card>
          ))}
        </div>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>@2025 Universitas Perjuangan</p>
      </footer>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        .navbar-custom {
          background-color: #56804E;
          padding: 20px 0;
        }
        .navbar-custom .nav-link {
          color: white;
        }
        .navbar-profile {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .profile-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          cursor: pointer;
        }
        .search-box {
          margin-top: 50px;
        }
        .welcome-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          margin-top: 50px;
        }
        .text-section {
          flex: 1;
        }
        .right-section {
          width: 300px;
          height: 400px;
          background-color: #f3f3f3;
          border-radius: 10px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .right-image {
          width: 80%;
          height: auto;
          object-fit: cover;
          border-radius: 10px;
        }
        .book-section {
          margin-top: 40px;
          margin-bottom: 40px;
        }
        .book-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .book-card {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          padding: 15px;
          border: none;
        }
        .book-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
        .book-cover {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
          transition: transform 0.3s ease;
        }
        .book-cover:hover {
          transform: scale(1.05);
        }
        .book-info {
          padding-top: 10px;
        }
        .book-title {
          font-weight: bold;
          font-size: 16px;
          margin-bottom: 5px;
          color: #000;
        }
        .book-author {
          color: #666;
          font-size: 14px;
        }
        .book-link {
          color: inherit;
          text-decoration: none;
        }
        .footer {
          background-color: #56804E;
          color: white;
          padding: 9px 15px;
          text-align: center;
          margin-top: auto;
        }
        .dropdown-item.logout {
          color: #fff !important;
          background-color: #dc3545;
          margin: 5px;
          border-radius: 5px;
          text-align: center;
          padding: 4px 10px;
          font-size: 12px;
          width: auto;
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
          }
          .right-section {
            width: 100%;
            margin-top: 30px;
          }
        }
        @media (max-width: 768px) {
          .book-list {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
          .navbar-nav {
            flex-direction: column;
          }
          .nav-item {
            margin-left: 0;
            margin-bottom: 10px;
          }
        }
        @media (max-width: 576px) {
          .book-list {
            grid-template-columns: 1fr;
          }
          .right-section {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
}