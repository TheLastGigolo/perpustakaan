<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Homepage - Perpustakaan</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            min-height: 100vh; /* Pastikan halaman mengambil seluruh tinggi */
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
            margin-top: auto; /* Memastikan footer tetap di bawah */
        }
        .search-box {
            margin-top: 50px;
        }

        /* Modifikasi untuk tampilan box buku */
        .book-item {
            background-color: #e0f7fa;
            height: 250px;
            margin-bottom: 15px;
            border-radius: 5px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        .book-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
        .book-item:hover {
            transform: translateY(-5px);
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
        }

        /* Buku List */
        .book-list {
            display: grid;
            grid-template-columns: repeat(4, 1fr); /* 4 buku per baris */
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

        /* Modifikasi untuk tampilan kanan */
        .welcome-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
            margin-top: 50px;
        }
        .welcome-container .text-section {
            flex: 1;
        }
        .welcome-container .right-section {
            width: 300px;
            height: 400px;
            background-color: #f3f3f3;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .right-section img {
            width: 80%;
            height: auto;
            object-fit: cover;
            border-radius: 10px;
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
                    <a class="nav-link active" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="katalog.php">Daftar Buku</a>
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
                <!-- Dropdown menu with adjusted position -->
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style="left: auto; right: 0;">
                    <a class="dropdown-item" href="profiluser.php">Profile</a>
                    <a class="dropdown-item logout" href="login.php">Logout</a>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Welcome and Search Section -->
<div class="container text-center search-box">
    <div class="welcome-container">
        <div class="text-section">
            <h2>Selamat Datang</h2>
            <h3>di Perpustakaan Universitas Perjuangan</h3>
            <br></br>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Cari buku, penulis, tahun terbit" aria-label="Search">
                <button class="btn btn-success" type="button">Cari</button>
            </div>
        </div>
        
        <!-- New Section on the right with an image -->
        <div class="right-section">
            <img src="https://th.bing.com/th/id/OIP.XGE6dPdRe6p4JRwicO88mQHaHS?rs=1&pid=ImgDetMain" alt="Placeholder Image">
        </div>
    </div>
</div>

<!-- Book List -->
<div class="container">
    <h3>Daftar Buku</h3>
    <div class="book-list" id="book-list">
        <!-- Buku akan dimasukkan di sini secara dinamis -->
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
