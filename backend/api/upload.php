<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

session_start();
if (empty($_SESSION['admin_logged_in'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$uploadDir = dirname(__DIR__) . '/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$maxSize = 5 * 1024 * 1024; // 5MB

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    exit;
}

$file = $_FILES['file'];
if ($file['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'Upload error']);
    exit;
}
if ($file['size'] > $maxSize) {
    echo json_encode(['success' => false, 'message' => 'File too large (max 5MB)']);
    exit;
}
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);
if (!in_array($mime, $allowed)) {
    echo json_encode(['success' => false, 'message' => 'Invalid file. Use JPG, PNG, GIF or WebP']);
    exit;
}

$ext = pathinfo($file['name'], PATHINFO_EXTENSION) ?: 'jpg';
$prefix = isset($_POST['prefix']) ? preg_replace('/[^a-z0-9_]/', '', $_POST['prefix']) . '_' : 'img_';
$name = $prefix . uniqid() . '_' . time() . '.' . strtolower($ext);
$path = $uploadDir . $name;

if (move_uploaded_file($file['tmp_name'], $path)) {
    $url = '/uploads/' . $name;
    echo json_encode(['success' => true, 'url' => $url]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save file']);
}
