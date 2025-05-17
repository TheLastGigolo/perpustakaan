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
            margin-left: 5%; /* Shift filter slightly to the left */
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

        /* Action Button Icons */
        .btn-action img {
            width: 25px; /* Size of the action icon */
            height: 25px; /* Size of the action icon */
        }

        /* Center the filter and add search bar to the right */
        .filter-search-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .filter-search-container .filter-container {
            width: 30%;
            text-align: center;
        }

        .filter-search-container .search-container {
            width: 40%;
            text-align: right;
        }

        /* Left Button */
        .add-member-btn {
            margin-right: auto;
        }

        .search-container input {
            width: 100%; /* Make search bar take up full width */
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

        <!-- Data Anggota Title -->
        <h1>Data Anggota</h1>

        <!-- Filter dan Button Tambah Anggota -->
        <div class="filter-search-container">
            <div class="add-member-btn">
                <button class="btn btn-add" data-bs-toggle="modal" data-bs-target="#tambahAnggotaModal">Tambah Anggota</button>
            </div>

            <!-- Filter Kategori di Tengah -->
            <div class="filter-container">
                <select class="form-select filter-box">
                    <option selected>Filter</option>
                    <option value="1">Aktif</option>
                    <option value="2">Non-Aktif</option>
                </select>
            </div>

            <!-- Search Bar di Kanan -->
            <div class="search-container">
                <input type="text" class="form-control" id="searchBar" placeholder="Search for members">
            </div>
        </div>

        <!-- Data Anggota Table (Kosongkan Isi Tabel) -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIM</th>
                    <th>Jurusan</th>
                    <th>Alamat</th>
                    <th>No HP</th>
                    <th>Email</th>
                    <th>Status Mahasiswa</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="member-table">
                <!-- Table content will be dynamically populated later from backend -->
            </tbody>
        </table>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>@2025 Universitas Perjuangan</p>
    </div>

    <!-- Modal untuk Tambah Anggota -->
    <div class="modal fade" id="tambahAnggotaModal" tabindex="-1" aria-labelledby="tambahAnggotaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tambahAnggotaModalLabel">Tambah Anggota</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addMemberForm">
                        <div class="row">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="nama" class="form-label">Nama</label>
                                <input type="text" class="form-control" id="nama" placeholder="Masukkan Nama Anggota" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="nim" class="form-label">NIM</label>
                                <input type="text" class="form-control" id="nim" placeholder="Masukkan NIM" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="jurusan" class="form-label">Jurusan</label>
                                <select class="form-select" id="jurusan" required>
                                    <option selected>Pilih Jurusan</option>
                                    <option value="Teknik Informatika">Teknik Informatika</option>
                                    <option value="Sistem Informasi">Sistem Informasi</option>
                                    <option value="Manajemen">Manajemen</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="alamat" class="form-label">Alamat</label>
                                <input type="text" class="form-control" id="alamat" placeholder="Masukkan Alamat" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Masukkan Email" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="noHp" class="form-label">No HP</label>
                                <input type="text" class="form-control" id="noHp" placeholder="Masukkan No HP" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-primary" onclick="simpanAnggota()">Simpan</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal untuk Edit Anggota -->
    <div class="modal fade" id="editAnggotaModal" tabindex="-1" aria-labelledby="editAnggotaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editAnggotaModalLabel">Edit Anggota</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="editMemberForm">
                        <div class="row">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editNama" class="form-label">Nama</label>
                                <input type="text" class="form-control" id="editNama" placeholder="Masukkan Nama Anggota" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editNIM" class="form-label">NIM</label>
                                <input type="text" class="form-control" id="editNIM" placeholder="Masukkan NIM" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editJurusan" class="form-label">Jurusan</label>
                                <select class="form-select" id="editJurusan" required>
                                    <option selected>Pilih Jurusan</option>
                                    <option value="Teknik Informatika">Teknik Informatika</option>
                                    <option value="Sistem Informasi">Sistem Informasi</option>
                                    <option value="Manajemen">Manajemen</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editAlamat" class="form-label">Alamat</label>
                                <input type="text" class="form-control" id="editAlamat" placeholder="Masukkan Alamat" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="editEmail" placeholder="Masukkan Email" required>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="editNoHP" class="form-label">No HP</label>
                                <input type="text" class="form-control" id="editNoHP" placeholder="Masukkan No HP" required>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                    <button type="button" class="btn btn-primary" onclick="simpanEditAnggota()">Simpan</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Function to handle "Tambah Anggota"
        function simpanAnggota() {
            const nama = document.getElementById('nama').value;
            const nim = document.getElementById('nim').value;
            const jurusan = document.getElementById('jurusan').value;
            const alamat = document.getElementById('alamat').value;
            const email = document.getElementById('email').value;
            const noHp = document.getElementById('noHp').value;

            // Data to send to backend (using AJAX)
            const data = { nama, nim, jurusan, alamat, email, noHp };

            // Send data to backend
            fetch('/your-backend-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                alert('Anggota berhasil ditambahkan!');
                $('#tambahAnggotaModal').modal('hide');
            })
            .catch(error => console.error('Error:', error));
        }

        // Function to handle "Edit Anggota"
        function simpanEditAnggota() {
            const nama = document.getElementById('editNama').value;
            const nim = document.getElementById('editNIM').value;
            const jurusan = document.getElementById('editJurusan').value;
            const alamat = document.getElementById('editAlamat').value;
            const email = document.getElementById('editEmail').value;
            const noHp = document.getElementById('editNoHP').value;

            // Data to send to backend
            const data = { nama, nim, jurusan, alamat, email, noHp };

            // Send data to backend (use the correct endpoint and method)
            fetch('/your-backend-edit-endpoint', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                alert('Anggota berhasil diperbarui!');
                $('#editAnggotaModal').modal('hide');
            })
            .catch(error => console.error('Error:', error));
        }

        function editAnggota(memberId) {
            // Simulate fetching member data
            const anggota = {
                id: memberId,
                nama: "Rafly Rachman",
                nim: "2203010295",
                jurusan: "Teknik Informatika",
                alamat: "Jl. Merpati No. 10, Jakarta",
                email: "203010295@ac.id",
                noHP: "082213897349"
            };

            // Fill the form with the member's data
            document.getElementById('editNama').value = anggota.nama;
            document.getElementById('editNIM').value = anggota.nim;
            document.getElementById('editJurusan').value = anggota.jurusan;
            document.getElementById('editAlamat').value = anggota.alamat;
            document.getElementById('editEmail').value = anggota.email;
            document.getElementById('editNoHP').value = anggota.noHP;

            // Show the modal for editing
            $('#editAnggotaModal').modal('show');
        }

        function deleteMember(memberId) {
            if (confirm("Are you sure you want to delete this member?")) {
                alert("Member " + memberId + " deleted.");
            }
        }
    </script>
</body>
</html>
