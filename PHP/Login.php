<?php 
include '../HTML-PHP/head.php';
include '../HTML-PHP/header.php';
session_start();

$mysqli = new mysqli("localhost", "root", "", "repmasterai");

// Check connection
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

$logoutHTML = "
    <form method='post' action=''>
        <button type='submit' name='logout'>Logout</button>
    </form>";

$formHTML = "
    <form method='post' action='Login.php'>
        <label for='username'> Enter Username</label><br>
        <input type='text' id='username' name='username' required><br>
        <label for='password'>Enter Password</label><br>
           <input type='password' id='password' name='password' required>
      <i class='bi bi-eye-slash' id='toggle_password' onclick='showPassword(\"password\")'></i><br>
        <input type='submit'><br>
        <a href='CreateLogin.php'>Don't have an account? Create it here!</a>
    </form>";
    if (isset($_POST['logout'])) {
    // Destroy the session
    session_destroy();

    // Redirect to a login page or another appropriate location
    header('Location: login.php');
    exit;
}

if (!isset($_SESSION['username'])) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $receivedUsername = $_POST['username'];
        $receivedPassword = $_POST['password'];

        if (!empty($receivedUsername) && !empty($receivedPassword)) {
            $stmt = $mysqli->prepare("SELECT * FROM login WHERE Username = ?");
            $stmt->bind_param("s", $receivedUsername);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $firstRow = $result->fetch_assoc();
                $dbPassword = $firstRow['Password'];

                if (password_verify($receivedPassword, $dbPassword)) {
                    echo "<p>You have been successfully logged in</p>";
                    $_SESSION['username'] = $receivedUsername;
                } else {
                    echo "<p>Incorrect password, try again.</p>";
                    echo $formHTML;
                }
            } else {
                echo "<p>This username does not exist.</p>";
                echo $formHTML;
            }

            $stmt->close();
        } else {
            echo "<p>Please fill out both username and password fields.</p>";
            echo $formHTML;
        }
    } else {
        echo $formHTML;
    }
} else {
    echo "<p>You're already logged in.</p>";
    echo $logoutHTML;
}

include '../HTML-PHP/footer.php';
?>
