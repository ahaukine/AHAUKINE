#!/bin/bash
# Instalador de PaddleOCR (Baidu) para Mac con Apple Silicon (M1/M2/M3/M4)
# Doble clic en este archivo, o en Terminal: bash instalar.command
set -u
SRC="$(cd "$(dirname "$0")" && pwd)"
DEST="$HOME/OCR-Paddle"
DESK="$HOME/Desktop"

paso()  { printf "\n\033[36m=== %s ===\033[0m\n" "$1"; }
ok()    { printf "  \033[32m[OK]\033[0m %s\n" "$1"; }
falla() { printf "\n  \033[31m[ERROR]\033[0m %s\n\n" "$1"; read -r -p "Presiona Enter para cerrar..." _; exit 1; }

paso "1/6 Verificando el equipo"
[ "$(uname -s)" = "Darwin" ] || falla "Este instalador es solo para macOS."
[ "$(sysctl -n hw.optional.arm64 2>/dev/null)" = "1" ] || falla "Esta Mac no tiene chip Apple (M1/M2/M3/M4). Este instalador no es compatible con Mac Intel."
MACOS="$(sw_vers -productVersion)"
[ "${MACOS%%.*}" -ge 12 ] || falla "macOS $MACOS es muy antiguo. Se requiere macOS 12 Monterey o superior."
CHIP="$(sysctl -n machdep.cpu.brand_string 2>/dev/null)"
RAM=$(( $(sysctl -n hw.memsize) / 1073741824 ))
ok "$CHIP | ${RAM} GB RAM | macOS $MACOS"
[ "$RAM" -ge 8 ] || falla "Se requieren al menos 8 GB de RAM."

paso "2/6 Verificando espacio en disco"
LIBRE=$(df -g "$HOME" | awk 'NR==2 {print $4}')
[ "$LIBRE" -ge 6 ] || falla "Solo hay ${LIBRE} GB libres. Se necesitan al menos 6 GB."
ok "${LIBRE} GB libres"

paso "3/6 Preparando Python (uv)"
export PATH="$HOME/.local/bin:$PATH"
if ! command -v uv >/dev/null 2>&1; then
  curl -LsSf https://astral.sh/uv/install.sh | sh || falla "No se pudo instalar uv. Revisa tu conexion a internet."
  export PATH="$HOME/.local/bin:$PATH"
fi
command -v uv >/dev/null 2>&1 || falla "uv no quedo disponible tras la instalacion."
ok "uv $(uv --version | awk '{print $2}')"

paso "4/6 Instalando PaddleOCR en $DEST (descarga ~1 GB)"
mkdir -p "$DEST"
cp "$SRC/ocr_mac.py" "$DEST/"
[ -x "$DEST/.venv/bin/python" ] || uv venv --python 3.12 "$DEST/.venv" || falla "No se pudo crear el entorno de Python 3.12."
PY="$DEST/.venv/bin/python"
uv pip install --python "$PY" "paddlepaddle==3.3.1" "paddleocr[doc-parser]==3.7.0" || falla "Fallo la instalacion de PaddleOCR. Revisa tu conexion y vuelve a ejecutar."
"$PY" -c "import paddle, paddleocr" 2>/dev/null || falla "PaddleOCR se instalo pero no carga correctamente."
ok "PaddleOCR instalado"

paso "5/6 Descargando modelos de OCR en espanol (puede tardar varios minutos)"
"$PY" "$DEST/ocr_mac.py" --preparar || falla "No se pudieron descargar los modelos. Vuelve a ejecutar el instalador."
ok "Modelos listos"

paso "6/6 Creando iconos en el Escritorio"
crear_app() {  # $1 nombre de la app, $2 opciones extra
  cat > "$DEST/app.applescript" <<APPLESCRIPT
on run
	display dialog "Arrastra uno o varios PDF o imagenes sobre este icono para procesarlos." buttons {"OK"} default button 1 with title "$1"
end run
on open theFiles
	set args to ""
	repeat with f in theFiles
		set args to args & " " & quoted form of POSIX path of f
	end repeat
	tell application "Terminal"
		activate
		do script "clear; '$PY' '$DEST/ocr_mac.py' $2" & args & "; echo; echo 'Puedes cerrar esta ventana.'"
	end tell
end open
APPLESCRIPT
  rm -rf "$DESK/$1.app"
  osacompile -o "$DESK/$1.app" "$DEST/app.applescript" || falla "No se pudo crear el icono $1."
  cp -R "$DESK/$1.app" "$DEST/" 2>/dev/null
}
crear_app "OCR Documento" ""
crear_app "OCR Texto Rapido" "--rapido"
rm -f "$DEST/app.applescript"
ok "Iconos 'OCR Documento' y 'OCR Texto Rapido' en el Escritorio"

printf "\n\033[32mINSTALACION COMPLETA\033[0m\n"
echo "Uso: arrastra un PDF o imagen sobre 'OCR Documento' (Markdown con tablas)"
echo "     u 'OCR Texto Rapido' (solo texto). El resultado aparece en <nombre>_ocr"
echo "     junto al archivo original."
echo "La primera vez macOS pedira permiso para controlar Terminal: elige Permitir."
read -r -p "Presiona Enter para cerrar..." _
