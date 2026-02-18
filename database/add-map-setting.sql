USE lagankhel_dental;

INSERT INTO site_settings (setting_key, setting_value) VALUES ('map_embed_url', '')
ON DUPLICATE KEY UPDATE setting_key=setting_key;
