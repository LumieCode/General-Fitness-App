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

$formHTML = "
    <form method='post' id='theForm' action='CreateLogin.php'>
        <label for='username'> Enter Username</label><br>
        <input type='text' id='username' name='username'><br>
        <label for='password'>Enter Password</label><br>
        <input type='password' id='password' name='password'><br>
        <label for='repassword'>Reenter Password</label><br>
        <input type='password' id='repassword' name='repassword'><br>
    </form>
    <button onclick='verifyPassword()'>Submit here!</button>
    <div id='msgDiv'></div>
";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize user inputs
    $receivedUsername = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
    $receivedPassword = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
     
    if (!empty($receivedUsername) && !empty($receivedPassword)) {
        // Check if the username already exists
        $checkStmt = $mysqli->prepare("SELECT Username FROM login WHERE Username = ?");
        $checkStmt->bind_param("s", $receivedUsername);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            echo $formHTML;
            echo "<p>This username is already taken. Please choose another one.</p>";
            $checkStmt->close();
        } else {
            // Use prepared statements to prevent SQL injection
            $stmt = $mysqli->prepare("INSERT INTO login (Username, Password) VALUES (?, ?)");
            $hashedPassword = password_hash($receivedPassword, PASSWORD_DEFAULT);
            $stmt->bind_param("ss", $receivedUsername, $hashedPassword);

            if ($stmt->execute()) {
                echo "<p>You have successfully created an account, proceed to log in. We have not built a recover password function so please don't lose your password!</p>";
            } else {
                echo "<p>Something went wrong. Please try again later.</p>";
            }

            $stmt->close();
        }
    } else {
        echo "<p>Please fill out both username and password fields.</p>";
    }
} else {
    echo $formHTML;
}
   include '../HTML-PHP/footer.php';
?>

