<?php
require_once("../connection.php");

$image = $_POST['image'] ?? "";
$title = $_POST['title'] ?? "";
$content = $_POST['content'] ?? "";
$author = $_POST['author'] ?? "Admin";
$date = date('Y-m-d H:i:s');

$response = [
  'success' => false,
  'message' => '',
  'article' => []
];

if ($title === "" || $content === "") {
  $response['message'] = "Article title and content cannot be empty!";
  exit(json_encode($response));
}

// Add placeholder if image is empty
if ($image === "") {
  $image = "https://placehold.co/600x400";
}

$create_query = $conn->prepare("INSERT INTO articles (title, content, created_at, image, author) VALUES(?, ?, ?, ?, ?)");
$create_query->bind_param("sssss", $title, $content, $date, $image, $author);
$create_query->execute();
$create_query->store_result();
$id = $create_query->insert_id;

// Fetch row
$article = mysqli_query($conn, "SELECT * FROM articles WHERE id={$id}");
$article = $article->fetch_assoc();
$response['success'] = true;
$response['message'] = 'Article created successfully.';
$response['article'] = $article;

echo json_encode($response);
