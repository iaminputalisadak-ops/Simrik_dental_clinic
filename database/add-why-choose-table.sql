USE lagankhel_dental;

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
