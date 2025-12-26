@echo off
REM start_server.bat - launch serve.ps1 in a new window (placed in player/) and return immediately
pushd "%~dp0"
where powershell >nul 2>&1
if errorlevel 1 (
    echo PowerShell not found. Use start_server_gui.bat or install PowerShell.
    pause
    popd
    exit /b 1
)
start "Shader Server" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" %*
echo Server started (in new window).
popd
