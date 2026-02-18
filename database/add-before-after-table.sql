-- Migration: Add before_after_cases table for existing databases
USE lagankhel_dental;

CREATE TABLE IF NOT EXISTS before_after_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    before_image_url VARCHAR(500) NOT NULL,
    after_image_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    category VARCHAR(100) DEFAULT 'general',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO before_after_cases (before_image_url, after_image_url, title, category, sort_order) VALUES
('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Dental Restoration', 'general', 0),
('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', 'Smile Makeover', 'cosmetic', 1),
('https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', 'Orthodontics', 'braces', 2);
