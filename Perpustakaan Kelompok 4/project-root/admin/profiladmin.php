<!DOCTYPE html> 
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Pengguna - Perpustakaan UNPER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
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
        .profile-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 40px;
            margin-top: 50px;
        }
        .profile-image {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            border: 5px solid #56804E;
            object-fit: cover;
        }
        .profile-info {
            flex: 1;
        }
        .profile-info h3 {
            font-size: 28px;
            font-weight: bold;
        }
        .profile-info p {
            font-size: 18px;
            margin-bottom: 10px;
        }
        .profile-status {
            font-weight: bold;
            color: green;
        }

        /* Tombol Favorite */
        .favorite-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f1f1f1;
            color: #333;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 8px 20px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease, color 0.3s ease;
            margin-top: 20px; /* Menambahkan jarak antara tombol dan informasi profil */
        }

        .favorite-btn i {
            margin-right: 10px; /* Memberikan jarak antara ikon dan teks */
        }

        .favorite-btn:hover {
            background-color: #56804E;
            color: white;
            border-color: #56804E;
        }

        .favorite-btn:active {
            background-color: #4b7b44; /* Warna saat tombol di klik */
        }

        /* Tombol Edit Password */
        .edit-password-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
            color: #56804E;
            border: 1px solid #56804E;
            border-radius: 5px;
            padding: 8px 20px;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease, color 0.3s ease;
            margin-top: 10px;
        }

        .edit-password-btn:hover {
            background-color: #56804E;
            color: white;
            border-color: #56804E;
        }

        .edit-password-btn:active {
            background-color: #4b7b44;
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
<div class="container">
    <div class="profile-container">
        <!-- Gambar Profil -->
        <div>
            <img src="https://via.placeholder.com/180" alt="Profile Image" id="profile-image" class="profile-image">
        </div>

        <!-- Informasi Profil -->
        <div class="profile-info">
            <h3 id="user-name">Rafly Rachman</h3>
            <p><strong>Email:</strong> <span id="user-email">rafly@example.com</span></p>
            <p><strong>NIM:</strong> <span id="user-nim">1234567890</span></p>
            <p><strong>Jurusan:</strong> <span id="user-major">Teknik Informatika</span></p>
            <p><strong>Alamat:</strong> <span id="user-address">Jalan Raya No.123, Kota X</span></p>
            <p><strong>No Hp:</strong> <span id="user-phone">081234567890</span></p>
            <p class="profile-status">Status Mahasiswa: <span id="user-status" style="color: green;">Aktif</span></p>

            <!-- Tombol Favorite yang mengarah ke halaman favorite.php -->
            <a href="favorite.php" class="favorite-btn">
                <i class="fas fa-heart"></i> Favorite
            </a>

            <!-- Tombol Edit Password -->
            <button class="edit-password-btn" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                <i class="fas fa-key"></i> Ubah Password
            </button>
        </div>
    </div>
</div>

<!-- Modal Ubah Password -->
<div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="changePasswordModalLabel">Ubah Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="changePasswordForm">
          <div class="mb-3">
            <label for="newPassword" class="form-label">Password Baru</label>
            <input type="password" class="form-control" id="newPassword" placeholder="Masukkan Password Baru" required>
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Konfirmasi Password</label>
            <input type="password" class="form-control" id="confirmPassword" placeholder="Konfirmasi Password Baru" required>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Simpan</button>
      </div>
      </form>
    </div>
  </div>
</div>

<!-- Footer -->
<div class="footer">
    <p>@2025 Universitas Perjuangan</p>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/js/all.min.js"></script>

<script>
// Fetch user profile data from API
fetch('http://localhost:8080/api/user/profile')
    .then(response => response.json())
    .then(data => {
        // Populate profile information
        document.getElementById('profile-image').src = data.profileImage; // Profile image
        document.getElementById('user-name').textContent = data.name; // Name
        document.getElementById('user-email').textContent = data.email; // Email
        document.getElementById('user-nim').textContent = data.nim; // NIM
        document.getElementById('user-major').textContent = data.major; // Major
        document.getElementById('user-address').textContent = data.address; // Address
        document.getElementById('user-phone').textContent = data.phone; // Phone number
        document.getElementById('user-status').textContent = data.status; // User status (active)
    })
    .catch(error => console.error('Error fetching user profile:', error));

// Handle the change password form submission
document.getElementById('changePasswordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }

    // Send password change request to API (you can adjust the endpoint and payload as needed)
    fetch('http://localhost:8080/api/user/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Password berhasil diubah!');
            // Close the modal after successful password change
            const modal = bootstrap.Modal.getInstance(document.getElementById('changePasswordModal'));
            modal.hide();
        } else {
            alert('Gagal mengubah password: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengubah password.');
    });
});
</script>

</body>
</html>
