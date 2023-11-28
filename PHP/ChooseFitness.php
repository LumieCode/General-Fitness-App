<?php 
include '../HTML-PHP/head.php';
include '../HTML-PHP/header.php';
session_start();


echo "
    <video id='video' width='640' height='480' autoplay></video>
    <canvas id='output' width='640' height='480'></canvas>
    <p>Pull-up Count: <span id='pullupCount'>0</span></p>
    <p>Fergus the 4th and 7th nearly always miss, we need to figure out why.</p>
";


include '../HTML-PHP/footer.php';
?>