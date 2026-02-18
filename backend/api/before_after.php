<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

$pdo = getDBConnection();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, before_image_url, after_image_url, title, category, sort_order FROM before_after_cases WHERE is_active = 1 ORDER BY sort_order ASC");
        $cases = $stmt->fetchAll();
        echo json_encode(['success' => true, 'cases' => $cases]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $beforeUrl = trim($data['before_image_url'] ?? '');
    $afterUrl = trim($data['after_image_url'] ?? '');
    $title = trim($data['title'] ?? '');
    $category = trim($data['category'] ?? 'general') ?: 'general';
    $sortOrder = (int)($data['sort_order'] ?? 0);
    try {
        if (!empty($data['id'])) {
            $stmt = $pdo->prepare("UPDATE before_after_cases SET before_image_url=?, after_image_url=?, title=?, category=?, sort_order=? WHERE id=?");
            $stmt->execute([$beforeUrl, $afterUrl, $title, $category, $sortOrder, $data['id']]);
            echo json_encode(['success' => true, 'message' => 'Case updated']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO before_after_cases (before_image_url, after_image_url, title, category, sort_order) VALUES (?,?,?,?,?)");
            $stmt->execute([$beforeUrl, $afterUrl, $title, $category, $sortOrder]);
            echo json_encode(['success' => true, 'message' => 'Case added', 'id' => $pdo->lastInsertId()]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        $msg = 'Update failed.';
        if (defined('DB_DEBUG') && DB_DEBUG) {
            $msg .= ' ' . $e->getMessage();
        }
        echo json_encode(['success' => false, 'message' => $msg]);
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
        $stmt = $pdo->prepare("UPDATE before_after_cases SET is_active = 0 WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true, 'message' => 'Case removed']);
    } else {
        echo json_encode(['success' => false, 'message' => 'ID required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
