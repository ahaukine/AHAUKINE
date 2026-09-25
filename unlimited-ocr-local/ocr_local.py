"""
Unlimited-OCR (baidu) - ejecución local con Hugging Face Transformers.
Uso:
    python ocr_local.py documento.pdf
    python ocr_local.py imagen.jpg
    python ocr_local.py documento.pdf --out resultados --dpi 200
Requiere GPU NVIDIA con CUDA. La primera ejecución descarga los pesos del modelo.
"""
import argparse
import os
import sys
import tempfile

import torch
from transformers import AutoModel, AutoTokenizer

MODEL = "baidu/Unlimited-OCR"


def pdf_to_images(pdf_path, dpi):
    import fitz  # PyMuPDF
    doc = fitz.open(pdf_path)
    tmp_dir = tempfile.mkdtemp(prefix="pdf_ocr_")
    mat = fitz.Matrix(dpi / 72, dpi / 72)
    paths = []
    for i, page in enumerate(doc):
        out = os.path.join(tmp_dir, f"page_{i + 1:04d}.png")
        page.get_pixmap(matrix=mat).save(out)
        paths.append(out)
    doc.close()
    return paths


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input", help="Imagen (.jpg/.png) o PDF")
    ap.add_argument("--out", default="salida_ocr", help="Carpeta de resultados")
    ap.add_argument("--dpi", type=int, default=300, help="DPI para convertir PDF")
    args = ap.parse_args()

    if not torch.cuda.is_available():
        sys.exit("ERROR: PyTorch no detecta GPU CUDA. Revisa driver NVIDIA e instalación de torch (paso 3).")
    print(f"GPU: {torch.cuda.get_device_name(0)}")

    os.makedirs(args.out, exist_ok=True)
    tokenizer = AutoTokenizer.from_pretrained(MODEL, trust_remote_code=True)
    model = AutoModel.from_pretrained(
        MODEL, trust_remote_code=True, use_safetensors=True, torch_dtype=torch.bfloat16
    ).eval().cuda()

    if args.input.lower().endswith(".pdf"):
        pages = pdf_to_images(args.input, args.dpi)
        print(f"PDF con {len(pages)} páginas -> modo multipágina")
        model.infer_multi(
            tokenizer,
            prompt="<image>Multi page parsing.",
            image_files=pages,
            output_path=args.out,
            image_size=1024,
            max_length=32768,
            no_repeat_ngram_size=35, ngram_window=1024,
            save_results=True,
        )
    else:
        model.infer(
            tokenizer,
            prompt="<image>document parsing.",
            image_file=args.input,
            output_path=args.out,
            base_size=1024, image_size=640, crop_mode=True,  # modo "gundam"
            max_length=32768,
            no_repeat_ngram_size=35, ngram_window=128,
            save_results=True,
        )
    print(f"Listo. Resultados en: {os.path.abspath(args.out)}")


if __name__ == "__main__":
    main()
