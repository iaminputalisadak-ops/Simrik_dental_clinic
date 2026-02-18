<?php
/**
 * Contact API - Lagankhel Dental Clinic
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    if (empty(trim($data['name'] ?? '')) || empty(trim($data['email'] ?? '')) || empty(trim($data['message'] ?? ''))) {
        echo json_encode(['success' => false, 'message' => 'Name, email and message are required']);
        exit;
    }
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("
            INSERT INTO contact_messages (name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            trim($data['name']),
            trim($data['email']),
            trim($data['phone'] ?? ''),
            trim($data['subject'] ?? ''),
            trim($data['message'])
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent. We will get back to you soon.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
