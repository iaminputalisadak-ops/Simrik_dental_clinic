USE lagankhel_dental;

-- Add author column if not exists (run manually if you get error: ALTER TABLE blog_posts ADD COLUMN author VARCHAR(255) DEFAULT 'Lagankhel Dental Clinic';)
-- Insert sample posts (ignore if slug exists)
INSERT IGNORE INTO blog_posts (title, slug, excerpt, content, category, image_url, published) VALUES
('Jaw Alignment in Children for a Healthy Smile', 'jaw-alignment-children', 'A child''s oral development plays a crucial role in their overall health, facial growth, and confidence. Jaw alignment is an important aspect...', 'Full article content here.', 'Dental Braces', 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600', 1),
('Full Mouth Dental Implants for a Youthful Facial Appearance', 'full-mouth-dental-implants', 'A beautiful smile is more than just aesthetics—it plays a major role in defining facial structure, confidence, and overall personality...', 'Full article content here.', 'Dental Implants', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600', 1),
('Bleeding Gums vs Periodontitis: Key Differences', 'bleeding-gums-vs-periodontitis', 'Gum health is a crucial part of overall oral hygiene, yet it is often ignored until symptoms become severe. Understanding the difference...', 'Full article content here.', 'Gum Treatment', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600', 1);
