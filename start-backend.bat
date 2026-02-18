@echo off
echo Starting PHP backend on http://localhost:8000
echo Open http://localhost:8000/setup_database.php to create the database (first time only).
echo.
cd /d "%~dp0backend"
php -S localhost:8000
pause
