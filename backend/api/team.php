<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->query("SELECT id, name, qualification, image_url, bio, sort_order FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC");
        $members = $stmt->fetchAll();
        echo json_encode(['success' => true, 'members' => $members]);
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
        if (!empty($data['id'])) {
            $stmt = $pdo->prepare("UPDATE team_members SET name=?, qualification=?, image_url=?, bio=?, sort_order=? WHERE id=?");
            $stmt->execute([
                $data['name'] ?? '',
                $data['qualification'] ?? '',
                $data['image_url'] ?? '',
                $data['bio'] ?? '',
                (int)($data['sort_order'] ?? 0),
                $data['id']
            ]);
            echo json_encode(['success' => true, 'message' => 'Team member updated']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO team_members (name, qualification, image_url, bio, sort_order) VALUES (?,?,?,?,?)");
            $stmt->execute([
                $data['name'] ?? '',
                $data['qualification'] ?? '',
                $data['image_url'] ?? '',
                $data['bio'] ?? '',
                (int)($data['sort_order'] ?? 0)
            ]);
            echo json_encode(['success' => true, 'message' => 'Team member added', 'id' => $pdo->lastInsertId()]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Update failed']);
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
        try {
            $pdo = getDBConnection();
            $stmt = $pdo->prepare("UPDATE team_members SET is_active = 0 WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Team member removed']);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Failed']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'ID required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
