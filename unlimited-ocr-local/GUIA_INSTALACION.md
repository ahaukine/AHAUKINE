# 📋 Unlimited-OCR (Baidu): instalación local paso a paso

Fuente: README oficial de [baidu/Unlimited-OCR](https://github.com/baidu/Unlimited-OCR) (revisado el 25-sep-2026).

## 0. Requisito previo que decide todo ⚠️

**Necesitas una GPU NVIDIA con CUDA.** El README solo documenta inferencia en GPU NVIDIA (probado con Python 3.12.3 + CUDA 12.9). No hay ruta oficial para CPU, Mac (Apple Silicon) ni GPU AMD.

Verifica en una terminal (PowerShell en Windows):

```
nvidia-smi
```

| Resultado | Qué hacer |
|---|---|
| Muestra tu GPU y "CUDA Version" ≥ 12.8 | Continúa con el paso 1 |
| Muestra GPU pero CUDA < 12.8 | Actualiza el driver NVIDIA (nvidia.com/drivers) y repite |
| "comando no encontrado" / sin NVIDIA | No podrás correrlo localmente. Alternativas: demo en [Hugging Face Spaces](https://huggingface.co/spaces/baidu/Unlimited-OCR) o API en [Baidu Cloud](https://cloud.baidu.com/doc/OCR/s/fmr1p39gb) |

VRAM: el modelo deriva de DeepSeek-OCR (~3 mil millones de parámetros, ~7 GB en bf16). **Estimación, no dato oficial:** 12 GB de VRAM como mínimo práctico, 16 GB o más para PDFs largos (contexto de 32k tokens). Verifica el tamaño real en la pestaña *Files* de [huggingface.co/baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR).

## Elige la ruta

| Ruta | Para quién | SO | Comentario |
|---|---|---|---|
| **A. Transformers** ✅ | PC personal, uso por documento | Windows / Linux | La más sencilla. Es la que se detalla abajo |
| B. vLLM (Docker) | Servidor/API para varios usuarios | Linux o Windows + WSL2 | Imagen `vllm/vllm-openai:unlimited-ocr` |
| C. SGLang | Procesamiento masivo en servidor | Linux | Usa `fa3` (FlashAttention 3), pensado para GPUs Hopper (H100/H200). No es adecuado para una GPU de PC |

---

## Ruta A: Transformers (recomendada para PC)

### 1. Instala Python 3.12 y Git

- Python 3.12: python.org/downloads. En Windows marca **"Add python.exe to PATH"**.
- Git: git-scm.com

Verifica:
```
python --version     # debe decir 3.12.x
git --version
```

### 2. Crea una carpeta y un entorno virtual

Coloca en una carpeta (ej. `C:\ocr`) los archivos `ocr_local.py` y `requirements.txt` de este paquete.

**Windows (PowerShell):**
```
cd C:\ocr
python -m venv .venv
.venv\Scripts\Activate.ps1
```
Si PowerShell bloquea el script: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` y repite.

**Linux:**
```
cd ~/ocr
python3.12 -m venv .venv
source .venv/bin/activate
```

### 3. Instala PyTorch con soporte CUDA

El README pide `torch==2.10.0` y `torchvision==0.25.0`. Instálalos **desde el índice de PyTorch**, no desde PyPI a secas (en Windows, PyPI instala la versión sin GPU):

```
python -m pip install --upgrade pip
pip install torch==2.10.0 torchvision==0.25.0 --index-url https://download.pytorch.org/whl/cu128
```

Si ese comando falla, genera el correcto en pytorch.org/get-started/locally (elige tu SO, Pip, CUDA 12.8 o 12.9) y usa las versiones indicadas arriba.

Comprueba que detecta la GPU:
```
python -c "import torch; print(torch.cuda.is_available(), torch.cuda.get_device_name(0))"
```
Debe imprimir `True` y el nombre de tu GPU. Si dice `False`, no sigas: reinstala torch con el índice CUDA.

### 4. Instala las demás dependencias
```
pip install -r requirements.txt
```

### 5. Primera ejecución

```
python ocr_local.py mi_documento.pdf
```
o con una imagen:
```
python ocr_local.py escaneo.jpg
```

- La primera vez descarga el modelo desde Hugging Face (varios GB; tarda según tu conexión). Queda guardado en caché (`%USERPROFILE%\.cache\huggingface` en Windows, `~/.cache/huggingface` en Linux) y no se vuelve a descargar.
- Los resultados (Markdown con la estructura del documento) se guardan en la carpeta `salida_ocr`.
- Opciones: `--out otra_carpeta`, `--dpi 200` (menos memoria en PDFs grandes).

---

## 🎯 Configuración específica: Windows 11 + RTX 4070 (12 GB)

| Punto | Tu equipo | Veredicto |
|---|---|---|
| Arquitectura | Ada Lovelace, admite bf16 | ✅ Compatible con `torch_dtype=bfloat16` |
| Driver | Requiere ≥ 570 para CUDA 12.8 | Actualiza desde la app NVIDIA o nvidia.com/drivers (Game Ready o Studio, cualquiera sirve) |
| Rueda de PyTorch | `cu128` | ✅ El comando del paso 3 funciona tal cual |
| VRAM 12 GB | Modelo ~7 GB (estimado) + contexto | ✅ Imágenes y PDFs cortos · ⚠️ PDFs largos: usa `--lote` |

**Uso recomendado en tu equipo:**
```
python ocr_local.py escaneo.jpg                      # una imagen
python ocr_local.py contrato.pdf                     # PDF de hasta ~10 páginas
python ocr_local.py expediente.pdf --lote 10         # PDF largo: bloques de 10 páginas
python ocr_local.py expediente.pdf --lote 5 --dpi 200  # si aun así se queda sin memoria
```
Con `--lote`, cada bloque se guarda en `salida_ocr\lote_001`, `lote_002`, etc. La contrapartida es que el modelo no ve el documento completo de una sola vez. Eso puede afectar tablas o párrafos que continúan entre páginas de bloques distintos.

**Ajustes de Windows:**
- Cierra juegos, navegadores con muchas pestañas o herramientas de video antes de procesar; también consumen VRAM. Para ver cuánta memoria de video queda libre: `nvidia-smi`.
- Hugging Face puede mostrar un aviso sobre *symlinks* en Windows. Es inofensivo; para quitarlo, activa *Configuración → Sistema → Para programadores → Modo de desarrollador*.
- Usa una ruta corta (ej. `C:\ocr`) para evitar errores de rutas largas.

---

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| `torch.cuda.is_available()` = False | Torch sin CUDA o driver viejo | Paso 3 con `--index-url`; actualizar driver |
| `CUDA out of memory` | VRAM insuficiente | Bajar `--dpi` a 150–200; procesar PDFs en lotes de menos páginas; cerrar otras apps que usen GPU |
| Error con `trust_remote_code` o versiones | transformers distinto a 4.57.1 | `pip install transformers==4.57.1` |
| Descarga del modelo lenta o falla | Red / proxy | Reintentar; alternativa: [ModelScope](https://modelscope.cn/models/PaddlePaddle/Unlimited-OCR) |
| Texto repetido en la salida | Bucle de generación | Ya mitigado con `no_repeat_ngram_size=35` en el script |

## ⚠️ Nota para uso con documentos de clientes

La ejecución es 100 % local una vez descargado el modelo: los documentos no salen de tu equipo. Esto es relevante para expedientes sujetos a secreto profesional. La demo de Hugging Face y Baidu Cloud **sí** envían el documento a servidores de terceros, así que no las uses con material confidencial.

`trust_remote_code=True` ejecuta código Python publicado en el repositorio del modelo en Hugging Face. Es el procedimiento oficial, pero conviene saberlo si tu política de seguridad lo restringe.
