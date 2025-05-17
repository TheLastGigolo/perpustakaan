<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Page</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bookerly+Display:wght@400;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }
        body {
            display: flex;
            min-height: 100vh;
            background-color: #f5f5f5;
        }
        .left-panel {
            flex: 1;
            background-color: #56804E;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: white;
            position: relative;
        }
        .right-panel {
            flex: 1;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .logo-container {
            position: absolute;
            top: 40px;
            left: 40px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .logo-image {
            width: 40px;
            height: 40px;
            background-color: white; /* Placeholder color */
            border-radius: 4px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: bold;
        }
        .welcome-content {
            margin-top: 80px;
        }
        .welcome-title {
            font-family: 'Bookerly Display', serif;
            font-size: 64px;
            margin-bottom: 20px;
            font-weight: 700;
        }
        .welcome-text {
            font-family: 'Arial', sans-serif;
            font-size: 20px; /* Ukuran font 20px */
            line-height: 1.5;
            max-width: 80%;
        }
        .login-container {
            max-width: 400px;
            margin: 0 auto;
            width: 100%;
        }
        .login-title {
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .login-subtitle {
            font-size: 16px;
            color: #666;
            margin-bottom: 30px;
        }
        .input-group {
            margin-bottom: 20px;
        }
        .input-label {
            display: block;
            margin-bottom: 8px;
            font-size: 14px;
            color: #333;
        }
        .input-field {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #f9f9f9;
        }
        .input-field:focus {
            outline: none;
            border-color: #56804E;
        }
        .remember-me {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .remember-checkbox {
            margin-right: 8px;
        }
        .login-button {
            width: 100%;
            padding: 12px;
            background-color: #56804E;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-bottom: 20px;
        }
        .login-button:hover {
            background-color: #56804E;
        }
        .forgot-password {
            text-align: right;
        }
        .forgot-password a {
            color: #666;
            text-decoration: none;
            font-size: 14px;
        }
        .forgot-password a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="left-panel">
        <div class="logo-container">
            <!-- Gambar logo dari folder yang telah ditentukan -->
            <img class="logo-image" src="https://th.bing.com/th/id/OIP.XGE6dPdRe6p4JRwicO88mQHaHS?rs=1&pid=ImgDetMain" alt="Logo Unper" />
            <div class="logo-text">Perpustakaan UNPER</div>
        </div>
        <div class="welcome-content">
            <h1 class="welcome-title">Welcome Back!</h1>
            <p class="welcome-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ex a erat blandit pharetra in sed odio.</p>
        </div>
    </div>
    
    <div class="right-panel">
        <div class="login-container">
            <h2 class="login-title">Login</h2>
            <p class="login-subtitle">Welcome to Please Login to your Website.</p>
            
            <form id="loginForm" method="POST">
                <div class="input-group">
                    <label class="input-label">Username / Email</label>
                    <input type="text" class="input-field" placeholder="username / Email" id="username" name="username" required>
                </div>
                
                <div class="input-group">
                    <label class="input-label">Password</label>
                    <input type="password" class="input-field" placeholder="password" id="password" name="password" required>
                </div>
                
                <div class="remember-me">
                    <input type="checkbox" class="remember-checkbox" id="rememberMe" name="remember">
                    <label for="rememberMe">remember Me</label>
                </div>
                
                <button type="submit" class="login-button">Login</button>
                
                <div class="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Handle form submission with API request
        const form = document.getElementById('loginForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent default form submission

            // Get form data
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Prepare the data to be sent
            const data = { username, password };

            // Send data to the backend using Fetch API
            fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.href = 'homepage.php'; // Redirect to homepage
                } else {
                    alert('Login failed: ' + data.message); // Show error message
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
        });
    </script>
</body>
</html>
