<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../CSS/style.css">
    <title>Fitness app</title>
    <script src="../JS/passwordVerify.js"></script>
        <link rel="icon" type="image/x-icon" href="../images/favicon.ico">

</head>
<?php session_start(); ?>
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

<body>
<div>
<?php 
$mysqli = new mysqli("localhost","root","","repmasterai");

// Check connection
if ($mysqli -> connect_errno) {
  echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
  exit();
}
$formHTML = "<form method='post'id='theForm' action='CreateLogin.php'>
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
    $receivedUsername = $_POST['username'];
    $receivedPassword = $_POST['password'];
    
    if (isset($_POST['username'])) {
        $sql = "INSERT INTO login (Username, Password)
VALUES ('" . $receivedUsername . "', '" .  password_hash($receivedPassword, PASSWORD_DEFAULT) . "')";

        $result = $mysqli->query($sql);
echo "<p> You have successfully created an account, proceed to log in. We have not built a recover password function so please don't lose your password!</p>";
    } else {
    echo $formHTML;
}
} else {
    echo $formHTML;
}



?>
</div>
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
