@echo off
echo ==========================================
echo    TerraQuant AI - Quick Start Script
echo ==========================================
echo.

:: Check if .env exists
if not exist .env (
    echo [WARNING] .env file not found!
    echo Please copy .env.example to .env and add your Gemini API key.
    echo.
    pause
    exit /b 1
)

:: Check if node_modules exists in frontend
if not exist frontend\node_modules (
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    echo.
)

:: Check if venv exists
if not exist backend\venv (
    echo [INFO] Creating Python virtual environment...
    cd backend
    python -m venv venv
    cd ..
    echo.
)

echo [INFO] Starting TerraQuant AI Platform...
echo.

:: Start backend in a new window
echo [1/2] Starting Backend Server...
start "TerraQuant Backend" cmd /k "cd backend && venv\Scripts\activate && python app.py"

:: Wait a bit for backend to start
timeout /t 5 /nobreak > nul

:: Start frontend in a new window
echo [2/2] Starting Frontend Server...
start "TerraQuant Frontend" cmd /k "cd frontend && npm start"

echo.
echo ==========================================
echo    TerraQuant AI is starting!
echo ==========================================
echo.
echo Backend: http://127.0.0.1:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul
