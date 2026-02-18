# phpMyAdmin Setup - Lagankhel Dental Clinic

## Step-by-step instructions

### 1. Open phpMyAdmin
- With XAMPP/Laragon: Start Apache and MySQL, then go to **http://localhost/phpmyadmin**
- Or your server's phpMyAdmin URL

### 2. Import the database
1. Click the **Import** tab
2. Click **Choose File** and select: `database/schema.sql`
3. Scroll down and click **Go**
4. Wait for "Import has been successfully finished"

### 3. Verify
- In the left sidebar you should see the **lagankhel_dental** database
- Click it to see tables: admin_users, hero_banner, gallery_images, appointments, contact_messages, etc.

### 4. Done
Your app will now connect. Use **admin** / **admin123** to log in.

---

## Alternative: Run SQL manually

1. Click the **SQL** tab in phpMyAdmin
2. Copy and paste the entire contents of `schema.sql`
3. Click **Go**
