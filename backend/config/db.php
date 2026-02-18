<?php
/**
 * Database configuration for Simrik Dental Clinic
 * 
 * SETUP: 1) Ensure MySQL is running  2) Run database/schema.sql (or http://localhost:8000/setup_database.php)
 *        3) Set DB_PASS if you have a MySQL password
 */

define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');  // Use 3308 if you use XAMPP/Laragon and MySQL is on 3308
define('DB_NAME', 'simrik_dental_clinic');
define('DB_USER', 'root');
define('DB_PASS', '');  // Set your MySQL password here (XAMPP default: empty)
define('DB_CHARSET', 'utf8mb4');
define('DB_DEBUG', true);  // Set false in production to hide errors

function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        $msg = 'Database connection failed. ';
        if (defined('DB_DEBUG') && DB_DEBUG) {
            $msg .= $e->getMessage() . ' — Ensure MySQL is running and database/schema.sql has been executed.';
        }
        echo json_encode(['success' => false, 'message' => $msg]);
        exit;
    }
}
