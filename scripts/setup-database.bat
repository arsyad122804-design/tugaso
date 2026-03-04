@echo off
echo ========================================
echo   Setup Database Perusahaan
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Generating Prisma Client...
call npm run db:generate
if %errorlevel% neq 0 (
    echo Error: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo.

echo [3/4] Pushing schema to database...
call npm run db:push
if %errorlevel% neq 0 (
    echo Error: Failed to push schema
    pause
    exit /b 1
)
echo.

echo [4/4] Seeding database with default accounts...
call npm run db:seed
if %errorlevel% neq 0 (
    echo Error: Failed to seed database
    pause
    exit /b 1
)
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Default Accounts Created:
echo.
echo CEO:
echo   Email: ceo@perusahaan.com
echo   Password: password123
echo.
echo Manager:
echo   Email: manager@perusahaan.com
echo   Password: password123
echo.
echo Sekretaris:
echo   Email: sekretaris@perusahaan.com
echo   Password: password123
echo.
echo Bendahara:
echo   Email: bendahara@perusahaan.com
echo   Password: password123
echo.
echo ========================================
echo.
pause
