<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->query("SELECT * FROM why_choose_content WHERE id = 1");
        $row = $stmt->fetch();
        if ($row) {
            echo json_encode(['success' => true, 'content' => $row]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No content']);
        }
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
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("UPDATE why_choose_content SET section_heading=?, main_title=?, intro_text=?, feature1_title=?, feature1_desc=?, feature2_title=?, feature2_desc=?, feature3_title=?, feature3_desc=?, feature4_title=?, feature4_desc=?, feature5_title=?, feature5_desc=?, feature6_title=?, feature6_desc=? WHERE id=1");
        $stmt->execute([
            $data['section_heading'] ?? '',
            $data['main_title'] ?? '',
            $data['intro_text'] ?? '',
            $data['feature1_title'] ?? '',
            $data['feature1_desc'] ?? '',
            $data['feature2_title'] ?? '',
            $data['feature2_desc'] ?? '',
            $data['feature3_title'] ?? '',
            $data['feature3_desc'] ?? '',
            $data['feature4_title'] ?? '',
            $data['feature4_desc'] ?? '',
            $data['feature5_title'] ?? '',
            $data['feature5_desc'] ?? '',
            $data['feature6_title'] ?? '',
            $data['feature6_desc'] ?? ''
        ]);
        echo json_encode(['success' => true, 'message' => 'Why Choose Us content updated']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Update failed']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
