-- Add about_content table for existing databases
USE lagankhel_dental;

CREATE TABLE IF NOT EXISTS about_content (
    id INT PRIMARY KEY DEFAULT 1,
    section_heading VARCHAR(100) DEFAULT 'ABOUT OUR CLINIC',
    main_title VARCHAR(255) DEFAULT 'Welcome to Lagankhel Dental Clinic',
    intro_text TEXT,
    feature1_title VARCHAR(100) DEFAULT 'Expert Care',
    feature1_desc TEXT,
    feature2_title VARCHAR(100) DEFAULT 'Personalized Approach',
    feature2_desc TEXT,
    image_url VARCHAR(500),
    read_more_link VARCHAR(255) DEFAULT '/about',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO about_content (id, section_heading, main_title, intro_text, feature1_title, feature1_desc, feature2_title, feature2_desc, image_url, read_more_link) VALUES
(1, 'ABOUT OUR CLINIC', 'Welcome to Lagankhel Dental Clinic',
 'Welcome to Lagankhel Dental Clinic where your journey to optimal oral health and a confident smile begins. Our team of experienced dentists is committed to providing personalized care in a warm and welcoming environment.',
 'Expert Care', 'Our team of skilled dental professionals at Lagankhel Dental Clinic is dedicated to providing expert care tailored to your individual needs.',
 'Personalized Approach', 'At Lagankhel Dental Clinic, we understand that every patient is unique, which is why we take a personalized approach to your dental care.',
 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
 '/about')
ON DUPLICATE KEY UPDATE section_heading=section_heading;
