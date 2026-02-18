# Lagankhel Dental Clinic Website

A dental clinic website inspired by [House of Dentistry](https://houseofdentistry.in/), built with **React.js**, **PHP**, **MySQL**, and **JavaScript**.

## Features

- **React.js** frontend with modern UI and animations
- **PHP** backend API for appointments, contact form, hero banner, gallery
- **MySQL** database for content management
- **Admin Dashboard** at `/admin` – manage hero slides, gallery images
- Hero banner with overlay, animations, carousel support
- Gallery and hero content loaded from database
- Responsive design for mobile and desktop
- Sections: Hero, About, Why Choose Us, Services, Stats, Team, Gallery, Blog, Contact

## Project Structure

```
Lagankhel Dental Clinic/
├── frontend/          # React (Vite) application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   └── admin/
│   │   └── styles/
│   └── package.json
├── backend/           # PHP API
│   ├── api/
│   │   ├── hero.php
│   │   ├── gallery.php
│   │   ├── appointments.php
│   │   ├── contact.php
│   │   └── admin/
│   │       ├── login.php
│   │       ├── logout.php
│   │       ├── hero.php
│   │       └── gallery.php
│   └── config/
│       └── db.php
├── database/
│   └── schema.sql
└── README.md
```

## Quick Start (frontend only)

To view the website without the backend (hero/gallery will use default content):

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. For appointments, contact form, and admin features, set up the backend below.

### Admin login shows "Unable to connect to server"?

You need to **create the database** and **run the PHP backend**. See **[DATABASE_SETUP.md](DATABASE_SETUP.md)** for step-by-step instructions. Quick version:

1. Start MySQL (e.g. XAMPP → Start MySQL).
2. In a terminal: `cd backend` then `php -S localhost:8000`.
3. In your browser open: **http://localhost:8000/setup_database.php** (creates the database once).
4. Keep the PHP server running; start the frontend (`cd frontend` → `npm run dev`) and open http://localhost:3000/admin.

## Setup Instructions (full site)

### 1. Database Setup (MySQL)

1. Run the schema (creates database and all tables including hero, gallery, admin):

```bash
mysql -u root -p < database/schema.sql
```

2. Update database credentials in `backend/config/db.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'lagankhel_dental');
define('DB_USER', 'root');
define('DB_PASS', 'your_password');
```


### 2. PHP Backend

From the **backend** folder:

```bash
cd backend
php -S localhost:8000
```

### 3. React Frontend

```bash
cd frontend
npm install
npm run dev
```

- **Website:** http://localhost:3000  
- **Admin Dashboard:** http://localhost:3000/admin  

The Vite dev server proxies `/api/*` to `http://localhost:8000`. Start the PHP server for full functionality.

## Admin Dashboard

- **URL:** `/admin` or `/admin/login`
- **Default credentials:** admin / admin123
- **Hero Banner:** Add/edit slides, text, background images, overlay opacity, text position
- **Gallery:** Add/edit/remove images with URLs

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/hero.php | Get active hero slides |
| GET | /api/gallery.php | Get gallery images |
| POST | /api/appointments.php | Book appointment |
| POST | /api/contact.php | Send contact message |
| POST | /api/admin/login.php | Admin login |

## Tech Stack

- **Frontend:** React 18, React Router, Vite
- **Backend:** PHP 7.4+
- **Database:** MySQL 5.7+
- **Styling:** Custom CSS (Playfair Display & Source Sans 3)
