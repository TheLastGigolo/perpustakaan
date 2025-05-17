<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\API\ResponseTrait;

class Auth extends Controller
{
    use ResponseTrait;

    public function login()
    {
        return view('auth/login');  // Tampilkan halaman login
    }

    public function homepage()
    {
        return view('auth/homepage');  // Tampilkan homepage setelah login
    }

    public function loginProcess()
    {
        // Dummy login logic
        // Cek user dan password disini, bisa ditambahkan validasi
        
        // Redirect ke homepage setelah login sukses
        return redirect()->to('/homepage');
    }

    // API untuk login, menerima data dalam bentuk JSON
    public function apiLogin()
    {
        $data = $this->request->getJSON();

        if (isset($data->username) && isset($data->password)) {
            // Validasi login (misalnya dengan database atau data dummy)
            if ($data->username == 'admin' && $data->password == 'admin123') {
                return $this->respond(['status' => 'success', 'message' => 'Login successful']);
            } else {
                return $this->failUnauthorized('Invalid credentials');
            }
        } else {
            return $this->failValidationError('Username and password are required');
        }
    }
}
