<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);

require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $slug = $_GET['slug'] ?? null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 0;
    try {
        $pdo = getDBConnection();
        if ($slug) {
            $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, content, category, image_url, author, created_at FROM blog_posts WHERE published = 1 AND slug = ?");
            $stmt->execute([$slug]);
            $post = $stmt->fetch();
            if ($post) {
                $post['date'] = date('F j, Y', strtotime($post['created_at']));
                echo json_encode(['success' => true, 'post' => $post]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Not found']);
            }
            exit;
        }
        $sql = "SELECT id, title, slug, excerpt, category, image_url, author, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC";
        if ($limit > 0) $sql .= " LIMIT " . $limit;
        $stmt = $pdo->query($sql);
        $posts = $stmt->fetchAll();
        foreach ($posts as &$p) {
            $p['date'] = date('F j, Y', strtotime($p['created_at']));
        }
        echo json_encode(['success' => true, 'posts' => $posts]);
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
    $slug = $data['slug'] ?? strtolower(preg_replace('/[^a-z0-9]+/i', '-', trim($data['title'] ?? '')));
    try {
        $pdo = getDBConnection();
        if (!empty($data['id'])) {
            $stmt = $pdo->prepare("UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, category=?, image_url=?, author=?, published=? WHERE id=?");
            $stmt->execute([
                $data['title'] ?? '',
                $slug,
                $data['excerpt'] ?? '',
                $data['content'] ?? '',
                $data['category'] ?? '',
                $data['image_url'] ?? '',
                $data['author'] ?? 'Lagankhel Dental Clinic',
                isset($data['published']) ? (int)$data['published'] : 1,
                $data['id']
            ]);
            echo json_encode(['success' => true, 'message' => 'Post updated']);
        } else {
            $stmt = $pdo->prepare("INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, author, published) VALUES (?,?,?,?,?,?,?,?)");
            $stmt->execute([
                $data['title'] ?? '',
                $slug,
                $data['excerpt'] ?? '',
                $data['content'] ?? '',
                $data['category'] ?? '',
                $data['image_url'] ?? '',
                $data['author'] ?? 'Lagankhel Dental Clinic',
                isset($data['published']) ? (int)$data['published'] : 1
            ]);
            echo json_encode(['success' => true, 'message' => 'Post added', 'id' => $pdo->lastInsertId()]);
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
            $stmt = $pdo->prepare("UPDATE blog_posts SET published = 0 WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true, 'message' => 'Post removed']);
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
