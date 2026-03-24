# Way Maker - Local preview on http://localhost:3001
# Double-click to run, or run in PowerShell: .\start-preview.ps1

$port = 3001
$root = $PSScriptRoot
Set-Location $root

Write-Host "Starting preview server..." -ForegroundColor Green
Write-Host "Open in browser: http://localhost:$port" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor Yellow
Write-Host ""

# Try Node (npx serve) first, then Python
if (Get-Command node -ErrorAction SilentlyContinue) {
  npx --yes serve -l $port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
  python -m http.server $port
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
  python3 -m http.server $port
} else {
  Write-Host "Install Node.js (https://nodejs.org) or Python to run a local server." -ForegroundColor Red
  pause
}
