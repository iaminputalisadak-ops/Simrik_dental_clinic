USE lagankhel_dental;

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

INSERT IGNORE INTO team_members (id, name, qualification, image_url, sort_order) VALUES
(1, 'Dr. Jinesh Babu R', 'BDS, MDS ORTHODONTICS AND DENTOFACIAL ORTHOPAEDICS', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400', 0),
(2, 'Dr. Sushritha Sricharan', 'BDS, MDS CONSERVATIVE DENTISTRY AND ENDODONTICS', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400', 1),
(3, 'Dr. Sajan Shetty', 'BDS, MDS PROSTHODONTICS & IMPLANTOLOGIST', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400', 2),
(4, 'Dr. Faizuddin Imran', 'BDS, MDS PERIODONTOLOGY & IMPLANTOLOGY', 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2?w=400', 3),
(5, 'Dr. Sibikar P', 'BDS, MDS PEDODONTICS AND PREVENTIVE DENTISTRY', 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400', 4),
(6, 'Dr. Saurabh Pillai', 'BDS, MDS ORAL AND MAXILLOFACIAL SURGERY', 'https://images.unsplash.com/photo-1618499891438-8cf651bb3104?w=400', 5),
(7, 'Dr. Arvind Raghunath', 'BDS, MDS PERIODONTOLOGY & IMPLANTOLOGY', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400', 6),
(8, 'Dr. Karen C. Stellus', 'BDS, RESIDENT DENTIST', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400', 7),
(9, 'Abhinaya', 'DENTAL ASSISTANT', 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400', 8);
