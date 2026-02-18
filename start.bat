@echo off
echo Starting Lagankhel Dental Clinic...
echo.
echo Starting PHP backend on http://localhost:8000
start "PHP Backend" cmd /k "cd /d "%~dp0backend" && php -S localhost:8000"
timeout /t 2 /nobreak > nul
echo Starting React frontend on http://localhost:3000
cd /d "%~dp0frontend"
npm run dev
