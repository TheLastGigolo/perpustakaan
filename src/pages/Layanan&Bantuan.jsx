import { useState } from 'react';
import { Navbar, Nav, Container, Image, Accordion, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default function LayananBantuan() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = (e) => {
    e.preventDefault();
    setShowProfileDropdown(false);
    navigate('/profiluser');
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/login');
  };

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const faqItems = [
    {
      id: 1,
      question: "Bagaimana cara mencari dan meminjam buku di perpustakaan?",
      answer: "Untuk mencari buku, Anda dapat menggunakan fitur 'Daftar Buku' di menu utama. Gunakan kolom pencarian untuk menemukan buku berdasarkan judul, penulis, atau kategori. Setelah menemukan buku yang diinginkan, klik tombol 'Pinjam' dan isi formulir peminjaman. Pastikan Anda sudah login terlebih dahulu sebelum melakukan peminjaman."
    },
    {
      id: 2,
      question: "Berapa lama masa peminjaman buku dan bagaimana cara perpanjangan?",
      answer: "Masa peminjaman buku adalah 14 hari untuk mahasiswa dan 21 hari untuk dosen/staff. Untuk memperpanjang peminjaman, masuk ke menu 'Reservasi Buku' dan pilih buku yang ingin diperpanjang. Perpanjangan hanya dapat dilakukan 1 kali dengan syarat tidak ada denda dan tidak ada reservasi dari pengguna lain."
    },
    {
      id: 3,
      question: "Bagaimana cara melakukan reservasi buku yang sedang dipinjam?",
      answer: "Jika buku yang Anda inginkan sedang dipinjam, Anda dapat melakukan reservasi melalui halaman detail buku dengan mengklik tombol 'Reservasi'. Sistem akan memberitahu Anda melalui email ketika buku sudah tersedia. Reservasi berlaku selama 3 hari setelah buku dikembalikan."
    },
    {
      id: 4,
      question: "Apa yang harus dilakukan jika lupa password akun perpustakaan?",
      answer: "Jika lupa password, klik 'Lupa Password' di halaman login. Masukkan email yang terdaftar, dan sistem akan mengirimkan link reset password ke email Anda. Ikuti instruksi dalam email tersebut untuk membuat password baru. Jika masih mengalami kendala, hubungi petugas perpustakaan."
    },
    {
      id: 5,
      question: "Bagaimana sistem denda dan cara pembayarannya?",
      answer: "Denda keterlambatan adalah Rp 1.000 per hari per buku. Denda dapat dibayar langsung di perpustakaan atau melalui sistem pembayaran online yang terintegrasi. Selama ada denda yang belum dibayar, Anda tidak dapat meminjam buku baru atau memperpanjang peminjaman yang ada."
    },
    {
      id: 6,
      question: "Apakah ada batasan jumlah buku yang dapat dipinjam?",
      answer: "Ya, ada batasan peminjaman: mahasiswa dapat meminjam maksimal 5 buku, dosen/staff maksimal 10 buku, dan mahasiswa pascasarjana maksimal 7 buku. Batasan ini berlaku untuk semua jenis koleksi termasuk buku referensi dan jurnal cetak."
    },
    {
      id: 7,
      question: "Bagaimana cara mengakses e-book dan jurnal digital?",
      answer: "E-book dan jurnal digital dapat diakses melalui menu 'Koleksi Digital' setelah login. Gunakan kredensial yang sama dengan akun perpustakaan Anda. Untuk akses dari luar kampus, hubungi petugas perpustakaan untuk mendapatkan VPN atau remote access."
    },
    {
      id: 8,
      question: "Jam operasional perpustakaan dan kontak yang dapat dihubungi?",
      answer: "Perpustakaan buka Senin-Jumat: 07.00-21.00, Sabtu: 08.00-16.00, tutup hari Minggu dan hari libur nasional. Untuk bantuan teknis sistem: perpustakaan@unper.ac.id, telepon: (022) 1234-5678. Untuk konsultasi referensi: referensi@unper.ac.id."
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navbar-nav-custom">
              <Nav.Link href="/dashboard" className="nav-item-custom">Home</Nav.Link>
              <Nav.Link href="/user/books" className="nav-item-custom">Daftar Buku</Nav.Link>
              <Nav.Link href="/user/reservations" className="nav-item-custom">Reservasi Buku</Nav.Link>
              <Nav.Link href="/user/FAQ" className="nav-item-custom active">Layanan & Bantuan</Nav.Link>
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

      {/* Main Content */}
      <Container className="layanan-container">
        <h1 className="layanan-title">Layanan Dan Bantuan</h1>
        
        <div className="layanan-intro">
          <p>Temukan jawaban untuk pertanyaan umum seputar layanan perpustakaan Universitas Perjuangan. Jika Anda tidak menemukan jawaban yang dicari, silakan hubungi petugas perpustakaan.</p>
        </div>
        
        <Accordion activeKey={activeKey} className="layanan-accordion">
          {faqItems.map((item) => (
            <Card key={item.id} className="layanan-card">
              <Card.Header 
                className="layanan-header"
                onClick={() => toggleAccordion(item.id.toString())}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{item.question}</span>
                  <span className="accordion-icon">
                    {activeKey === item.id.toString() ? '−' : '+'}
                  </span>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey={item.id.toString()}>
                <Card.Body className="layanan-body">
                  {item.answer}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>

        <div className="contact-info">
          <h3>Butuh Bantuan Lebih Lanjut?</h3>
          <p>Hubungi kami melalui:</p>
          <ul>
            <li>Email: perpustakaan@unper.ac.id</li>
            <li>Telepon: (022) 1234-5678</li>
            <li>Datang langsung ke perpustakaan di lantai 2 gedung utama</li>
          </ul>
        </div>
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

        /* Navbar Styles */
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
        .layanan-container {
          margin-top: 40px;
          margin-bottom: 40px;
          max-width: 800px;
        }

        .layanan-title {
          color: #333;
          font-weight: bold;
          margin-bottom: 30px;
          text-align: center;
        }

        .layanan-intro {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
          color: #666;
        }

        .layanan-accordion {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-bottom: 40px;
        }

        .layanan-card {
          border: none;
          border-bottom: 1px solid #e9ecef;
        }

        .layanan-card:last-child {
          border-bottom: none;
        }

        .layanan-header {
          background-color: white;
          padding: 20px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          color: #333;
          transition: background-color 0.2s;
        }

        .layanan-header:hover {
          background-color: #f8f9fa;
        }

        .accordion-icon {
          font-size: 1.2rem;
          font-weight: bold;
          color: #56804E;
        }

        .layanan-body {
          background-color: #f8f9fa;
          padding: 20px;
          color: #555;
          line-height: 1.6;
        }

        .contact-info {
          background-color: white;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          text-align: center;
        }

        .contact-info h3 {
          color: #56804E;
          margin-bottom: 15px;
        }

        .contact-info ul {
          list-style: none;
          padding: 0;
          margin: 15px 0 0 0;
        }

        .contact-info li {
          padding: 5px 0;
          color: #666;
        }

        /* Footer */
        .footer {
          background-color: #56804E;
          color: white;
          padding: 15px;
          text-align: center;
          margin-top: auto;
        }

        /* Responsive Design */
        @media (max-width: 992px) {
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
          .layanan-container {
            padding: 0 15px;
          }

          .layanan-header {
            padding: 15px;
          }

          .layanan-body {
            padding: 15px;
          }

          .layanan-intro {
            padding: 15px;
          }

          .contact-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}