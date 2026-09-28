"""
PaddleOCR (Baidu) local para Mac Apple Silicon.
Uso:
    python ocr_mac.py documento.pdf               # Markdown con estructura (titulos, parrafos, tablas)
    python ocr_mac.py escaneo.jpg --rapido         # Solo texto plano, mas rapido
    python ocr_mac.py a.pdf b.jpg                  # Varios archivos
El resultado queda en una carpeta <nombre>_ocr junto a cada archivo.
Todo se procesa localmente; la primera ejecucion descarga los modelos.
"""
import argparse
import os
import sys
import time

EXTS = (".pdf", ".png", ".jpg", ".jpeg", ".tif", ".tiff", ".bmp", ".webp")


def carpeta_salida(path):
    base = os.path.splitext(os.path.abspath(path))[0]
    out = base + "_ocr"
    os.makedirs(out, exist_ok=True)
    return out


def modo_estructura(files, lang):
    from paddleocr import PPStructureV3
    print("Cargando modelos de estructura (la primera vez se descargan)...")
    pipeline = PPStructureV3(
        lang=lang,
        device="cpu",
        use_doc_orientation_classify=False,
        use_doc_unwarping=False,
        use_textline_orientation=False,
        use_table_recognition=True,
        use_formula_recognition=False,
        use_chart_recognition=False,
        use_seal_recognition=False,
    )
    for f in files:
        t0 = time.time()
        out = carpeta_salida(f)
        nombre = os.path.splitext(os.path.basename(f))[0]
        print(f"\nProcesando: {os.path.basename(f)}")
        paginas = []
        for i, res in enumerate(pipeline.predict_iter(f), 1):
            print(f"  pagina {i} lista")
            res.save_to_markdown(save_path=out)
            paginas.append(res.markdown)
        if not paginas:
            print("  [AVISO] No se obtuvo ninguna pagina.")
            continue
        completo = pipeline.concatenate_markdown_pages(paginas)
        destino = os.path.join(out, f"{nombre}.md")
        with open(destino, "w", encoding="utf-8") as fh:
            fh.write(completo["markdown_texts"])
        print(f"  Listo en {time.time() - t0:.0f} s -> {destino}")


def modo_rapido(files, lang):
    from paddleocr import PaddleOCR
    print("Cargando modelos de texto (la primera vez se descargan)...")
    ocr = PaddleOCR(
        lang=lang,
        device="cpu",
        use_doc_orientation_classify=False,
        use_doc_unwarping=False,
        use_textline_orientation=False,
    )
    for f in files:
        t0 = time.time()
        out = carpeta_salida(f)
        nombre = os.path.splitext(os.path.basename(f))[0]
        print(f"\nProcesando: {os.path.basename(f)}")
        bloques = []
        for i, res in enumerate(ocr.predict_iter(f), 1):
            print(f"  pagina {i} lista")
            bloques.append(f"--- Pagina {i} ---\n" + "\n".join(res["rec_texts"]))
        destino = os.path.join(out, f"{nombre}.txt")
        with open(destino, "w", encoding="utf-8") as fh:
            fh.write("\n\n".join(bloques) + "\n")
        print(f"  Listo en {time.time() - t0:.0f} s -> {destino}")


def main():
    ap = argparse.ArgumentParser(description="OCR local con PaddleOCR")
    ap.add_argument("archivos", nargs="*", help="PDF o imagenes")
    ap.add_argument("--rapido", action="store_true", help="Solo texto plano (sin tablas ni estructura)")
    ap.add_argument("--idioma", default="es", help="Codigo de idioma: es, en, fr, pt, ... (default: es)")
    ap.add_argument("--preparar", action="store_true", help="Solo descargar modelos (lo usa el instalador)")
    args = ap.parse_intermixed_args()

    if args.preparar:
        from paddleocr import PPStructureV3, PaddleOCR
        PPStructureV3(lang=args.idioma, device="cpu", use_doc_orientation_classify=False,
                      use_doc_unwarping=False, use_textline_orientation=False,
                      use_formula_recognition=False, use_chart_recognition=False, use_seal_recognition=False)
        PaddleOCR(lang=args.idioma, device="cpu", use_doc_orientation_classify=False,
                  use_doc_unwarping=False, use_textline_orientation=False)
        print("Modelos listos.")
        return
    if not args.archivos:
        sys.exit("Indica al menos un PDF o imagen.")

    files = []
    for a in args.archivos:
        if not os.path.isfile(a):
            print(f"[AVISO] No existe: {a}")
        elif not a.lower().endswith(EXTS):
            print(f"[AVISO] Formato no soportado: {a}")
        else:
            files.append(a)
    if not files:
        sys.exit("No hay archivos validos para procesar.")

    if args.rapido:
        modo_rapido(files, args.idioma)
    else:
        modo_estructura(files, args.idioma)
    print("\nTerminado. Resultados en carpetas <nombre>_ocr junto a cada archivo.")


if __name__ == "__main__":
    main()
