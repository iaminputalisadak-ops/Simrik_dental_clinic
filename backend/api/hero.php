<?php
/**
 * Hero Banner API - Lagankhel Dental Clinic
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->query("SELECT id, subtitle, title, tagline, background_image, overlay_opacity, text_position, btn1_text, btn2_text, btn2_link, sort_order FROM hero_banner WHERE is_active = 1 ORDER BY sort_order ASC");
        $slides = $stmt->fetchAll();
        echo json_encode(['success' => true, 'slides' => $slides]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to fetch hero data']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    session_start();
    if (empty($_SESSION['admin_logged_in'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
        exit;
    }
    $pdo = getDBConnection();
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    $id = $data['id'] ?? null;
    
    if ($id) {
        $stmt = $pdo->prepare("UPDATE hero_banner SET subtitle=?, title=?, tagline=?, background_image=?, overlay_opacity=?, text_position=?, btn1_text=?, btn2_text=?, btn2_link=?, sort_order=? WHERE id=?");
        $stmt->execute([
            $data['subtitle'] ?? '',
            $data['title'] ?? '',
            $data['tagline'] ?? '',
            $data['background_image'] ?? '',
            $data['overlay_opacity'] ?? 0.5,
            $data['text_position'] ?? 'center',
            $data['btn1_text'] ?? 'Book Appointment',
            $data['btn2_text'] ?? 'Learn More',
            $data['btn2_link'] ?? '/about',
            $data['sort_order'] ?? 0,
            $id
        ]);
        echo json_encode(['success' => true, 'message' => 'Hero updated']);
    } else {
        $stmt = $pdo->prepare("INSERT INTO hero_banner (subtitle, title, tagline, background_image, overlay_opacity, text_position, btn1_text, btn2_text, btn2_link, sort_order) VALUES (?,?,?,?,?,?,?,?,?,?)");
        $stmt->execute([
            $data['subtitle'] ?? '',
            $data['title'] ?? '',
            $data['tagline'] ?? '',
            $data['background_image'] ?? '',
            $data['overlay_opacity'] ?? 0.5,
            $data['text_position'] ?? 'center',
            $data['btn1_text'] ?? 'Book Appointment',
            $data['btn2_text'] ?? 'Learn More',
            $data['btn2_link'] ?? '/about',
            $data['sort_order'] ?? 0
        ]);
        echo json_encode(['success' => true, 'message' => 'Hero added', 'id' => $pdo->lastInsertId()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
