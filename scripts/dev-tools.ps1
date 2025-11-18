<#
Helper tools for managing the Next.js server on Windows (PowerShell 7).

Usage (execute without loading functions):
  pwsh -ExecutionPolicy Bypass -File .\scripts\dev-tools.ps1 -Action Start
  pwsh -ExecutionPolicy Bypass -File .\scripts\dev-tools.ps1 -Action Stop
  pwsh -ExecutionPolicy Bypass -File .\scripts\dev-tools.ps1 -Action Status
  pwsh -ExecutionPolicy Bypass -File .\scripts\dev-tools.ps1 -Action Tail

Usage (dot-source to load functions into current session):
  . .\scripts\dev-tools.ps1
  Start-NextServer
  Get-NextServerStatus
  Tail-NextServer
  Stop-NextServer
#>

[CmdletBinding()] 
param(
  [ValidateSet('Start','Stop','Status','Tail')]
  [string]$Action = 'Status',

  [string]$ProjectPath = 'C:\\Users\\klass\\OneDrive\\Documents\\GitHub\\SPP\\spp-website',

  [int]$Port = 3000
)

# Ensure output flushes promptly
$ErrorActionPreference = 'Stop'

function Test-PortListening {
  param([int]$Port)
  try {
    $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
    return [bool]($conns)
  } catch { return $false }
}

function Stop-PortListeners {
  param([int]$Port)
  $procs = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique
  if ($procs) {
    foreach ($pid in $procs) {
      try { Stop-Process -Id $pid -Force -ErrorAction Stop } catch {}
    }
  }
}

function Start-NextServer {
  param([string]$Path, [int]$Port)
  if (Test-PortListening -Port $Port) {
    Write-Host "A server is already listening on :$Port" -ForegroundColor Yellow
    return
  }

  Push-Location $Path
  try {
    # Start as background job so the terminal is freed.
    $null = Start-Job -Name NextServer -ScriptBlock {
      param($p)
      Set-Location $p
      npm run start
    } -ArgumentList $Path

    Start-Sleep -Seconds 2

    if (Test-PortListening -Port $Port) {
      Write-Host "Next.js started: http://localhost:$Port" -ForegroundColor Green
    } else {
      Write-Warning "Server did not start on :$Port yet. Use Tail-NextServer to inspect logs."
    }
  } finally {
    Pop-Location
  }
}

function Stop-NextServer {
  param([int]$Port)
  # Stop job if present
  $job = Get-Job -Name NextServer -ErrorAction SilentlyContinue
  if ($job) {
    try { Stop-Job -Job $job -Force -ErrorAction Stop } catch {}
    try { Remove-Job -Job $job -Force -ErrorAction Stop } catch {}
  }
  # Kill any listener on the port
  Stop-PortListeners -Port $Port
  if (-not (Test-PortListening -Port $Port)) {
    Write-Host "Stopped server on :$Port" -ForegroundColor Green
  } else {
    Write-Warning "Some process is still holding :$Port"
  }
}

function Get-NextServerStatus {
  param([int]$Port)
  $job = Get-Job -Name NextServer -ErrorAction SilentlyContinue
  $listening = Test-PortListening -Port $Port
  [pscustomobject]@{
    JobState   = if ($job) { $job.State } else { 'NotRunning' }
    Listening  = $listening
    Url        = if ($listening) { "http://localhost:$Port" } else { $null }
  }
}

function Tail-NextServer {
  $job = Get-Job -Name NextServer -ErrorAction SilentlyContinue
  if (-not $job) { Write-Warning 'No NextServer job found'; return }
  Receive-Job -Job $job -Keep -Wait
}

# If invoked with -File, perform the action. If dot-sourced, functions are available.
switch ($Action) {
  'Start'  { Start-NextServer -Path $ProjectPath -Port $Port; break }
  'Stop'   { Stop-NextServer -Port $Port; break }
  'Status' { Get-NextServerStatus -Port $Port | Format-List; break }
  'Tail'   { Tail-NextServer; break }
  default  { Get-NextServerStatus -Port $Port | Format-List }
}
