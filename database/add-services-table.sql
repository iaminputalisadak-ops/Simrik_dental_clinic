USE lagankhel_dental;

CREATE TABLE IF NOT EXISTS dental_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    link VARCHAR(255) DEFAULT '/treatments',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO dental_services (id, title, image_url, link, sort_order) VALUES
(1, 'Orthodontics', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', '/treatments', 0),
(2, 'Root Canal', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', '/treatments', 1),
(3, 'Dental Oral Surgery', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', '/treatments', 2),
(4, 'Cosmetic Dentistry', 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', '/treatments', 3),
(5, 'Dental Implant And Prosthetics', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', '/treatments', 4),
(6, 'Restorative Dentistry', 'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', '/treatments', 5);
