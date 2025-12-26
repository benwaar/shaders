@echo off
REM stop_server.bat - shut down the shader server gracefully via HTTP /shutdown endpoint (script in player/)
pushd "%~dp0"
echo Sending shutdown request to http://127.0.0.1:8000/shutdown
powershell -NoProfile -ExecutionPolicy Bypass -Command "try { Invoke-WebRequest -UseBasicParsing -Uri 'http://127.0.0.1:8000/shutdown' -TimeoutSec 5 | Out-Null; Write-Host 'Server shutdown request sent.' } catch { Write-Host 'Error:' $_.Exception.Message }"
if %ERRORLEVEL% equ 0 (
    echo Server stopped.
) else (
    echo Failed to reach server. It may already be stopped.
)
popd
