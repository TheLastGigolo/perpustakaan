<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Katalog Buku - Perpustakaan UNPER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        .navbar-custom {
            background-color: #56804E;
            padding: 20px 0;
        }
        .navbar-custom .navbar-nav .nav-link {
            color: white;
        }
        .navbar-nav {
            flex: 1;
            display: flex;
            justify-content: flex-start;
        }
        .navbar-nav .nav-item {
            margin-left: 20px;
        }
        .navbar-profile {
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .navbar-profile img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
            cursor: pointer;
        }
        .footer {
            background-color: #56804E;
            color: white;
            padding: 9px 15px;
            text-align: center;
            margin-top: auto;
        }
        .search-container {
            padding: 20px 0;
            margin-bottom: 20px;
        }
        .page-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .search-box {
            display: flex;
            max-width: 600px;
            margin: 0 auto 20px;
        }
        .search-input {
            flex-grow: 1;
            padding: 8px 15px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            height: 40px;
        }
        .search-button {
            padding: 0 15px;
            background-color: #56804E;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            height: 40px;
        }
        .filter-section {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .filter-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #333;
        }
        .filter-group {
            margin-bottom: 15px;
        }
        .filter-label {
            display: block;
            margin-bottom: 5px;
            font-size: 14px;
            color: #555;
        }
        .filter-select {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f9f9f9;
        }
        .filter-button {
            background-color: #56804E;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        .book-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4 books per row */
            gap: 20px;
            margin-top: 20px;
        }
        .book-card {
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            padding: 15px;
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
        }
        .book-author {
            color: #666;
            font-size: 14px;
        }
        .book-card a {
            color: inherit;
            text-decoration: none;
        }
        
      /* Dropdown Logout Button Style */
      .dropdown-item.logout {
            color: #fff !important;
            background-color: #dc3545; /* Red background for logout */
            margin: 5px;
            border-radius: 5px;
            text-align: center;
            padding: 4px 10px; /* Smaller padding */
            font-size: 12px; /* Smaller font size */
            width: auto; /* Make button width fit content */
        }

        .dropdown-item.logout:hover {
            background-color: #c82333; /* Darker red on hover */
        }

        .dropdown-menu {
            left: auto !important;
            right: 0 !important;
        }
    </style>
</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="homepage.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="katalog.php">Daftar Buku</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="reservasi.php">Reservasi Buku</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="layanan.php">Layanan & Bantuan</a>
                </li>
            </ul>
            <!-- Profile Dropdown -->
            <div class="navbar-profile dropdown">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style="left: auto; right: 0;">
                    <a class="dropdown-item" href="profiluser.php">Profile</a>
                    <a class="dropdown-item logout" href="login.php">Logout</a>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Main Content -->
<div class="container mt-4">
    <div class="row">
        <div class="col-12">
            <h1 class="page-title">Daftar Buku</h1>
        </div>
    </div>
    
    <!-- Search Box -->
    <div class="row">
        <div class="col-12">
            <div class="search-box">
                <input type="text" class="search-input" placeholder="Cari buku, penulis, tahun terbit">
                <button class="search-button">Cari</button>
            </div>
        </div>
    </div>

    <div class="row">
        <!-- Filter Section (Sebelah Kiri) -->
        <div class="col-md-3">
            <div class="filter-section">
                <div class="filter-title">Filter Buku</div>
                
                <div class="filter-group">
                    <label class="filter-label">Kategori</label>
                    <select class="filter-select" name="category">
                        <option value="">Semua Kategori</option>
                        <option value="fiksi">Fiksi</option>
                        <option value="non-fiksi">Non-Fiksi</option>
                        <option value="sains">Sains</option>
                        <option value="sejarah">Sejarah</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Tahun Terbit</label>
                    <select class="filter-select" name="year">
                        <option value="">Semua Tahun</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label class="filter-label">Urutkan</label>
                    <select class="filter-select" name="sort">
                        <option value="newest">Terbaru</option>
                        <option value="oldest">Terlama</option>
                        <option value="title-asc">Judul (A-Z)</option>
                        <option value="title-desc">Judul (Z-A)</option>
                    </select>
                </div>
                
                <button class="filter-button">Terapkan Filter</button>
            </div>
        </div>
        
        <!-- Book List (Sebelah Kanan) -->
        <div class="col-md-9">
            <div class="book-list" id="book-list">
                <!-- Buku akan dimasukkan di sini secara dinamis -->
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <p>@2025 Universitas Perjuangan</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
// Fetch books data from API
fetch('http://localhost:8080/api/book')
    .then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('book-list');
        data.forEach(book => {
            // Create a new book card for each book
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            bookCard.innerHTML = `
                <a href="book.php?id=${book.id}">
                    <img src="${book.cover}" alt="Book Cover" class="book-cover">
                    <div class="book-info">
                        <div class="book-title">${book.title}</div>
                        <div class="book-author">${book.author}</div>
                    </div>
                </a>
            `;
            bookList.appendChild(bookCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
</script>

</body>
</html>
