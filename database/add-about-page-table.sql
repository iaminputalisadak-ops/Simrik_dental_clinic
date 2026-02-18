-- Migration: Add about_page_content table for existing databases
USE lagankhel_dental;

CREATE TABLE IF NOT EXISTS about_page_content (
    id INT PRIMARY KEY DEFAULT 1,
    section_heading VARCHAR(100) DEFAULT 'ABOUT',
    page_title VARCHAR(255) DEFAULT 'About Us',
    main_image_url VARCHAR(500),
    intro_paragraph TEXT,
    cta_banner_heading VARCHAR(255),
    cta_banner_text TEXT,
    cta_banner_link VARCHAR(500),
    why_heading VARCHAR(255),
    core_value_text TEXT,
    facilities_text TEXT,
    quality_text TEXT,
    final_cta_text TEXT,
    final_cta_link VARCHAR(255) DEFAULT '/contact',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (id = 1)
);

INSERT INTO about_page_content (id, section_heading, page_title, main_image_url, intro_paragraph, cta_banner_heading, cta_banner_text, cta_banner_link, why_heading, core_value_text, facilities_text, quality_text, final_cta_text, final_cta_link) VALUES
(1, 'ABOUT', 'About Us', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
 'Lagankhel Dental Clinic was founded with a vision to provide quality dental care. Located in Lagankhel, Lalitpur, we are a multi-specialty dental clinic offering orthodontic and comprehensive dental treatments.',
 'Invisalign SmileView simulation for your new smile!',
 'Just take a smiling selfie and we''ll show you what and how Invisalign treatment can do for you. Click here to try Invisalign SmileView right now.',
 'https://www.invisalign.com/smileview',
 'Why Lagankhel Dental Clinic is the Best Dental Clinic in Lalitpur?',
 'We approach every patient''s problem with care. Our dental team is well-trained, experienced, and skillful.',
 'Our clinic is equipped with modern tools and state-of-the-art technology. We maintain a sterile environment.',
 'We follow a quality-first principle. Best Dental Clinic In Lalitpur.',
 'Need another reason? Just book an appointment with us and experience Lagankhel Dental Clinic yourself.',
 '/contact')
ON DUPLICATE KEY UPDATE section_heading=section_heading;
