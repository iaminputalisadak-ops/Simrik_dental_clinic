-- Lagankhel Dental Clinic Database Schema
-- Run this script to set up the database

CREATE DATABASE IF NOT EXISTS lagankhel_dental CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE lagankhel_dental;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Default admin: admin / admin123 (change after first login!)
INSERT INTO admin_users (username, password_hash, email) VALUES 
('admin', '$2y$10$dMHD8a83tqlYaeSRRVZOauWN7xOpjz5MyVzgg9m4bAXU8FUw6biEK', 'admin@lagankheldental.com')
ON DUPLICATE KEY UPDATE username=username;

-- Hero banner table (supports multiple slides for carousel)
CREATE TABLE IF NOT EXISTS hero_banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subtitle VARCHAR(255) DEFAULT 'YOUR SMILE IS OUR PRIDE',
    title VARCHAR(255) DEFAULT 'Lagankhel Dental Clinic',
    tagline VARCHAR(255) DEFAULT 'Best Dental Clinic in Lalitpur',
    background_image VARCHAR(500) NOT NULL,
    overlay_opacity DECIMAL(3,2) DEFAULT 0.45,
    text_position ENUM('left', 'center', 'right') DEFAULT 'center',
    btn1_text VARCHAR(100) DEFAULT 'Book Appointment',
    btn2_text VARCHAR(100) DEFAULT 'Learn More',
    btn2_link VARCHAR(255) DEFAULT '/about',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default hero with professional dental clinic images from Unsplash
INSERT INTO hero_banner (subtitle, title, tagline, background_image, overlay_opacity, text_position, sort_order) VALUES
('YOUR SMILE IS OUR PRIDE', 'Lagankhel Dental Clinic', 'Best Dental Clinic in Lalitpur', 
 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920', 0.5, 'center', 0),
('EXPERIENCE EXCELLENCE', 'Lagankhel Dental Clinic', 'Modern Care, Traditional Values', 
 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1920', 0.5, 'center', 1),
('TRUSTED DENTAL CARE', 'Lagankhel Dental Clinic', 'Your Smile, Our Priority', 
 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920', 0.5, 'center', 2);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    category VARCHAR(100) DEFAULT 'clinic',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert professional dental clinic images
INSERT INTO gallery_images (image_url, title, category, sort_order) VALUES
('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Treatment Room', 'clinic', 0),
('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', 'Dental Chair', 'clinic', 1),
('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', 'Modern Equipment', 'clinic', 2),
('https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', 'Examination Room', 'clinic', 3),
('https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', 'Dental Care', 'clinic', 4),
('https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', 'Clinic Interior', 'clinic', 5),
('https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600', 'Patient Care', 'clinic', 6),
('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Professional Care', 'clinic', 7);

-- About section content (editable by admin)
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CHECK (id = 1)
);

INSERT INTO about_content (section_heading, main_title, intro_text, feature1_title, feature1_desc, feature2_title, feature2_desc, image_url, read_more_link) VALUES
('ABOUT OUR CLINIC', 'Welcome to Lagankhel Dental Clinic',
 'Welcome to Lagankhel Dental Clinic where your journey to optimal oral health and a confident smile begins. Our team of experienced dentists is committed to providing personalized care in a warm and welcoming environment.',
 'Expert Care', 'Our team of skilled dental professionals at Lagankhel Dental Clinic is dedicated to providing expert care tailored to your individual needs.',
 'Personalized Approach', 'At Lagankhel Dental Clinic, we understand that every patient is unique, which is why we take a personalized approach to your dental care.',
 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800',
 '/about')
ON DUPLICATE KEY UPDATE section_heading=section_heading;

-- About page content (full About Us page - editable by admin)
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
 'Lagankhel Dental Clinic was founded with a vision to provide quality dental care. Located in Lagankhel, Lalitpur, we are a multi-specialty dental clinic offering orthodontic and comprehensive dental treatments. Our team is committed to delivering personalized care with modern technology in a comfortable environment.',
 'Invisalign SmileView simulation for your new smile!',
 'Just take a smiling selfie and we''ll show you what and how Invisalign treatment can do for you. Click here to try Invisalign SmileView right now.',
 'https://www.invisalign.com/smileview',
 'Why Lagankhel Dental Clinic is the Best Dental Clinic in Lalitpur?',
 'We approach every patient''s problem with care. Our dental team is well-trained, experienced, and skillful. We provide a comfortable environment and conduct regular training sessions for a patient-friendly approach.',
 'Our clinic is equipped with modern tools and state-of-the-art technology. We maintain a sterile environment with infection control standards. We welcome all your queries and ensure a warm, reassuring experience.',
 'We follow a quality-first principle. Regardless of cost, we ensure you receive the best dental treatment. Best Dental Clinic In Lalitpur.',
 'Need another reason? Just book an appointment with us and experience Lagankhel Dental Clinic yourself.',
 '/contact')
ON DUPLICATE KEY UPDATE section_heading=section_heading;

-- Why Choose Us section (editable by admin)
CREATE TABLE IF NOT EXISTS why_choose_content (
    id INT PRIMARY KEY DEFAULT 1,
    section_heading VARCHAR(100) DEFAULT 'WHAT WE DO',
    main_title VARCHAR(255) DEFAULT 'Why Choose us?',
    intro_text TEXT,
    feature1_title VARCHAR(100), feature1_desc TEXT,
    feature2_title VARCHAR(100), feature2_desc TEXT,
    feature3_title VARCHAR(100), feature3_desc TEXT,
    feature4_title VARCHAR(100), feature4_desc TEXT,
    feature5_title VARCHAR(100), feature5_desc TEXT,
    feature6_title VARCHAR(100), feature6_desc TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO why_choose_content (id, section_heading, main_title, intro_text, feature1_title, feature1_desc, feature2_title, feature2_desc, feature3_title, feature3_desc, feature4_title, feature4_desc, feature5_title, feature5_desc, feature6_title, feature6_desc) VALUES
(1, 'WHAT WE DO', 'Why Choose us?',
 'At Lagankhel Dental Clinic, we believe in providing our patients with treatments which includes their involvement at all times. Our patients are the stars where we have set a standard, in providing a dental care with a feeling of being at home.',
 'Comfort and Convenience', 'Your comfort and convenience are our top priorities at Lagankhel Dental Clinic. From our warm and inviting office environment to our flexible scheduling options',
 'Customized Treatment Plans', 'We understand your smile is unique. We take the time to listen to your concerns and goals, crafting a personalized treatment plan to achieve your desired results.',
 'Modern Technology', 'Modern technology in dentistry has revolutionized patient care through advancements such as digital imaging, which provides precise and detailed visuals',
 'Affordable Service', 'We believe high-quality dentistry shouldn''t break the bank. We offer competitive rates and transparent pricing, so you can make informed decisions about your oral health.',
 'Premium Dental Care', 'Experience the difference a healthy smile makes! We use top-of-the-line materials and equipment to deliver exceptional results and a comfortable experience.',
 '10,000+ Happy Clients', 'Our commitment to exceptional care has earned the trust of over 10,000 satisfied patients. Join our growing community of happy smiles!')
ON DUPLICATE KEY UPDATE section_heading=section_heading;

-- Dental services (editable by admin - add/edit/delete)
CREATE TABLE IF NOT EXISTS dental_services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    link VARCHAR(255) DEFAULT '/treatments',
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO dental_services (title, image_url, link, sort_order) VALUES
('Orthodontics', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', '/treatments', 0),
('Root Canal', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', '/treatments', 1),
('Dental Oral Surgery', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', '/treatments', 2),
('Cosmetic Dentistry', 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600', '/treatments', 3),
('Dental Implant And Prosthetics', 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600', '/treatments', 4),
('Restorative Dentistry', 'https://images.unsplash.com/photo-1629909615782-3a4c1b24a8f2?w=600', '/treatments', 5);

-- Team members (editable by admin - add/edit/delete)
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    qualification VARCHAR(500),
    image_url VARCHAR(500),
    bio TEXT,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO team_members (name, qualification, image_url, sort_order) VALUES
('Dr. Jinesh Babu R', 'BDS, MDS ORTHODONTICS AND DENTOFACIAL ORTHOPAEDICS', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', 0),
('Dr. Sushritha Sricharan', 'BDS, MDS CONSERVATIVE DENTISTRY AND ENDODONTICS', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 1),
('Dr. Sajan Shetty', 'BDS, MDS PROSTHODONTICS & IMPLANTOLOGIST', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400', 2),
('Dr. Faizuddin Imran', 'BDS, MDS PERIODONTOLOGY & IMPLANTOLOGY', 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=400', 3),
('Dr. Sibikar P', 'BDS, MDS PEDODONTICS AND PREVENTIVE DENTISTRY', 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400', 4),
('Dr. Saurabh Pillai', 'BDS, MDS ORAL AND MAXILLOFACIAL SURGERY', 'https://images.unsplash.com/photo-1618499891438-8cf651bb3104?w=400', 5),
('Dr. Arvind Raghunath', 'BDS, MDS PERIODONTOLOGY & IMPLANTOLOGY', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400', 6),
('Dr. Karen C. Stellus', 'BDS, RESIDENT DENTIST', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400', 7),
('Abhinaya', 'DENTAL ASSISTANT', 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400', 8);

-- Site settings (key-value store)
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO site_settings (setting_key, setting_value) VALUES
('clinic_name', 'Lagankhel Dental Clinic'),
('clinic_tagline', 'Your smile is our pride'),
('contact_phone', '+977 9800000000'),
('contact_landline', '01-1234567'),
('contact_address', 'Lagankhel, Lalitpur, Nepal'),
('opening_hours', 'Sunday - Friday, 10:00 AM - 7:00 PM'),
('map_embed_url', '')
ON DUPLICATE KEY UPDATE setting_key=setting_key;

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    service VARCHAR(100) NOT NULL,
    message TEXT,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    is_read TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Before-After cases (editable by admin)
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

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500),
    author VARCHAR(255) DEFAULT 'Lagankhel Dental Clinic',
    published TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, author) VALUES
('Jaw Alignment in Children for a Healthy Smile – Procedure & Benefits', 'jaw-alignment-children', 'A child''s oral development plays a crucial role in their overall health, facial growth, and confidence. Jaw alignment is an important aspect...', 'Full article content here.', 'Dental Braces', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 'Lagankhel Dental Clinic'),
('Full Mouth Dental Implants for a Youthful Facial Appearance', 'full-mouth-dental-implants', 'A beautiful smile is more than just aesthetics—it plays a major role in defining facial structure, confidence, and overall personality...', 'Full article content here.', 'Dental Implants', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', 'Lagankhel Dental Clinic'),
('Bleeding Gums vs Periodontitis: Key Differences, Symptoms & Treatment', 'bleeding-gums-vs-periodontitis', 'Gum health is a crucial part of overall oral hygiene, yet it is often ignored until symptoms become severe. Understanding the difference...', 'Full article content here.', 'Gum Treatment', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', 'Lagankhel Dental Clinic');
