<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layanan dan Bantuan - Perpustakaan UNPER</title>
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
        .page-title {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .accordion-button {
            font-weight: bold;
            background-color: #56804E;
            color: white;
        }
        .accordion-button:not(.collapsed) {
            background-color: #4b7b44;
            color: white;
        }
        .accordion-item {
            margin-bottom: 10px;
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
    <h1 class="page-title">Layanan dan Bantuan</h1>

    <!-- Accordion -->
    <div class="accordion" id="accordionExample">
        <!-- Layanan 1 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Layanan 1: Pengembalian Buku
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet urna et neque cursus, ac lacinia lorem cursus. Morbi facilisis sit amet erat ac ullamcorper.
                </div>
            </div>
        </div>

        <!-- Layanan 2 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Layanan 2: Pemesanan Buku
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Nulla vestibulum orci in felis volutpat, sit amet volutpat velit dictum. 
                </div>
            </div>
        </div>

        <!-- Layanan 3 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Layanan 3: Konsultasi dengan Pustakawan
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in arcu nec risus tempor posuere. Donec nec orci ut nulla venenatis pharetra. 
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <p>@2025 Universitas Perjuangan</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
