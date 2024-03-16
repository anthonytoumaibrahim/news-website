<?php
// Fix CORS error
header("Access-Control-Allow-Origin: *");

$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "newsdb";

$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
  exit("Connection failed: " . $conn->connect_error);
}
