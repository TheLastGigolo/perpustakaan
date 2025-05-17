<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservasi Buku - Perpustakaan UNPER</title>
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
        .reservasi-list {
            margin-top: 30px;
        }
        .reservasi-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .reservasi-card:hover {
            transform: translateY(-5px);
            box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.2);
        }
        .reservasi-card img {
            width: 120px;
            height: 180px;
            object-fit: cover;
            border-radius: 8px;
        }
        .reservasi-info {
            flex-grow: 1;
            margin-left: 20px;
        }
        .reservasi-title {
            font-weight: bold;
            font-size: 18px;
        }
        .reservasi-author {
            font-size: 14px;
            color: #666;
        }
        .status {
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            transition: transform 0.3s ease;
        }
        .status.pending {
            background-color: #fffae6;
            color: #f0ad4e;
        }
        .status.ready {
            background-color: #eaf7e4;
            color: #5bc0de;
        }
        .status.expired {
            background-color: #f8d7da;
            color: #d9534f;
        }
        .status:hover {
            transform: scale(1.05);
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
        .reservasi-link {
            text-decoration: none;
            color: inherit;
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
                    <a class="nav-link active" href="reservasi.php">Reservasi Buku</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="layanan.php">Layanan & Bantuan</a>
                </li>
            </ul>
            <!-- Profile Dropdown -->
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
    <h1 class="page-title">Reservasi Buku</h1>

    <div class="reservasi-list" id="reservasi-list">
        <!-- Reservasi books will be displayed here dynamically -->
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <p>@2025 Universitas Perjuangan</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script>
// Fetch reservasi data from API
fetch('http://localhost:8080/api/reservasi')
    .then(response => response.json())
    .then(data => {
        const reservasiList = document.getElementById('reservasi-list');
        data.forEach(reservasi => {
            // Create a new reservasi card for each reservation
            const reservasiCard = document.createElement('a');
            reservasiCard.classList.add('reservasi-link');
            reservasiCard.href = `book.php?id=${reservasi.id}`;
            reservasiCard.innerHTML = `
                <div class="reservasi-card">
                    <img src="${reservasi.cover}" alt="Book Cover">
                    <div class="reservasi-info">
                        <div class="reservasi-title">${reservasi.title}</div>
                        <div class="reservasi-author">${reservasi.author}</div>
                        <div class="reservasi-details">Penerbit: ${reservasi.publisher}</div>
                    </div>
                    <span class="status ${reservasi.status.toLowerCase()}">${reservasi.status}</span>
                </div>
            `;
            reservasiList.appendChild(reservasiCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
</script>

</body>
</html>
