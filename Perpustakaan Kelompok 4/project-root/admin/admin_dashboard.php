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

        /* Main Content */
        .main-content {
            margin-left: 250px;
            padding: 20px;
            width: 100%;
            background-color: #f8f8f8;
            padding-top: 90px; /* Adjust for space for navbar */
            flex-grow: 1;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }

        .stat-box {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            transition: transform 0.2s ease;
        }

        .stat-box:hover {
            transform: scale(1.05);
        }

        .stat-box h3 {
            margin-bottom: 10px;
            font-size: 18px;
        }

        .stat-box p {
            font-size: 20px;
        }

        /* Pie Chart */
        #popular-books-chart {
            max-width: 600px;
            margin: 30px auto;
        }

        /* Footer */
        .footer {
            background-color: #56804E;
            color: white;
            padding: 12px 15px;
            text-align: center;
            position: fixed;
            bottom: 0;
            width: 100%;
            z-index: 1000;
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
                        <a class="dropdown-item logout" href="login.php">Logout</a> <!-- Red-colored Logout with smaller size -->
                    </div>
                </div>
            </div>
        </nav>

        <!-- Dashboard Title -->
        <header>
            <h1>Dashboard</h1>
        </header>

        <!-- Stats Section -->
        <div class="stats">
            <div class="stat-box">
                <h3>Data Anggota</h3>
                <p id="data-anggota">500</p>
            </div>
            <div class="stat-box">
                <h3>Data Buku</h3>
                <p id="data-buku">600</p>
            </div>
            <div class="stat-box">
                <h3>Buku Dipinjam</h3>
                <p id="buku-dipinjam">10</p>
            </div>
            <div class="stat-box">
                <h3>Buku Terlambat</h3>
                <p id="buku-terlambat">500</p>
            </div>
        </div>

        <!-- Popular Books Chart -->
        <div class="chart">
            <h3>Buku Populer</h3>
            <canvas id="popular-books-chart"></canvas>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>@2025 Universitas Perjuangan</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        window.onload = function() {
            fetchPopularBooks();
        };

        function fetchPopularBooks() {
            const ctx = document.getElementById('popular-books-chart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Buku 1', 'Buku 2', 'Buku 3', 'Buku 4'],
                    datasets: [{
                        label: 'Buku Populer',
                        data: [50, 20, 15, 15],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733']
                    }]
                }
            });
        }
    </script>
</body>
</html>
