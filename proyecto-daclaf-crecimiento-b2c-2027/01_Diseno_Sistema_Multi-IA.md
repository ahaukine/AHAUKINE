# Diseño del sistema multi-IA · Proyecto 3 DACLAF · v0.1 (propuesta para discusión)

*28.OCT.2026 · Documento de trabajo generado con asistencia de IA · Requiere validación del Dr. Cervantes*

## 1. Tesis de diseño

**Las IA son intercambiables; el contrato no.** El sistema no se diseña alrededor de una herramienta sino de tres cosas estables: (1) un **brief estándar** que entra a cualquier IA, (2) un **ledger de evidencia** donde toda salida se normaliza, (3) **compuertas humanas** donde se decide. Con eso, Perplexity, Genspark, Manus, GPT o NotebookLM se sustituyen por rol, no por afinidad.

Dos restricciones mandan el diseño:
- **David y Sara deben operarlo solos el 18-dic** y en cuentas corporativas. Cuantas más herramientas, menos probable que lo hagan.
- **Datos internos sensibles** (ventas por SKU, costos, Presupuesto 2027) no deben viajar a herramientas de terceros sin política clara.

Por eso propongo **dos modos**: *Build* (multi-IA, lo opera el Dr. hasta el 16-nov y del 4-dic en adelante) y *Run* (stack mínimo que opera el cliente).

## 2. Arquitectura en capas

```
CAPA 5  Decisión humana      David / Sara · compuertas 1-2-3 · Asuntos Regulatorios valida
CAPA 4  Entregables          Claude → XLSX (modelo), DOCX/PDF (fichas), PPTX/HTML (sesión), Presupuesto 2027
CAPA 3  Análisis y scoring   Claude (+ Excel) · embudo, matriz Make/Buy/Asociar, escenarios, QA y triangulación
CAPA 2  Evidencia            ledger_evidencia.csv  ← única puerta de entrada de datos externos
CAPA 1  Obtención            Externa: Perplexity · Genspark · Manus · GPT · Gemini/Grok
                             Interna: NetSuite (maestro DF/DAS) · ventas · Plaud (sesiones) → Claude / NotebookLM
CAPA 0  Gobierno de datos    N1 público · N2 interno · N3 crítico (ver instrucciones)
```

## 3. Roles y enrutamiento (herramienta ≠ rol)

Las capacidades de cada herramienta cambian rápido: lo marcado `[POR VERIFICAR]` debe probarse con un piloto de 1 tarea antes de asignarle carga real.

| Rol | Tarea típica en este proyecto | Primario | Respaldo / segunda opinión | Datos permitidos |
|---|---|---|---|---|
| **Orquestador y analista** | Brief, scoring, modelo, QA, redacción, Presupuesto 2027 | Claude (Project corporativo) | — | N1-N3 |
| **Investigación con citas** | Tamaño/tendencia por categoría, regulación, notas de prensa, precios de góndola | Perplexity | GPT Deep Research · Gemini Deep Research | N1 |
| **Barrido amplio y primer borrador de tablas** (el "embudo" que David mencionó) | Universo de oportunidades por categoría, benchmarks de marcas, tablas comparativas | Genspark | Manus | N1 |
| **Tarea larga autónoma** | Levantar catálogos de competidores en marketplaces/retail, normalizar a tabla, monitoreo recurrente | Manus `[POR VERIFICAR]` | Genspark · scripts + Claude | N1 |
| **Corpus cerrado con citas** | Regulación COFEPRIS/LGS, reportes Hypera/Cimed, transcripciones, documentos de DACLAF | NotebookLM | Claude Project knowledge | N1-N2 |
| **Red team / segunda opinión** | Atacar supuestos del scoring y de la ruta regulatoria | GPT | Gemini | N1 o anonimizado |
| **Señal de tendencia social** | Qué pide el consumidor (Reddit/X/TikTok/Amazon reviews) | Grok `[POR VERIFICAR]` | Perplexity | N1 |
| **Visual de concepto** (opcional) | Mockups de empaque para Compuerta 1 | MidJourney | — | N1 |
| **Captura de sesiones** | Transcribir/resumir sesiones con David y Sara | Plaud | — | N2 |
| **Automatización** (fase 2) | Mover resultados al ledger, alertas | Make | — | según flujo |

**Regla de enrutamiento:** (1) ¿toca N2/N3? → solo Claude/NotebookLM corporativos. (2) ¿necesita citas verificables? → Perplexity/NotebookLM. (3) ¿es volumen y estructura de tabla? → Genspark/Manus. (4) ¿mueve una decisión de dinero o regulatoria? → dos IA distintas + fuente primaria.

## 4. Flujo: embudo de 300 SKUs

| Etapa | Qué ocurre | IA principal | Salida | Humano |
|---|---|---|---|---|
| E0 Línea base | Maestro NetSuite → SKUs activos por marca/entidad, ABC de ventas, qué no se vende | Claude (N2) | Tabla base + diagnóstico de datos maestros | Sistemas/Contraloría confirma |
| E1 Universo | Categorías y productos candidatos por marca existente (extensiones) y por categoría nueva | Genspark / Perplexity | ~long list con fuente | — |
| E2 Filtro regulatorio | Asigna carril A/B/C y riesgo de reclasificación por claim | NotebookLM + Claude | Carril + tiempo estimado `[POR CONFIRMAR]` | **Asuntos Regulatorios** |
| E3 Atractivo de mercado | Tamaño, crecimiento, precio, competidores, reseñas | Perplexity + Manus + Grok | Ledger poblado | — |
| E4 Make / Buy / Asociar | Capacidad Lerma vs maquila vs dossier vs collab | Claude (N2/N3) | Matriz por SKU | Operaciones/Compras |
| E5 Scoring | Puntuación ponderada, sensibilidad | Claude + red team GPT | Ranking + shortlist | **David/Sara** fijan pesos |
| E6 Compuerta 1 | Ficha de 1 página por candidato | Claude | Fichas | **David/Sara** deciden |
| E7 Presupuesto 2027 | Pipeline → desarrollo, registros, inventario inicial | Claude + Excel | Escenarios | Finanzas |

**Criterios de scoring (hipótesis de partida, pesos a calibrar con David y Sara):** atractivo de mercado 25 · ajuste a marca/claims 20 · velocidad al mercado (carril) 15 · margen estimado 15 · ajuste de manufactura 10 · riesgo de inventario/caducidad 10 · absorción de canal 5. Los pesos son una propuesta mía, no un dato; las metas las fija la DG.

## 5. Contrato de intercambio (lo que hace posible "intercambiable")

1. **Brief estándar** (`02_Contrato.../brief_estandar.md`): objetivo, pregunta, alcance, geografía (México), periodo, fuentes aceptables, nivel de datos, formato de salida exacto.
2. **Salida normalizada:** tabla con las columnas del `ledger_evidencia.csv` (afirmación, valor, unidad, URL, fecha de la fuente, tipo de fuente, herramienta, confianza).
3. **Ingesta:** el humano pega o sube la salida a Claude; Claude valida formato, detecta duplicados y contradicciones, y asigna confianza **A** (fuente primaria o ≥2 independientes) · **B** (una fuente secundaria sólida) · **C** (una IA sin fuente verificable).
4. **Prohibido:** que una IA externa reciba N2/N3, o que una cifra sin fila en el ledger llegue a una ficha o al presupuesto.

## 6. Alternativas de diseño

| Opción | Descripción | Pros | Contras | Veredicto |
|---|---|---|---|---|
| **A. Hub Claude + satélites manuales** (recomendada) | Claude orquesta; el humano pasa briefs y resultados | Control, cero código, auditable, rápido de arrancar | Depende de disciplina humana; no escala a monitoreo continuo | **Adoptar para el 18-dic** |
| B. Pipeline automatizado (Make/API) | Flujos que disparan IA y escriben al ledger | Escala, recurrente | Tiempo de construcción y mantenimiento; riesgo de fallar sin el Dr. presente; costos de API | Fase 2 (2027) |
| C. Mono-herramienta (solo Claude con búsqueda web) | Un solo entorno | Máxima simplicidad y seguridad de datos | Sin triangulación independiente; menos amplitud en barridos | **Run mode mínimo** si el cliente no adopta más |
| D. "Mejor IA por tarea" libre | Cada quien usa lo que prefiera | Flexible | Sin trazabilidad ni comparabilidad | Descartada |

**Recomendación:** A en *Build*, C + NotebookLM + Perplexity en *Run*, con B como roadmap. Es la combinación que cumple "opera solo" sin sacrificar triangulación.

## 7. Ruta al 18-dic

| Fechas | Hito | Nota |
|---|---|---|
| 28-oct → 31-oct | Project montado; respuestas del cuestionario; data room N2; línea base E0 | Depende de que David/Sara respondan |
| 3-nov → 13-nov | E1–E3 en Build; mapa regulatorio con Asuntos Regulatorios; primer ranking | Sesión de trabajo con Dr. + David/Sara |
| 13-nov (antes de ausencia) | **Handoff a Run mode:** guía de 1 hoja, 3 briefs probados, ledger inicial | Definir quién del lado DACLAF opera durante 17-nov→3-dic |
| 17-nov → 3-dic | Ausencia del Dr. | Operación mínima, sin construcción nueva |
| 4-dic → 18-dic | E4–E7; Compuerta 1 de shortlist; Presupuesto 2027; cierre y capacitación | Criterios de cierre firmados |

## 8. Riesgos principales

| Riesgo | Mitigación |
|---|---|
| Datos N2/N3 filtrados a herramientas externas | Clasificación obligatoria + revisión en cada brief |
| Alucinación de cifras de mercado | Ledger + triangulación; nada sin fuente va a la DG |
| Conclusión regulatoria errónea | Asuntos Regulatorios valida; "no requiere registro" nunca sin matiz |
| El cliente no lo adopta | Run mode mínimo, 3 briefs probados, un operador nombrado |
| La meta (300 SKUs vs 300 lanzamientos) cambia el presupuesto | Resolver PDF §6 #4 antes de E7 |
| Capacidad de planta/absorción comercial limita el ritmo | Entran como restricciones en E4/E5, no como nota al pie |
| Cambio de capacidades/políticas de las herramientas | Piloto de una tarea por herramienta antes de asignarle carga; contrato independiente de la herramienta |

## 9. Preguntas abiertas para el Dr.

1. ¿Se realizó la sesión del 27-oct y hay respuestas al cuestionario o documentos de David y Sara?
2. ¿Qué cuentas **corporativas** tendrán David y Sara hoy (Claude, ChatGPT, Gemini/NotebookLM)? Condiciona el Run mode.
3. ¿Quién del lado DACLAF será el operador del sistema (¿Sara? ¿alguien de Marketing)?
4. ¿Autorizan que se use Genspark/Manus/Perplexity con datos N1 únicamente? ¿Hay política de TI de DACLAF?
5. ¿Presupuesto/tolerancia para suscripciones adicionales en Build (y quién las paga)?
6. ¿Prefieres que la ficha de Compuerta 1 y el tablero sean HTML interactivo, PPTX o ambos?
