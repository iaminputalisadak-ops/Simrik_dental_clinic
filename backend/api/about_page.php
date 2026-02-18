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
        $stmt = $pdo->query("SELECT * FROM about_page_content WHERE id = 1");
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
        $stmt = $pdo->prepare("UPDATE about_page_content SET section_heading=?, page_title=?, main_image_url=?, intro_paragraph=?, cta_banner_heading=?, cta_banner_text=?, cta_banner_link=?, why_heading=?, core_value_text=?, facilities_text=?, quality_text=?, final_cta_text=?, final_cta_link=? WHERE id=1");
        $stmt->execute([
            $data['section_heading'] ?? '',
            $data['page_title'] ?? '',
            $data['main_image_url'] ?? '',
            $data['intro_paragraph'] ?? '',
            $data['cta_banner_heading'] ?? '',
            $data['cta_banner_text'] ?? '',
            $data['cta_banner_link'] ?? '',
            $data['why_heading'] ?? '',
            $data['core_value_text'] ?? '',
            $data['facilities_text'] ?? '',
            $data['quality_text'] ?? '',
            $data['final_cta_text'] ?? '',
            $data['final_cta_link'] ?? '/contact'
        ]);
        echo json_encode(['success' => true, 'message' => 'About page updated']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Update failed']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
