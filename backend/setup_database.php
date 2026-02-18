<?php
/**
 * Database Setup - Run this once to create the database and all tables.
 *
 * 1. Start MySQL (XAMPP/Laragon: start MySQL service).
 * 2. Start PHP server: in "backend" folder run: php -S localhost:8000
 * 3. Open in browser: http://localhost:8000/setup_database.php
 *
 * If your MySQL uses port 3308 (e.g. XAMPP), edit the $port below.
 */

header('Content-Type: text/html; charset=utf-8');

$host = '127.0.0.1';
$port = '3306';   // Change to 3308 if XAMPP/Laragon uses that for MySQL
$user = 'root';
$pass = '';       // Set your MySQL password if you have one
$dbname = 'lagankhel_dental';

echo "<h1>Lagankhel Dental Clinic – Database Setup</h1>";

$conn = @new mysqli($host, $user, $pass, '', (int) $port);

if ($conn->connect_error) {
    echo "<p style='color:red'><strong>MySQL connection failed:</strong> " . htmlspecialchars($conn->connect_error) . "</p>";
    echo "<p>Make sure MySQL is running (e.g. XAMPP Control Panel → Start MySQL). If you use port 3308, edit the <code>\$port</code> in this file.</p>";
    exit;
}

$schemaPath = dirname(__DIR__) . '/database/schema.sql';
if (!is_readable($schemaPath)) {
    echo "<p style='color:red'>Schema file not found: database/schema.sql</p>";
    exit;
}

$sql = file_get_contents($schemaPath);

// Run the full schema (MySQL will parse it correctly)
if ($conn->multi_query($sql)) {
    do {
        if ($result = $conn->store_result()) {
            $result->free();
        }
    } while ($conn->next_result());
}

if ($conn->error) {
    echo "<p style='color:red'><strong>Error running schema:</strong> " . htmlspecialchars($conn->error) . "</p>";
    $conn->close();
    exit;
}

$conn->close();

echo "<p style='color:green; font-weight:bold'>Database setup complete.</p>";
echo "<p>Database <code>" . htmlspecialchars($dbname) . "</code> and all tables were created.</p>";
echo "<p>Admin login: <strong>admin</strong> / <strong>admin123</strong></p>";
echo "<p><a href='http://localhost:3000/admin'>Open Admin Dashboard</a> (start the frontend with <code>npm run dev</code> in the frontend folder if needed).</p>";
