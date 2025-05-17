<?php
header('Content-Type: application/json');

// Database Connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "perpustakaan";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the action from the URL
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'get_data_anggota':
        getDataAnggota($conn);
        break;
    case 'get_data_buku':
        getDataBuku($conn);
        break;
    case 'get_buku_dipinjam':
        getBukuDipinjam($conn);
        break;
    case 'get_buku_terlambat':
        getBukuTerlambat($conn);
        break;
    case 'get_popular_books':
        getPopularBooks($conn);
        break;
    default:
        echo json_encode(["message" => "Invalid action"]);
        break;
}

// Function to fetch Data Anggota
function getDataAnggota($conn) {
    $sql = "SELECT COUNT(*) AS anggota_count FROM anggota";
    $result = $conn->query($sql);
    $data = $result->fetch_assoc();
    echo json_encode(["data" => $data['anggota_count']]);
}

// Function to fetch Data Buku
function getDataBuku($conn) {
    $sql = "SELECT COUNT(*) AS buku_count FROM buku";
    $result = $conn->query($sql);
    $data = $result->fetch_assoc();
    echo json_encode(["data" => $data['buku_count']]);
}

// Function to fetch Buku Dipinjam
function getBukuDipinjam($conn) {
    $sql = "SELECT COUNT(*) AS buku_dipinjam FROM peminjaman WHERE status = 'Dipinjam'";
    $result = $conn->query($sql);
    $data = $result->fetch_assoc();
    echo json_encode(["data" => $data['buku_dipinjam']]);
}

// Function to fetch Buku Terlambat
function getBukuTerlambat($conn) {
    $sql = "SELECT COUNT(*) AS buku_terlambat FROM peminjaman WHERE status = 'Terlambat'";
    $result = $conn->query($sql);
    $data = $result->fetch_assoc();
    echo json_encode(["data" => $data['buku_terlambat']]);
}

// Function to fetch Popular Books
function getPopularBooks($conn) {
    $sql = "SELECT buku_judul, COUNT(*) AS jumlah FROM peminjaman GROUP BY buku_judul ORDER BY jumlah DESC LIMIT 4";
    $result = $conn->query($sql);
    $books = [];
    while ($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
    echo json_encode(["data" => $books]);
}

$conn->close();
?>
