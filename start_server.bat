
@echo off
pushd "%~dp0"

where powershell >nul 2>&1
if errorlevel 1 (
	echo PowerShell not found. Please install PowerShell to run the server.
	pause
	popd
	exit /b 1
)

echo Starting server in a new window...
start "Shader Server" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" %*
echo Use stop_server.bat to shut it down, or visit http://127.0.0.1:8000/shutdown
popd
