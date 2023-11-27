<?php
$mysqli = new mysqli("localhost", "root", "", "repmasterai");

// Check connection
if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: " . $mysqli->connect_error;
    exit();
}

// Validate and sanitize the input
$attemptedUsername = isset($_POST['attemptedUsername']) ? $_POST['attemptedUsername'] : '';
$attemptedUsername = filter_var($attemptedUsername, FILTER_SANITIZE_STRING);

// Check if the username already exists
$query = "SELECT * FROM login WHERE Username = ?";
$stmt = $mysqli->prepare($query);

// Bind the parameter
$stmt->bind_param("s", $attemptedUsername);

// Execute the query
$stmt->execute();

// Fetch the result
$result = $stmt->get_result();

// Check if a user with the given username already exists
if ($result->num_rows > 0) {
    echo "Username already exists. Please choose a different username.";
} else {
    echo "Username is available. You can proceed with registration.";
}

// Close the statement
$stmt->close();
?>
