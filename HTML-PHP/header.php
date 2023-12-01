<?php echo "
<header>
    <h1><a href='homepage.php' id='homepageLink'>RepMasterAI</a></h1>
    
    <div id='login'>";

    if(isset($_SESSION['username'])){
      echo "<a id='loginLink' href='Login.php'>Logout</a>";
    }else{
      echo "<a id='loginLink' href='Login.php'>Login</a>";
    }

    echo "
    </div>
    
    <div id='subheader'>
    <a class='subheaderLinks' href='ChooseFitness.php'>Record fitness</a>
    <a class='subheaderLinks' href='Results.php'>Results</a>
    <a class='subheaderLinks' href='Leaderboard.php'>Leaderboard</a>
    <a class='subheaderLinks' href='About-us.php'>About us</a>
    </div>
    </header>
    <body>
    ";
?>