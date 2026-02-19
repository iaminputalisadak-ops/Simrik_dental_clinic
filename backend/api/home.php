<?php
/**
 * Home page data. GET only.
 * Optional ?part=critical or ?part=sections. Response cached 60s server-side for speed.
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit(0);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

header('Cache-Control: public, max-age=60');
$part = isset($_GET['part']) ? trim($_GET['part']) : 'full';
$cacheDir = __DIR__ . '/../cache';
$cacheFile = $cacheDir . '/home_' . (in_array($part, ['critical', 'sections'], true) ? $part : 'full') . '.json';
$cacheTtl = 60;

if (is_file($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    echo file_get_contents($cacheFile);
    exit;
}

require_once __DIR__ . '/../config/db.php';

try {
    $pdo = getDBConnection();
    $out = ['success' => true];

    if ($part !== 'sections') {
        $hero = $pdo->query("SELECT id, subtitle, title, tagline, background_image, overlay_opacity, text_position, btn1_text, btn2_text, btn2_link, sort_order FROM hero_banner WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();
        $about = $pdo->query("SELECT * FROM about_content WHERE id = 1")->fetch();
        $whyChoose = $pdo->query("SELECT * FROM why_choose_content WHERE id = 1")->fetch();
        $services = $pdo->query("SELECT id, title, image_url, link, sort_order FROM dental_services WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();
        $out['hero'] = ['success' => true, 'slides' => $hero];
        $out['about'] = $about ? ['success' => true, 'content' => $about] : ['success' => false];
        $out['why_choose'] = $whyChoose ? ['success' => true, 'content' => $whyChoose] : ['success' => false];
        $out['services'] = ['success' => true, 'services' => $services];
    }

    if ($part !== 'critical') {
        $team = $pdo->query("SELECT id, name, qualification, image_url, bio, sort_order FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();
        $gallery = $pdo->query("SELECT id, image_url, title, category, sort_order FROM gallery_images WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();
        $blogStmt = $pdo->query("SELECT id, title, slug, excerpt, category, image_url, author, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 6");
        $blog = $blogStmt->fetchAll();
        foreach ($blog as &$p) {
            $p['date'] = date('F j, Y', strtotime($p['created_at']));
        }
        $beforeAfter = $pdo->query("SELECT id, before_image_url, after_image_url, title, category, sort_order FROM before_after_cases WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();
        $out['team'] = ['success' => true, 'members' => $team];
        $out['gallery'] = ['success' => true, 'images' => $gallery];
        $out['blog'] = ['success' => true, 'posts' => $blog];
        $out['before_after'] = ['success' => true, 'cases' => $beforeAfter];
    }

    $json = json_encode($out);
    if (!is_dir($cacheDir)) @mkdir($cacheDir, 0755, true);
    @file_put_contents($cacheFile, $json);
    echo $json;
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to fetch home data']);
}
