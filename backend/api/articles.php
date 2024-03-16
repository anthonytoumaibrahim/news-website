<?php
require_once("../connection.php");

$response = [
  'articles' => []
];

$query = mysqli_query($conn, "SELECT * FROM articles ORDER BY id DESC");
while ($row = mysqli_fetch_assoc($query)) {
  array_push($response['articles'], $row);
}

echo json_encode($response);
