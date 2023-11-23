<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/style.css">
    <title>Fitness app</title>
    <link rel="icon" type="image/x-icon" href="../images/favicon.ico">
</head>
<header>
<h1><a href="homepage.php" id="homepageLink">RepMasterAI</a></h1>

<div id="login">
<a id="loginLink" href="Login.php">Login</a>
</div>

<div id="subheader">
<a class="subheaderLinks" href="ChooseFitness.php">Record fitness</a>
<a class="subheaderLinks" href="Results.php">Results</a>
<a class="subheaderLinks" href="Leaderboard.php">Leaderboard</a>
<a class="subheaderLinks" href="About-us.php">About us</a>
</div>
</header>
<?php
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
        <input type='password' id='password' name='password' required><br>
        <input type='submit'><br>
        <a href='CreateLogin.php'>Don't have an account? Create it here!</a>
    </form>";

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
?>
</body>

<footer>


<a class="footerLinks" href="https://github.com/shamjam" target="blank">Shamjams github</a>
<a class="footerLinks"href="https://github.com/LumieCode"  target="blank">Nazar's github</a>
<a class="footerLinks" href="https://blog.tensorflow.org/2021/05/next-generation-pose-detection-with-movenet-and-tensorflowjs.html"  target="blank">movenet.js</a>



<a class="footerLinks" href="https://en.wikipedia.org/wiki/Articulated_body_pose_estimation"  target="blank">Pose estimation ai</a>
<a class="footerLinks" href="https://technoscience.ca/programmes/expo-sciences/"  target="blank">Exposcience</a>
<a class="footerLinks" href="https://www.instagram.com/lumiecode/"  target="blank">Instagram</a>



<p class="footerLinks">Contact us: lumieCode@gmail.com</p>
<p class="footerLinks">Contact us: 514 348 4989</p>
<a class="footerLinks" href="https://www.foodintorg.com/misc"  target="blank">Other projects</a>


</footer>

</html>
