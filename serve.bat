
@echo off
REM serve.bat - run from existing Cmd/PowerShell prompt and forward Ctrl+C where possible
pushd "%~dp0"
echo Starting serve.ps1 from %CD%
echo Visit http://127.0.0.1:8000/shutdown to exit the server remotely

REM Check for PowerShell
where powershell >nul 2>&1
if errorlevel 1 (
	echo PowerShell not found. Use serve_gui.bat to open a PowerShell window, or install PowerShell.
	pause
	popd
	exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" %*
popd
