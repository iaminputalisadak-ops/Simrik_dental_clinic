<?php
/**
 * Admin Hero API - Full CRUD including inactive
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

session_start();
if (empty($_SESSION['admin_logged_in'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

require_once __DIR__ . '/../../config/db.php';

try {
    $pdo = getDBConnection();
    $stmt = $pdo->query("SELECT * FROM hero_banner ORDER BY sort_order ASC");
    $slides = $stmt->fetchAll();
    echo json_encode(['success' => true, 'slides' => $slides]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Failed to fetch']);
}
