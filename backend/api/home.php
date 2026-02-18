<?php
/**
 * Home page data - single API for all home sections (faster load).
 * GET only. Returns hero, about, why_choose, services, team, gallery, blog (6), before_after.
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

require_once __DIR__ . '/../config/db.php';

try {
    $pdo = getDBConnection();

    $hero = $pdo->query("SELECT id, subtitle, title, tagline, background_image, overlay_opacity, text_position, btn1_text, btn2_text, btn2_link, sort_order FROM hero_banner WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    $about = $pdo->query("SELECT * FROM about_content WHERE id = 1")->fetch();
    if (!$about) $about = null;

    $whyChoose = $pdo->query("SELECT * FROM why_choose_content WHERE id = 1")->fetch();
    if (!$whyChoose) $whyChoose = null;

    $services = $pdo->query("SELECT id, title, image_url, link, sort_order FROM dental_services WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    $team = $pdo->query("SELECT id, name, qualification, image_url, bio, sort_order FROM team_members WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    $gallery = $pdo->query("SELECT id, image_url, title, category, sort_order FROM gallery_images WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    $blogStmt = $pdo->query("SELECT id, title, slug, excerpt, category, image_url, author, created_at FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT 6");
    $blog = $blogStmt->fetchAll();
    foreach ($blog as &$p) {
        $p['date'] = date('F j, Y', strtotime($p['created_at']));
    }

    $beforeAfter = $pdo->query("SELECT id, before_image_url, after_image_url, title, category, sort_order FROM before_after_cases WHERE is_active = 1 ORDER BY sort_order ASC")->fetchAll();

    echo json_encode([
        'success' => true,
        'hero' => ['success' => true, 'slides' => $hero],
        'about' => $about ? ['success' => true, 'content' => $about] : ['success' => false],
        'why_choose' => $whyChoose ? ['success' => true, 'content' => $whyChoose] : ['success' => false],
        'services' => ['success' => true, 'services' => $services],
        'team' => ['success' => true, 'members' => $team],
        'gallery' => ['success' => true, 'images' => $gallery],
        'blog' => ['success' => true, 'posts' => $blog],
        'before_after' => ['success' => true, 'cases' => $beforeAfter],
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to fetch home data']);
}
