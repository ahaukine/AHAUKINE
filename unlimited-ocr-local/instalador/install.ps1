# Instalador automatico de Unlimited-OCR (baidu) para Windows 11 + GPU NVIDIA
# Ejecutar con doble clic en INSTALAR.bat
$ErrorActionPreference = "Stop"
$Dest = "C:\ocr"
$Src  = $PSScriptRoot

function Paso($t)  { Write-Host "`n=== $t ===" -ForegroundColor Cyan }
function Ok($t)    { Write-Host "  [OK] $t" -ForegroundColor Green }
function Falla($t) { Write-Host "`n  [ERROR] $t" -ForegroundColor Red; Read-Host "`nPresiona Enter para cerrar"; exit 1 }

# 1. GPU y driver
Paso "1/7 Verificando GPU NVIDIA"
if (-not (Get-Command nvidia-smi -ErrorAction SilentlyContinue)) { Falla "No se encontro nvidia-smi. Instala o actualiza el driver NVIDIA (nvidia.com/drivers) y vuelve a ejecutar." }
$gpu = @(& nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv,noheader)[0]
$name, $drv, $mem = $gpu -split ",\s*"
Ok "$name | driver $drv | $mem"
if ([int]($drv.Split(".")[0]) -lt 570) { Falla "El driver $drv es antiguo. Se requiere 570 o superior. Actualizalo desde la app NVIDIA y vuelve a ejecutar." }

# 2. Espacio en disco
Paso "2/7 Verificando espacio en disco"
$free = [math]::Round((Get-PSDrive C).Free / 1GB, 1)
if ($free -lt 20) { Falla "Solo hay $free GB libres en C:. Se necesitan al menos 20 GB (PyTorch + modelo)." }
Ok "$free GB libres"

# 3. Python 3.12
Paso "3/7 Verificando Python 3.12"
function Find-Py {
    try { $p = (& py -3.12 -c "import sys;print(sys.executable)" 2>$null); if ($LASTEXITCODE -eq 0 -and $p) { return $p.Trim() } } catch {}
    foreach ($c in @("$env:LOCALAPPDATA\Programs\Python\Python312\python.exe", "C:\Program Files\Python312\python.exe")) { if (Test-Path $c) { return $c } }
    return $null
}
$py = Find-Py
if (-not $py) {
    Write-Host "  Python 3.12 no encontrado. Instalando con winget..."
    & winget install -e --id Python.Python.3.12 --scope user --silent --accept-package-agreements --accept-source-agreements
    $env:Path = [Environment]::GetEnvironmentVariable("Path", "User") + ";" + [Environment]::GetEnvironmentVariable("Path", "Machine")
    $py = Find-Py
    if (-not $py) { Falla "No se pudo instalar Python 3.12. Instalalo manualmente desde python.org (marca 'Add to PATH') y vuelve a ejecutar." }
}
Ok "Python: $py"

# 4. Carpeta y entorno virtual
Paso "4/7 Creando $Dest y entorno virtual"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
Copy-Item "$Src\ocr_local.py", "$Src\requirements.txt" $Dest -Force
if (-not (Test-Path "$Dest\.venv\Scripts\python.exe")) {
    & $py -m venv "$Dest\.venv"
    if ($LASTEXITCODE -ne 0) { Falla "No se pudo crear el entorno virtual." }
}
$vpy = "$Dest\.venv\Scripts\python.exe"
& $vpy -m pip install --upgrade pip --quiet
Ok "Entorno listo"

# 5. PyTorch con CUDA
Paso "5/7 Instalando PyTorch con CUDA (descarga ~3 GB, puede tardar)"
& $vpy -m pip install torch==2.10.0 torchvision==0.25.0 --index-url https://download.pytorch.org/whl/cu128
if ($LASTEXITCODE -ne 0) { Falla "Fallo la instalacion de PyTorch. Revisa tu conexion a internet y vuelve a ejecutar." }
$cuda = (& $vpy -c "import torch;print(torch.cuda.is_available())").Trim()
if ($cuda -ne "True") { Falla "PyTorch se instalo pero no detecta la GPU. Actualiza el driver NVIDIA y vuelve a ejecutar." }
Ok "PyTorch detecta la GPU"

# 6. Dependencias y modelo
Paso "6/7 Instalando dependencias y descargando el modelo (varios GB)"
& $vpy -m pip install -r "$Dest\requirements.txt"
if ($LASTEXITCODE -ne 0) { Falla "Fallo la instalacion de dependencias." }
& $vpy -c "from huggingface_hub import snapshot_download; snapshot_download('baidu/Unlimited-OCR')"
if ($LASTEXITCODE -ne 0) { Falla "No se pudo descargar el modelo de Hugging Face. Vuelve a ejecutar; la descarga se reanuda." }
Ok "Modelo descargado"

# 7. Lanzador y acceso directo
Paso "7/7 Creando lanzador y acceso directo en el Escritorio"
@'
@echo off
chcp 65001 >nul
set PYTHONUTF8=1
if "%~1"=="" (
  echo Arrastra un PDF o una imagen sobre este icono para procesarlo.
  pause
  exit /b
)
for %%F in (%*) do (
  echo.
  echo Procesando: %%~nxF
  "%~dp0.venv\Scripts\python.exe" "%~dp0ocr_local.py" "%%~fF" --out "%%~dpnF_ocr" --lote 10
)
echo.
echo Terminado. Los resultados estan en carpetas *_ocr junto a cada archivo.
pause
'@ | Set-Content -Path "$Dest\OCR.bat" -Encoding ASCII
$lnk = (New-Object -ComObject WScript.Shell).CreateShortcut("$([Environment]::GetFolderPath('Desktop'))\Unlimited OCR.lnk")
$lnk.TargetPath = "$Dest\OCR.bat"
$lnk.WorkingDirectory = $Dest
$lnk.Save()
Ok "Acceso directo 'Unlimited OCR' creado en el Escritorio"

Write-Host "`nINSTALACION COMPLETA" -ForegroundColor Green
Write-Host "Uso: arrastra un PDF o imagen sobre el icono 'Unlimited OCR' del Escritorio."
Write-Host "El resultado aparece en una carpeta <nombre>_ocr junto al archivo original."
Read-Host "`nPresiona Enter para cerrar"
