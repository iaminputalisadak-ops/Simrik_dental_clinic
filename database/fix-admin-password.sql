-- Fix admin password to admin123
UPDATE admin_users 
SET password_hash = '$2y$10$dMHD8a83tqlYaeSRRVZOauWN7xOpjz5MyVzgg9m4bAXU8FUw6biEK' 
WHERE username = 'admin';
