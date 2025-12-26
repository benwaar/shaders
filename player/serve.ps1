Param(
    [string]$Bind = '127.0.0.1',
    [int]$Port = 8000,
    [string]$DefaultPage = 'player/index.html'
)

# When the script resides in the player folder, set project root to parent directory
$scriptDir = $PSScriptRoot
$root = (Get-Item $scriptDir).Parent.FullName
$prefix = "http://$Bind`:$Port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Server running at $prefix"
Write-Host "Serving root: $root"
Write-Host "Shutdown endpoint: $prefix`shutdown"

try {
    $stopRequested = $false
    while ($listener.IsListening -and -not $stopRequested) {
        $context = $listener.GetContext()
        $req = $context.Request
        $path = $req.Url.AbsolutePath.TrimStart('/')
        if ($path -eq '') {
            # Redirect root requests to the default page so users see where they landed
            $redirectUrl = "$prefix$DefaultPage"
            $context.Response.StatusCode = 302
            $context.Response.RedirectLocation = $redirectUrl
            $msg = [System.Text.Encoding]::UTF8.GetBytes("Redirecting to $redirectUrl")
            $context.Response.ContentLength64 = $msg.Length
            $context.Response.OutputStream.Write($msg, 0, $msg.Length)
            $context.Response.OutputStream.Flush()
            $context.Response.OutputStream.Close()
            continue
        }

        # Map requested path to filesystem under project root
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
            $item = Get-Item -LiteralPath $file
            if ($item.PSIsContainer) {
                # Directory listing
                $entries = Get-ChildItem -LiteralPath $file | Sort-Object @{Expression={[int](-not $_.PSIsContainer)}}, Name
                $html = "<html><head><meta charset='utf-8'><title>Index of /$path</title></head><body><h1>Index of /$path</h1><ul>"
                if ($path -ne '') { $html += "<li><a href='/'>/ (root)</a></li>" }
                foreach ($e in $entries) {
                    $name = $e.Name
                    $rel = ($path.TrimEnd('/') + '/' + $name).TrimStart('/')
                    if ($e.PSIsContainer) { $html += "<li>[DIR] <a href='/$rel/'>$name/</a></li>" } else { $html += "<li><a href='/$rel'>$name</a></li>" }
                }
                $html += "</ul></body></html>"
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($html)
                $context.Response.ContentType = 'text/html; charset=utf-8'
                $context.Response.ContentLength64 = $bytes.Length
                $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                $context.Response.OutputStream.Close()
            }
            else {
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
        }
        else {
            $context.Response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes('404 Not Found')
            $context.Response.ContentLength64 = $msg.Length
            $context.Response.OutputStream.Write($msg, 0, $msg.Length)
            $context.Response.OutputStream.Close()
        }
    }
}
catch [System.Management.Automation.PipelineStoppedException] {
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
