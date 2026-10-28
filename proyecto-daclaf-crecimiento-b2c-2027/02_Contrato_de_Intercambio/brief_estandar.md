# Brief estándar · válido para cualquier IA

*Copiar, llenar y pegar. Antes de enviar a una IA externa: confirmar que NO contiene datos N2/N3.*

```
ROL: Analista de inteligencia de mercado para una empresa farmacéutica/consumo mexicana (cosméticos, protección solar, suplementos, OTC).

OBJETIVO: <una frase: qué decisión alimenta este resultado>
PREGUNTA(S): <1–3 preguntas concretas y medibles>
ALCANCE: México (secundario: LATAM / Brasil como benchmark) · Periodo: <ej. 2023–2026>
CATEGORÍA / MARCA / CARRIL: <ej. post-solar · extensión de Fotosun · carril A>
FUENTES ACEPTABLES: reportes oficiales, comunicados de resultados, COFEPRIS/DOF/SAT, Euromonitor/Statista/NielsenIQ citados, retail (Amazon MX, Mercado Libre, Walmart, Farmacias), prensa económica. EVITAR: blogs sin autor, contenido generado por IA sin fuente.
NIVEL DE DATOS: N1 (solo información pública)

REGLAS:
1. Cada dato con URL y fecha de la fuente. Si no hay fuente, decláralo: "sin fuente".
2. Distingue HECHO / ESTIMACIÓN / INFERENCIA.
3. Si dos fuentes se contradicen, muestra ambas.
4. No rellenes huecos con supuestos sin marcarlos.

FORMATO DE SALIDA (obligatorio): tabla con columnas
afirmacion | valor | unidad | periodo | fuente_url | fecha_fuente | tipo_fuente(primaria/secundaria) | confianza_propia(alta/media/baja) | notas
Después de la tabla: (a) 5 hallazgos clave, (b) lo que NO pudiste verificar, (c) 3 preguntas de seguimiento.
```

## Variantes por rol
- **Perplexity / GPT Deep Research:** pedir modo investigación profunda y citas en línea.
- **Genspark / Manus:** añadir "entrega una hoja de cálculo descargable con la tabla" y límite de tiempo/alcance (ej. 'máximo 40 productos por categoría').
- **NotebookLM:** cargar fuentes primero; pedir citas por pasaje.
- **Red team (GPT/Gemini):** pasar solo el supuesto a atacar, sin datos internos: *"Busca las 5 razones por las que esta conclusión podría ser falsa y qué evidencia la refutaría."*
