<?php
/**
 * Gallery API - Lagankhel Dental Clinic
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

$pdo = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, image_url, title, category, sort_order FROM gallery_images WHERE is_active = 1 ORDER BY sort_order ASC");
        $images = $stmt->fetchAll();
        echo json_encode(['success' => true, 'images' => $images]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch gallery']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    if (!empty($data['id'])) {
        $stmt = $pdo->prepare("UPDATE gallery_images SET image_url=?, title=?, category=?, sort_order=? WHERE id=?");
        $stmt->execute([
            $data['image_url'] ?? '',
            $data['title'] ?? '',
            $data['category'] ?? 'clinic',
            $data['sort_order'] ?? 0,
            $data['id']
        ]);
        echo json_encode(['success' => true, 'message' => 'Image updated']);
    } else {
        $stmt = $pdo->prepare("INSERT INTO gallery_images (image_url, title, category, sort_order) VALUES (?,?,?,?)");
        $stmt->execute([
            $data['image_url'] ?? '',
            $data['title'] ?? '',
            $data['category'] ?? 'clinic',
            $data['sort_order'] ?? 0
        ]);
        echo json_encode(['success' => true, 'message' => 'Image added', 'id' => $pdo->lastInsertId()]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    $id = $_GET['id'] ?? null;
    if ($id) {
        $stmt = $pdo->prepare("UPDATE gallery_images SET is_active = 0 WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Image removed']);
    } else {
        echo json_encode(['success' => false, 'message' => 'ID required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
