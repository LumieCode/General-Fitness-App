<?php
echo "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <link rel='stylesheet' href='../CSS/style.css'>
    <title>Fitness app</title>
    <script src='../JS/passwordVerify.js'></script>
    <script src='../JS/jquery.js'></script>
    <script src='../JS/pullupClass.js' onload module></script>
    <script src='../JS/pushupClass.js' onload module></script>
    <script src='../JS/situpclass.js' onload module></script>
    <script src='../JS/squatclass.js' onload module></script>

    <link rel='icon' type='image/x-icon' href='../images/favicon.ico'>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css' />
       <!-- Include TensorFlow.js and PoseNet scripts -->
       <script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js'></script>
    <!-- Require the peer dependencies of pose-detection. -->
<script src='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core'></script>
<script src='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter'></script>

<!-- You must explicitly require a TF.js backend if you're not using the TF.js union bundle. -->
<script src='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl'></script>
<!-- Alternatively you can use the WASM backend: <script src='https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/dist/tf-backend-wasm.js'></script> -->

<script src='https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection'></script>

    </script>
       <script src='../JS/fitnessRecord.js' onload></script>
</head>";
?>