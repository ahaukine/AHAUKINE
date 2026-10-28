# Piloto 01 · Post-solar (after-sun) en México · Perplexity vs Genspark

*28.OCT.2026 · Documento de trabajo generado con asistencia de IA · Requiere validación del Dr. Cervantes*

## 1. Para qué sirve este piloto
1. **Producir la primera evidencia real** para una oportunidad concreta: extender una marca ancla de protección solar hacia post-solar (carril A o B según claims, `[POR CONFIRMAR con Asuntos Regulatorios]`).
2. **Medir a Perplexity y a Genspark con el mismo encargo**, para asignar roles con datos y no con intuición.
3. **Probar el contrato de intercambio** (brief estándar → salida normalizada → registro de evidencia).

**Hipótesis a probar (no son hechos):** Perplexity es más trazable en citas; Genspark cubre más amplitud y entrega mejor la hoja de cálculo. Los resultados pueden contradecirlas.

## 2. Pre-vuelo de datos (marcar antes de pegar)
- [ ] El brief **no contiene** ventas, costos, márgenes, capacidad, presupuesto ni datos de la licitación (N2/N3).
- [ ] No menciona porcentajes de concentración de ventas ni metas internas (300 SKUs).
- [ ] La marca se describe en términos neutros ("empresa mexicana de protección solar"). Nombrar Fotosun es opcional; se omite para no revelar la intención estratégica a un tercero.
- [ ] Nivel declarado: **N1 (solo información pública)**.

## 3. Reglas comunes (van en ambos encargos)
- Cada dato con URL y fecha de la fuente; si no hay fuente, escribir "sin fuente".
- Distinguir HECHO / ESTIMACIÓN / INFERENCIA.
- Si dos fuentes difieren, mostrar ambas.
- No rellenar huecos con supuestos sin marcarlos.
- Moneda MXN, precio de lista al público con IVA, con fecha de captura.
- Salida en el formato de tabla indicado.

## 4. Brief para **Perplexity** (3 prompts secuenciales)
*Pegar uno por uno en modo de investigación profunda `[POR VERIFICAR el nombre del modo vigente]`. Tres prompts cortos rinden mejor que uno largo.*

### Prompt A · Mercado
```
ROL: Analista de inteligencia de mercado para una empresa mexicana de cuidado personal y protección solar.
OBJETIVO: Dimensionar el mercado de cuidado post-solar (after-sun) en México para decidir si conviene extender una línea de protección solar hacia esa categoría.
PREGUNTAS:
1. ¿Cuál es el tamaño (ventas en valor y, si existe, en unidades) y el crecimiento anual 2021–2026 de after-sun en México? Si no hay dato específico, da el de cuidado solar completo y el de after-sun por separado, indicando qué es estimación.
2. ¿Qué participación tienen las marcas principales y qué canales dominan (farmacias, autoservicio, tiendas departamentales, e-commerce)?
3. ¿Qué tendencias de consumo recientes (últimos 24 meses) afectan la categoría en México?
ALCANCE: México. Benchmark secundario: Brasil, EE. UU., España.
FUENTES ACEPTABLES: Euromonitor, Statista, NielsenIQ, Mordor Intelligence, Mintel, ANIPLAST/CANIPEC u otras cámaras, INEGI, prensa económica con cifra citada. EVITAR: blogs sin autor.
NIVEL DE DATOS: N1.
FORMATO: tabla con columnas
afirmacion | valor | unidad | periodo | fuente_url | fecha_fuente | tipo_fuente(primaria/secundaria) | tipo_dato(HECHO/ESTIMACION/INFERENCIA) | confianza_propia(alta/media/baja) | notas
Después: (a) 5 hallazgos clave, (b) qué NO pudiste verificar, (c) 3 preguntas de seguimiento.
```

### Prompt B · Oferta y precios
```
ROL: Analista de inteligencia competitiva en cuidado personal, México.
OBJETIVO: Levantar la oferta actual de productos after-sun / post-solar disponibles al consumidor en México.
TAREA: Identifica al menos 25 productos de al menos 8 marcas, en canales de farmacia, autoservicio, departamental y e-commerce (Amazon México, Mercado Libre, sitios de las marcas).
PARA CADA PRODUCTO: marca | producto | formato (gel, loción, spray, mousse, crema, otro) | tamaño (ml o g) | precio de lista MXN con IVA | fecha del precio | canal donde lo viste | ingredientes clave | claims visibles (por ejemplo "calmante", "hidratante", "reparador", "alivio de quemaduras") | fuente_url | fecha_fuente.
REGLAS: precio solo si lo viste en la fuente; si no, "sin dato". No inventes productos. Marca los claims tal como aparecen en el empaque o la ficha, sin parafrasear.
NIVEL DE DATOS: N1.
FORMATO: tabla con las columnas anteriores. Después: (a) rangos de precio por formato, (b) 5 hallazgos, (c) qué no pudiste verificar.
```

### Prompt C · Brechas y marco regulatorio
```
ROL: Analista de mercado y asuntos regulatorios de consumo en México.
OBJETIVO: Identificar brechas de oferta en after-sun y mapear el marco regulatorio aplicable, sin emitir conclusiones legales.
PREGUNTAS:
1. ¿Qué formatos, rangos de precio, ingredientes o claims tienen poca oferta o alta demanda aparente (reseñas, volumen de búsquedas, tendencias)? Cita la evidencia.
2. ¿Cómo suelen extender las marcas líderes de protección solar su línea hacia after-sun (en México, Brasil, EE. UU., Europa)? Da 5 ejemplos con fuente.
3. ¿Qué normas regulan en México la clasificación y el etiquetado de un producto cosmético de after-sun y qué tipo de claims podrían reclasificarlo como medicamento? Lista las normas y artículos relevantes con enlace oficial (COFEPRIS, DOF, Ley General de Salud, reglamentos, NOM de etiquetado de cosméticos). No concluyas: señala qué debe validar un responsable regulatorio.
NIVEL DE DATOS: N1.
FORMATO: tabla (afirmacion | valor | fuente_url | fecha_fuente | tipo_dato | confianza_propia | notas) + 5 hallazgos + lo que no pudiste verificar.
```

## 5. Brief para **Genspark** (un solo encargo)
*Pegar en el agente general. Pedir entregable descargable.*
```
ROL: Agente de investigación de mercado para una empresa mexicana de cuidado personal y protección solar.
OBJETIVO: Entregar una hoja de cálculo descargable que me permita decidir si extender una línea de protección solar hacia after-sun (post-solar) en México.
ENTREGABLE: libro de cálculo con 4 hojas:
1) "Mercado": tamaño y crecimiento 2021–2026 (valor, unidades si existen), canales, marcas principales y participación. Columnas: afirmacion | valor | unidad | periodo | fuente_url | fecha_fuente | tipo_dato(HECHO/ESTIMACION/INFERENCIA) | confianza_propia | notas.
2) "Oferta": mínimo 25 productos y 8 marcas disponibles en México (farmacia, autoservicio, departamental, e-commerce). Columnas: marca | producto | formato | tamaño | precio_MXN_con_IVA | fecha_precio | canal | ingredientes_clave | claims_visibles | fuente_url | fecha_fuente.
3) "Brechas": formatos, rangos de precio, ingredientes o claims con poca oferta o demanda creciente, con la evidencia que lo respalda; más 5 ejemplos de cómo marcas líderes de protección solar extendieron su línea a after-sun (México, Brasil, EE. UU., Europa).
4) "Regulatorio": normas mexicanas aplicables a clasificación y etiquetado de cosméticos after-sun y qué claims podrían reclasificarlo como medicamento, con enlace oficial. Sin conclusiones legales; indicar qué debe validar un responsable regulatorio.
Agrega una hoja "Fuentes" con todas las URL, fecha de consulta y una línea de qué sustenta cada una, y una hoja "No verificado" con lo que no pudiste confirmar.
REGLAS: cada dato con URL y fecha; "sin fuente" si no la hay; distingue HECHO / ESTIMACIÓN / INFERENCIA; si dos fuentes difieren, muestra ambas; no inventes productos ni precios.
NIVEL DE DATOS: N1.
LÍMITE: dedica tiempo razonable y avísame qué completaste y qué no.
```

## 6. Cómo correrlo (20–30 min de operación)
1. Hacer el pre-vuelo (§2).
2. Abrir **ambas herramientas a la vez** y registrar hora de inicio y fin de cada una.
3. Pegar Perplexity A, B, C en orden; Genspark en una sola corrida.
4. Guardar las salidas como `pilotos/01/perplexity_A.md`, `_B.md`, `_C.md` y `genspark.xlsx`.
5. Subirlas al Project en Claude con el prompt de ingesta (§7).
6. Verificación manual de **10 filas al azar** de cada herramienta (§8).
7. Anotar resultados en la rúbrica (§9) y decidir roles.

## 7. Prompt de ingesta para Claude
```
Adjunto las salidas de dos herramientas para el Piloto 01 (post-solar México). Haz lo siguiente:
1. Normaliza cada afirmación a las columnas de ledger_evidencia.csv (herramienta = Perplexity o Genspark) y asigna ID EV-### consecutivos.
2. Detecta duplicados, contradicciones entre herramientas y datos sin fuente. Lista cada contradicción con ambas fuentes.
3. Asigna confianza A (fuente primaria o ≥2 independientes), B (una fuente secundaria sólida) o C (sin fuente verificable).
4. Selecciona 10 filas al azar por herramienta para verificación manual y dame la lista con el URL a abrir.
5. Entrega: (a) ledger actualizado, (b) tabla comparativa de las dos herramientas con la rúbrica de la sección 9, (c) 5 hallazgos para la oportunidad post-solar, (d) lo que sigue sin respuesta.
No uses información de DACLAF; solo lo contenido en estas salidas.
```

## 8. Protocolo de verificación (10 filas por herramienta)
Para cada fila al azar: abrir el URL, confirmar que **el dato aparece** en la página, que el precio o la cifra coincide y que la fecha es la declarada. Marcar: ✔ coincide · ✖ no aparece · ~ difiere. Un ✖ cuenta como alucinación.

## 9. Rúbrica de comparación (0–5 por criterio)
| Criterio | Cómo se mide | Perplexity | Genspark |
|---|---|---|---|
| Cobertura | ≥25 productos y ≥8 marcas; las 5 preguntas respondidas | | |
| Trazabilidad | % de filas con URL que abre | | |
| Exactitud | % ✔ en las 10 filas verificadas | | |
| Alucinaciones | número de ✖ (0 = 5 pts) | | |
| Frescura | % de fuentes con fecha ≤12 meses | | |
| Formato | cumple columnas y entrega descargable | | |
| Tiempo y esfuerzo | minutos de operación y de corrección | | |
| Costo | créditos o suscripción consumidos | | |
| Utilidad para decidir | ¿cambia la decisión de extender? | | |

**Regla de decisión:** el rol primario de una herramienta se asigna por exactitud y trazabilidad; amplitud y formato desempatan. Repetir el piloto cuando una herramienta cambie de modelo o de plan.

## 10. Qué se produce al final
Ledger con las primeras filas reales, comparativo de herramientas, 5 hallazgos de post-solar y una lista de pendientes para **Asuntos Regulatorios** (claims y clasificación). Ese paquete alimenta la ficha de Compuerta 1 de la oportunidad.
