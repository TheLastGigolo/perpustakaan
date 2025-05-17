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
            padding-top: 90px;
            flex-grow: 1;
        }

        /* Table Styles */
        .table {
            margin-top: 20px;
        }

        .table th, .table td {
            vertical-align: middle;
            text-align: center;
        }

        .table img {
            width: 60px;
            height: 90px;
            object-fit: cover;
        }

        .btn-add {
            background-color: #56804E;
            color: white;
        }

        /* Modal Styles */
        .modal-header, .modal-footer {
            background-color: #56804E;
            color: white;
        }

        .btn-filter {
            margin-bottom: 20px;
        }

        /* Filter */
        .filter-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        .filter-box {
            width: 250px; /* Mengatur lebar filter box */
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

        <!-- Data Buku Title -->
        <h1>Data Buku</h1>

        <!-- Filter dan Button Tambah Buku -->
        <div class="d-flex justify-content-between align-items-center mb-3">



            <!-- Tombol Tambah Buku -->
            <button class="btn btn-add" data-bs-toggle="modal" data-bs-target="#addBookModal">Tambah Buku</button>

            <!-- Filter Kategori di Tengah -->
            <div class="filter-container">
                <select class="form-select filter-box">
                    <option selected>Filter Kategori</option>
                    <option value="1">Pendidikan</option>
                    <option value="2">Teknologi</option>
                    <option value="3">Fiksi</option>
                </select>
            </div>

        <!-- Search Bar di Kanan -->
        <div class="d-flex justify-content-end">
            <input type="text" class="form-control w-75" placeholder="Search for books"> <!-- Memperlebar lebar search bar -->
        </div>
        </div>


        <!-- Data Buku Table -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Buku</th>
                    <th>Kode Buku</th>
                    <th>Penerbit</th>
                    <th>Kategori</th>
                    <th>Halaman</th>
                    <th>ISBN</th>
                    <th>Tahun Terbit</th>
                    <th>Ketersediaan</th>
                    <th>Cover</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="book-table">
                <!-- Rows will be populated by API -->
            </tbody>
        </table>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>@2025 Universitas Perjuangan</p>
    </div>

    <!-- Modal Tambah Buku -->
    <div class="modal fade" id="addBookModal" tabindex="-1" aria-labelledby="addBookModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addBookModalLabel">Tambah Buku</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <!-- Nama Buku -->
                        <div class="mb-3">
                            <label for="bookName" class="form-label">Nama Buku</label>
                            <input type="text" class="form-control" id="bookName" placeholder="Masukkan Nama Buku">
                        </div>
                        <!-- Kode Buku -->
                        <div class="mb-3">
                            <label for="bookCode" class="form-label">Kode Buku</label>
                            <input type="text" class="form-control" id="bookCode" placeholder="Masukkan Kode Buku">
                        </div>
                        <!-- Penerbit -->
                        <div class="mb-3">
                            <label for="bookPublisher" class="form-label">Penerbit</label>
                            <input type="text" class="form-control" id="bookPublisher" placeholder="Masukkan Penerbit">
                        </div>
                        <!-- Kategori -->
                        <div class="mb-3">
                            <label for="bookCategory" class="form-label">Kategori</label>
                            <select class="form-select" id="bookCategory">
                                <option selected>Pilih kategori</option>
                                <option value="1">Pendidikan</option>
                                <option value="2">Teknologi</option>
                                <option value="3">Fiksi</option>
                            </select>
                        </div>
                        <!-- Halaman -->
                        <div class="mb-3">
                            <label for="bookPages" class="form-label">Halaman</label>
                            <input type="number" class="form-control" id="bookPages" placeholder="Masukkan Jumlah Halaman">
                        </div>
                        <!-- ISBN -->
                        <div class="mb-3">
                            <label for="bookISBN" class="form-label">ISBN</label>
                            <input type="text" class="form-control" id="bookISBN" placeholder="Masukkan ISBN">
                        </div>
                        <!-- Tahun Terbit -->
                        <div class="mb-3">
                            <label for="bookYear" class="form-label">Tahun Terbit</label>
                            <input type="number" class="form-control" id="bookYear" placeholder="Masukkan Tahun Terbit">
                        </div>
                        <!-- Cover -->
                        <div class="mb-3">
                            <label for="bookCover" class="form-label">Cover</label>
                            <input type="file" class="form-control" id="bookCover">
                        </div>
                    </form>
                </div>
            <div class="modal-footer">
                <!-- Button Simpan -->
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Simpan</button>
                <!-- Button Batal -->
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Edit Buku -->
<div class="modal fade" id="editBookModal" tabindex="-1" aria-labelledby="editBookModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editBookModalLabel">Edit Buku</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="editBookForm">
                    <!-- Nama Buku -->
                    <div class="mb-3">
                        <label for="editBookName" class="form-label">Nama Buku</label>
                        <input type="text" class="form-control" id="editBookName" placeholder="Masukkan Nama Buku">
                    </div>
                    <!-- Kode Buku -->
                    <div class="mb-3">
                        <label for="editBookCode" class="form-label">Kode Buku</label>
                        <input type="text" class="form-control" id="editBookCode" placeholder="Masukkan Kode Buku">
                    </div>
                    <!-- Penerbit -->
                    <div class="mb-3">
                        <label for="editBookPublisher" class="form-label">Penerbit</label>
                        <input type="text" class="form-control" id="editBookPublisher" placeholder="Masukkan Penerbit">
                    </div>
                    <!-- Kategori -->
                    <div class="mb-3">
                        <label for="editBookCategory" class="form-label">Kategori</label>
                        <select class="form-select" id="editBookCategory">
                            <option selected>Pilih kategori</option>
                            <option value="1">Pendidikan</option>
                            <option value="2">Teknologi</option>
                            <option value="3">Fiksi</option>
                        </select>
                    </div>
                    <!-- Halaman -->
                    <div class="mb-3">
                        <label for="editBookPages" class="form-label">Halaman</label>
                        <input type="number" class="form-control" id="editBookPages" placeholder="Masukkan Jumlah Halaman">
                    </div>
                    <!-- ISBN -->
                    <div class="mb-3">
                        <label for="editBookISBN" class="form-label">ISBN</label>
                        <input type="text" class="form-control" id="editBookISBN" placeholder="Masukkan ISBN">
                    </div>
                    <!-- Tahun Terbit -->
                    <div class="mb-3">
                        <label for="editBookYear" class="form-label">Tahun Terbit</label>
                        <input type="number" class="form-control" id="editBookYear" placeholder="Masukkan Tahun Terbit">
                    </div>
                    <!-- Cover -->
                    <div class="mb-3">
                        <label for="editBookCover" class="form-label">Cover</label>
                        <input type="file" class="form-control" id="editBookCover">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal" onclick="saveBookChanges()">Simpan</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Batal</button>
            </div>
        </div>
    </div>
</div>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<script>
        // Fetch data buku from API
        window.onload = function() {
            fetchBooks();
        };

        function fetchBooks() {
            fetch('http://localhost:8080/api/data_buku')
                .then(response => response.json())
                .then(data => {
                    const tableBody = document.getElementById('book-table');
                    data.forEach((book, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td>${book.nama_buku}</td>
                            <td>${book.kode_buku}</td>
                            <td>${book.penerbit}</td>
                            <td>${book.kategori}</td>
                            <td>${book.halaman}</td>
                            <td>${book.isbn}</td>
                            <td>${book.tahun_terbit}</td>
                            <td>${book.ketersediaan}</td>
                            <td><img src="${book.cover}" alt="Cover"></td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="editBook(${book.id})">Edit</button>
                                <button class="btn btn-danger btn-sm">Hapus</button>
                            </td>
                        `;
                        tableBody.appendChild(row);
                    });
                })
                .catch(error => console.error('Error fetching books:', error));
        }

        function editBook(bookId) {
            // Simulate fetching book data for editing (this is just an example)
            fetch(`http://localhost:8080/api/data_buku/${bookId}`)
                .then(response => response.json())
                .then(book => {
                    // Fill modal fields with the current book data
                    document.getElementById('editBookName').value = book.nama_buku;
                    document.getElementById('editBookCode').value = book.kode_buku;
                    document.getElementById('editBookPublisher').value = book.penerbit;
                    document.getElementById('editBookCategory').value = book.kategori;
                    document.getElementById('editBookPages').value = book.halaman;
                    document.getElementById('editBookISBN').value = book.isbn;
                    document.getElementById('editBookYear').value = book.tahun_terbit;
                    document.getElementById('editBookCover').value = book.cover;
                    
                    // Show modal for editing
                    $('#editBookModal').modal('show');
                })
                .catch(error => console.error('Error fetching book for editing:', error));
        }

    </script>
