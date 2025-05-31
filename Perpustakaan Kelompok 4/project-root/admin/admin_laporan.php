<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistem Informasi Perpustakaan</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            display: flex;
            flex-direction: row;
            height: 100vh;
            background-color: #f8f8f8;
        }

        /* Navbar */
        .navbar-custom {
            background-color: #56804E;
            padding: 15px 20px;
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .navbar-custom .navbar-brand {
            display: flex;
            align-items: center;
            color: white;
        }

        .navbar-custom .navbar-brand img {
            width: 40px;
            margin-right: 10px;
        }

        .navbar-custom .navbar-brand span {
            font-weight: bold;
            font-size: 18px;
        }

        .navbar-custom .navbar-nav {
            margin-left: auto;
        }

        .navbar-custom .nav-item {
            margin-left: 20px;
        }

        .navbar-custom .nav-link {
            color: white;
            font-size: 16px;
            padding: 8px 16px;
        }

        .navbar-custom .nav-link:hover, .navbar-custom .nav-link.active {
            background-color: #465e41;
            border-radius: 5px;
        }

        .navbar-profile {
            display: flex;
            align-items: center;
        }

        .navbar-profile img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }

        /* Sidebar */
        .sidebar {
            width: 250px;
            background-color: #ffffff;
            color: #333;
            position: fixed;
            top: 70px; /* Sidebar starts just below the navbar */
            left: 0;
            height: calc(100vh - 80px); /* Adjust height based on the navbar height */
            padding-top: 20px;
            border-right: 1px solid #ddd;
            z-index: 999;
        }

        .sidebar .profile {
            text-align: center;
            margin-bottom: 20px;
        }

        .sidebar .profile img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 10px;
        }

        .sidebar .profile span {
            display: block;
            font-weight: bold;
        }

        .sidebar .profile .admin-text {
            display: block;
            background-color: #E8F5E9; /* Light green background */
            color: #81C784; /* Green text color */
            padding: 8px 20px;
            border-radius: 30px; /* Rounded corners */
            font-size: 16px;
            text-transform: uppercase;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .sidebar .profile .admin-text:hover {
            background-color: #A5D6A7; /* Darker green when hovered */
            color: white; /* White text when hovered */
        }

        .sidebar nav ul {
            list-style-type: none;
            padding: 0;
        }

        .sidebar nav ul li {
            padding: 15px;
            display: flex;
            align-items: center; /* Align icons and text */
        }

        .sidebar nav ul li a {
            color: #333;
            text-decoration: none;
            display: flex;
            align-items: center; /* Ensure icon and text are aligned */
            width: 100%;
        }

        .sidebar nav ul li a .icon {
            margin-right: 10px; /* Add space between the icon and text */
            font-size: 20px; /* Adjust icon size */
        }

        .sidebar nav ul li a:hover {
            background-color: #f1f1f1;
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

        /* Form Styles */
        .form-label {
            font-weight: bold;
        }

        .form-control {
            border-radius: 10px;
        }

        .modal-body input,
        .modal-body select {
            border-radius: 10px;
        }

        /* Button Styles */
        .btn-custom {
            background-color: #56804E;
            color: white;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 10px;
        }

        .btn-custom:hover {
            background-color: #465e41;
        }

    </style>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <div class="profile">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Admin Profile">
            <span>Miku Nakano</span>
            <span class="admin-text">Administrator</span> <!-- Styled 'Administrator' text -->
        </div>
        <nav>
            <ul>
                <li><a href="admin_dashboard.php" class="active"><span class="icon">📊</span> Dashboard</a></li>
                <li><a href="admin_data_buku.php"><span class="icon">📚</span> Data Buku</a></li>
                <li><a href="admin_data_anggota.php"><span class="icon">👤</span> Data Anggota</a></li>
                <li><a href="admin_data_peminjaman.php"><span class="icon">📥</span> Data Peminjaman</a></li>
                <li><a href="admin_laporan.php"><span class="icon">📄</span> Laporan</a></li>
            </ul>
        </nav>
    </div>

   <!-- Main Content -->
    <div class="main-content">
        <!-- Navbar -->
        <nav class="navbar navbar-custom">
            <div class="container-fluid">
                <div class="navbar-brand">
                    <img src="https://th.bing.com/th/id/OIP.XGE6dPdRe6p4JRwicO88mQHaHS?rs=1&pid=ImgDetMain" alt="Logo">
                    <span>Universitas Perjuangan - Sistem Informasi Perpustakaan</span>
                </div>
                <div class="navbar-profile dropdown">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Profile" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="profiladmin.php">Profile</a>
                        <a class="dropdown-item logout" href="login.php">Logout</a> 
                    </div>
                </div>
            </div>
        </nav>
        
        <!-- Tambahkan ke dalam <body> di bawah elemen navbar & sidebar -->
<div class="container mt-5 pt-5" style="margin-left: 270px;">
    <h3 class="fw-bold mb-4">Data Laporan</h3>

    <div class="d-flex justify-content-between align-items-center mb-3">
        <!-- Filter Dropdown -->
        <div class="dropdown">
            <button class="btn btn-outline-dark dropdown-toggle" type="button" id="filterBtn" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item filter-option" href="#" data-filter="today">Hari Ini</a></li>
                <li><a class="dropdown-item filter-option" href="#" data-filter="week">Minggu Ini</a></li>
                <li><a class="dropdown-item filter-option" href="#" data-filter="month">Bulan Ini</a></li>
                <li><a class="dropdown-item filter-option" href="#" data-filter="all">Semua</a></li>
            </ul>
        </div>

        <!-- Search Input -->
        <div>
            <input type="text" class="form-control" id="searchInput" placeholder="Search for reports">
        </div>
    </div>

    <div class="table-responsive">
        <table class="table" id="peminjamanTable">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Judul buku</th>
                    <th>Nama peminjam</th>
                    <th>Tanggal Pinjam</th>
                    <th>Tanggal Pengembalian</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr data-date="2022-10-26">
                    <td>1</td>
                    <td>Menjadi Teknisi Komp....</td>
                    <td>Rafly Rachman</td>
                    <td><strong>10/26/2022</strong></td>
                    <td>10/29/2022</td>
                    <td>
                        <span class="badge bg-danger">Terlambat</span> <br>
                        <span class="badge bg-success">Sudah Kembali</span><br>
                        <span class="badge bg-danger">Belum Kembali</span>
                    </td>
                </tr>
                <!-- Tambahkan baris lainnya di sini -->
            </tbody>
        </table>
    </div>
</div>

<!-- Script Filter & Search -->
<script>
    function normalizeDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function isToday(date) {
        const today = normalizeDate(new Date());
        const target = normalizeDate(new Date(date));
        return today.getTime() === target.getTime();
    }

    function isThisWeek(date) {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        const target = normalizeDate(new Date(date));
        return target >= normalizeDate(startOfWeek) && target <= normalizeDate(endOfWeek);
    }

    function isThisMonth(date) {
        const now = new Date();
        const target = new Date(date);
        return now.getFullYear() === target.getFullYear() && now.getMonth() === target.getMonth();
    }

    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', function (e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            const rows = document.querySelectorAll('#peminjamanTable tbody tr');

            rows.forEach(row => {
                const dataDate = row.getAttribute('data-date');
                if (!dataDate) return;

                const show = {
                    today: isToday(dataDate),
                    week: isThisWeek(dataDate),
                    month: isThisMonth(dataDate),
                    all: true
                };

                row.style.display = show[filter] ? 'table-row' : 'none';
            });

            document.getElementById('filterBtn').textContent = 'Filter: ' + this.textContent;
        });
    });

    document.getElementById('searchInput').addEventListener('keyup', function () {
        const value = this.value.toLowerCase();
        const rows = document.querySelectorAll('#peminjamanTable tbody tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(value) ? 'table-row' : 'none';
        });
    });
</script>
