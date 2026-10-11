@echo off
rem Hachuping Princess Maker - opens the game in its own window (no address bar)
set "GAME=%~dp0index.html"
set "CH=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CH%" set "CH=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CH%" set "CH=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if exist "%CH%" (
  start "" "%CH%" --app="%GAME%" --window-size=1280,760
  exit /b
)
set "ED=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%ED%" set "ED=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%ED%" (
  start "" "%ED%" --app="%GAME%" --window-size=1280,760
  exit /b
)
start "" "%GAME%"
