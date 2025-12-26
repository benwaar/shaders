Param(
    [string]$Bind = '127.0.0.1',
    [int]$Port = 8000,
    [string]$DefaultPage = 'player/index.html'
)

$root = $PSScriptRoot
$prefix = "http://$Bind`:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $root on $prefix"
Write-Host "Default page: $DefaultPage"
Write-Host "Open in browser: $prefix$DefaultPage"
Write-Host "To stop: press Ctrl+C in this terminal, or close the terminal window."
Write-Host "To run with different parameters: .\serve.bat <Bind> <Port> <DefaultPage> or call serve.ps1 with -Bind -Port -DefaultPage"
Write-Host "Listening... (press Ctrl+C to terminate)"

try {
    # Note: expose a shutdown URL to stop the server remotely: /shutdown
    $stopRequested = $false
    while ($listener.IsListening -and -not $stopRequested) {
        $context = $listener.GetContext()
        $req = $context.Request
        $path = $req.Url.AbsolutePath.TrimStart('/')
        if ($path -eq '') { $path = $DefaultPage }
        $file = Join-Path $root $path

        # remote shutdown trigger: handle before file serving
        if ($path -ieq 'shutdown') {
            Write-Host "Shutdown request received - stopping server."
            $context.Response.StatusCode = 200
            $msg = [System.Text.Encoding]::UTF8.GetBytes('Server shutting down.')
            $context.Response.ContentLength64 = $msg.Length
            $context.Response.OutputStream.Write($msg, 0, $msg.Length)
            $context.Response.OutputStream.Flush()
            $context.Response.OutputStream.Close()
            $stopRequested = $true
        }
        elseif (Test-Path $file) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            switch -Regex ($file) {
                '\.html$' { $context.Response.ContentType = 'text/html'; break }
                '\.css$'  { $context.Response.ContentType = 'text/css'; break }
                '\.js$'   { $context.Response.ContentType = 'application/javascript'; break }
                '\.png$'  { $context.Response.ContentType = 'image/png'; break }
                '\.jpe?g$' { $context.Response.ContentType = 'image/jpeg'; break }
                '\.gif$'  { $context.Response.ContentType = 'image/gif'; break }
                default   { $context.Response.ContentType = 'application/octet-stream'; break }
            }
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
            $context.Response.OutputStream.Close()
        }
        else {
            $context.Response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $context.Response.ContentLength64 = $msg.Length
            $context.Response.OutputStream.Write($msg, 0, $msg.Length)
            $context.Response.OutputStream.Close()
        }

        if (-not $stopRequested) {
            $context.Response.OutputStream.Close()
        }
    }
}
catch [System.Management.Automation.PipelineStoppedException] {
    # Ctrl+C or pipeline stop: suppress noisy error, exit gracefully
    Write-Host "Interrupted by user (Ctrl+C)."
}
catch [System.OperationCanceledException] {
    Write-Host "Operation cancelled."
}
catch {
    Write-Host "Server stopped with error: $_"
}
finally {
    if ($listener -and $listener.IsListening) { $listener.Stop() }
    if ($listener) { $listener.Close() }
}
