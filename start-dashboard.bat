@echo off
echo ========================================
echo Disney Entitlements Dashboard
echo ========================================
echo.
echo Starting web server on port 8000...
echo Dashboard URL: http://localhost:8000/dashboard/
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
start http://localhost:8000/dashboard/
python -m http.server 8000

@REM Made with Bob
