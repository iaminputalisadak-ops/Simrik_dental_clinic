@echo off
set MYSQL="C:\xampp\mysql\bin\mysql.exe"
set SCHEMA=%~dp0schema.sql

echo ============================================
echo  Lagankhel Dental Clinic - Database Setup
echo ============================================
echo.

if not exist %MYSQL% (
    echo MySQL not found at %MYSQL%
    echo Please run schema.sql manually in phpMyAdmin.
    pause
    exit /b 1
)

echo Starting MySQL if needed...
if exist "C:\xampp\xampp_start.exe" start "" "C:\xampp\xampp_start.exe"
timeout /t 3 /nobreak > nul

echo Importing database...
%MYSQL% -u root -P 3308 < "%SCHEMA%" 2>nul
if %errorlevel% equ 0 (
    echo.
    echo [OK] Database 'lagankhel_dental' created successfully!
    echo      Login: admin / admin123
    echo.
) else (
    echo.
    echo [FAIL] Could not connect. Do this:
    echo   1. Open XAMPP Control Panel
    echo   2. Click Start for MySQL
    echo   3. Run this script again
    echo.
    echo Or import schema.sql manually in phpMyAdmin.
    echo.
)
pause
