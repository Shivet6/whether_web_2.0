@echo off
cd /d "%~dp0Backend"
echo Starting Weather backend...
npm install
npm run dev
pause
