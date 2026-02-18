<?php
/**
 * Appointment API - Lagankhel Dental Clinic
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
    
    $required = ['patient_name', 'email', 'phone', 'appointment_date', 'appointment_time', 'service'];
    
    foreach ($required as $field) {
        if (empty(trim($data[$field] ?? ''))) {
            echo json_encode(['success' => false, 'message' => "Field '$field' is required"]);
            exit;
        }
    }
    
    try {
        $pdo = getDBConnection();
        $stmt = $pdo->prepare("
            INSERT INTO appointments (patient_name, email, phone, appointment_date, appointment_time, service, message)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            trim($data['patient_name']),
            trim($data['email']),
            trim($data['phone']),
            $data['appointment_date'],
            $data['appointment_time'],
            trim($data['service']),
            trim($data['message'] ?? '')
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Appointment booked successfully! We will contact you shortly.']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to book appointment. Please try again.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
