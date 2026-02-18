-- Add hero and footer CTA fields to about_page_content (run once for existing DBs)
USE simrik_dental_clinic;

ALTER TABLE about_page_content ADD COLUMN hero_pill_text VARCHAR(100) DEFAULT '# Dental Hospital';
ALTER TABLE about_page_content ADD COLUMN hero_clinic_name VARCHAR(255) DEFAULT 'Simrik Dental Clinic';
ALTER TABLE about_page_content ADD COLUMN hero_tagline VARCHAR(255) DEFAULT 'Offering Quality Dental Services With Zero Compromise';
ALTER TABLE about_page_content ADD COLUMN hero_background_image VARCHAR(500) DEFAULT NULL;
ALTER TABLE about_page_content ADD COLUMN footer_cta_title VARCHAR(255) DEFAULT 'Book Your Appointment';
ALTER TABLE about_page_content ADD COLUMN footer_cta_description TEXT DEFAULT NULL;

UPDATE about_page_content SET footer_cta_description = COALESCE(footer_cta_description, 'Prioritize your oral health with our General Dentistry services. Schedule your appointment today.') WHERE id = 1;
