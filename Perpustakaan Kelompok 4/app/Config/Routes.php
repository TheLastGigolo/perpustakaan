<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Routes extends BaseConfig
{
    // Apakah semua routes defaultnya akan menggunakan route yang ada di sini
    public $defaultRoute = 'Auth::login'; // Route default ke halaman login

    // Set route yang dibutuhkan
    public function initRoutes()
    {
        $routes = Services::routes();

        // Route untuk login
        $routes->get('/login', 'Auth::login'); // Menampilkan halaman login
        $routes->post('/login-process', 'Auth::loginProcess'); // Menangani login
        
        // API route untuk login (JSON)
        $routes->post('/api/login', 'Auth::apiLogin'); // API untuk login dengan JSON
    }
}
