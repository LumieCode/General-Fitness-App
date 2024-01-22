<?php 
session_start();
include '../HTML-PHP/head.php';
include '../HTML-PHP/header.php';

echo "
    <video id='video' width='640' height='480' autoplay></video>
    <canvas id='canvas' width='640' height='480'></canvas>
    <div id='counters'>
    <p>Pull-up Count: <span id='pullupCount'>0</span></p>
     <p>Push-up Count: <span id='pushupCount'>0</span></p>
    <p>Sit-up Count: <span id='situpCount'>0</span></p>
    <p>Squat Count: <span id='squatCount'>0</span></p>
    </div>
";


include '../HTML-PHP/footer.php';
?>