# Database & Admin Login Setup

The **"Unable to connect to server"** message on Admin Login means the **PHP backend** is not running or the **database** is not created. Follow these steps.

---

## 1. Start MySQL

- **XAMPP:** Open XAMPP Control Panel → click **Start** next to **MySQL**.
- **Laragon:** Start Laragon → MySQL should start with it.
- **Other:** Make sure the MySQL service is running (default port **3306**; XAMPP sometimes uses **3308**).

---

## 2. Create the database (one-time)

### Option A – Using the setup page (easiest)

1. Start the PHP server (from the project root or `backend` folder):
   ```bash
   cd backend
   php -S localhost:8000
   ```
2. In your browser open: **http://localhost:8000/setup_database.php**
3. You should see: *"Database setup complete."*

### Option B – Using MySQL command line

```bash
mysql -u root -p < database/schema.sql
```

(Use your MySQL password if you have one. On XAMPP the password is often empty.)

---

## 3. Backend config (if needed)

- Config file: **backend/config/db.php**
- If MySQL is on port **3308** (e.g. XAMPP): in `db.php` set `define('DB_PORT', '3308');`
- If you have a MySQL password: set `define('DB_PASS', 'your_password');`

---

## 4. Run the site

1. **Backend** (terminal 1):
   ```bash
   cd backend
   php -S localhost:8000
   ```
2. **Frontend** (terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
3. Open **http://localhost:3000** for the site and **http://localhost:3000/admin** for admin login.
4. Login: **admin** / **admin123**

---

## Summary

| Step | Action |
|------|--------|
| 1 | Start MySQL (XAMPP/Laragon or MySQL service) |
| 2 | Run **http://localhost:8000/setup_database.php** (with PHP server running from `backend`) |
| 3 | Start backend: `cd backend` → `php -S localhost:8000` |
| 4 | Start frontend: `cd frontend` → `npm run dev` |
| 5 | Open http://localhost:3000/admin and log in with admin / admin123 |
