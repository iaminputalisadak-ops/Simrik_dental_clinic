<?php
/**
 * Database configuration for Simrik Dental Clinic
 *
 * SETUP: 1) Start MySQL (XAMPP/Laragon: start MySQL in control panel)
 *        2) If the database does not exist, it will be created automatically on first use.
 *        3) If you use a MySQL password, set DB_PASS below.
 */

define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');  // XAMPP often uses 3308 — we try both automatically
define('DB_NAME', 'simrik_dental_clinic');
define('DB_USER', 'root');
define('DB_PASS', '');  // Set your MySQL password here (XAMPP default: empty)
define('DB_CHARSET', 'utf8mb4');
define('DB_DEBUG', true);  // Set false in production to hide errors

/**
 * Create database and run schema.sql (called when database does not exist).
 */
function createDatabaseAndSchema($host, $port) {
    $conn = @new mysqli($host, DB_USER, DB_PASS, '', (int) $port);
    if ($conn->connect_error) {
        return false;
    }
    $schemaPath = dirname(__DIR__, 2) . '/database/schema.sql';
    if (!is_readable($schemaPath)) {
        $conn->close();
        return false;
    }
    $sql = file_get_contents($schemaPath);
    if (!$conn->multi_query($sql)) {
        $conn->close();
        return false;
    }
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->next_result());
    $err = $conn->error;
    $conn->close();
    return $err === '';
}

function getDBConnection() {
    $ports = [DB_PORT, '3308'];  // Try 3306 then 3308 (XAMPP)
    $lastException = null;
    $triedCreate = false;

    foreach (array_unique($ports) as $port) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";port=" . $port . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
            return $pdo;
        } catch (PDOException $e) {
            $lastException = $e;
            $code = $e->getMessage();
            if (strpos($code, 'refused') !== false || strpos($code, '2002') !== false) {
                continue;  // Try next port
            }
            if ((strpos($code, '1049') !== false || strpos($code, 'Unknown database') !== false) && !$triedCreate) {
                $triedCreate = true;
                if (createDatabaseAndSchema(DB_HOST, $port)) {
                    try {
                        $dsn = "mysql:host=" . DB_HOST . ";port=" . $port . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
                        return new PDO($dsn, DB_USER, DB_PASS, [
                            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                            PDO::ATTR_EMULATE_PREPARES => false
                        ]);
                    } catch (PDOException $e2) {
                        $lastException = $e2;
                    }
                }
            }
            break;
        }
    }

    http_response_code(500);
    $msg = 'Database connection failed. ';
    if (defined('DB_DEBUG') && DB_DEBUG && $lastException) {
        $msg .= $lastException->getMessage() . ' — ';
    }
    $msg .= 'Start MySQL (XAMPP/Laragon: start MySQL). If the database was missing, open http://localhost:8000/setup_database.php once.';
    echo json_encode(['success' => false, 'message' => $msg]);
    exit;
}
