<?php
// Redirect API requests - router placeholder if needed
header('Content-Type: application/json');
echo json_encode(['message' => 'Simrik Dental Clinic API', 'endpoints' => ['/api/appointments.php', '/api/contact.php']]);
