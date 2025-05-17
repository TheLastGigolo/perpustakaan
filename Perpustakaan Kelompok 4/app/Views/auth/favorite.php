<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Favorit Buku - Perpustakaan UNPER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome for icons -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa;
            display: flex;
            flex-direction: column;
            min-height: 100vh; /* Menjamin halaman mengambil seluruh tinggi */
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
        .page-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .favorite-list {
            margin-top: 30px;
        }
        .favorite-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .favorite-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
        }
        .favorite-card img {
            width: 120px;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
        }
        .favorite-info {
            flex-grow: 1;
            margin-left: 20px;
        }
        .favorite-title {
            font-weight: bold;
            font-size: 18px;
            color: black; /* Menambahkan warna hitam pada judul buku */
        }
        .favorite-author {
            font-size: 14px;
            color: black; /* Menambahkan warna hitam pada nama penulis */
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
                    <a class="nav-link" href="katalog.php">Daftar Buku</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="reservasi.php">Reservasi Buku</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="layanan.php">Layanan & Bantuan</a>
                </li>
            </ul>
            <div class="navbar-profile dropdown">
                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <a class="dropdown-item" href="profiluser.php">Profile</a>
                    <a class="dropdown-item logout" href="login.php">Logout</a>
                </div>
            </div>
        </div>
    </div>
</nav>

<!-- Main Content -->
<div class="container mt-4">
    <h1 class="page-title">Favorit Buku</h1>

    <div class="favorite-list" id="favorite-list">
        <!-- Data favorit buku akan dimasukkan di sini -->
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <p>@2025 Universitas Perjuangan</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
// Fetch favorit books from API
fetch('http://localhost:8080/api/favorite')
    .then(response => response.json())
    .then(data => {
        const favoriteList = document.getElementById('favorite-list');
        data.forEach(book => {
            // Create a new favorite card for each book
            const favoriteCard = document.createElement('a');
            favoriteCard.href = 'book.php';
            favoriteCard.classList.add('favorite-link');
            favoriteCard.innerHTML = `
                <div class="favorite-card">
                    <img src="${book.cover}" alt="Book Cover">
                    <div class="favorite-info">
                        <div class="favorite-title">${book.title}</div>
                        <div class="favorite-author">${book.author}</div>
                    </div>
                </div>
            `;
            favoriteList.appendChild(favoriteCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
</script>

</body>
</html>
