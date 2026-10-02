# 📋 Encuesta longitudinal de IA · Club Harvard de México (AI Interest Group)
**Borrador v0.1 · 2 oct 2026 · Para revisión de Arturo, José y Joel**
Nombre de trabajo: *Pulso IA · Comunidad Harvard México*

---

## 1. Qué debe lograr (reformulación del encargo)

| # | Objetivo | Cómo lo resuelve el instrumento |
|---|---|---|
| 1 | **Identificar innovadores por industria** para panel, keynotes y red | Bloque E (profundidad de implementación) + Bloque F (innovación, referidos, disponibilidad) → *Índice de Implementación* y shortlist por sector |
| 2 | **Medir conocimiento y uso personal de IA** | Reactivos Q1, Q3 y herramientas **idénticos al AI Readiness Survey v3.0** |
| 3 | **Medir implementación empresarial por sector** | Q4 de v3.0 (madurez organizacional) + Bloque E |
| 4 | **Repetirse periódicamente** y mostrar cambio de la comunidad | Núcleo fijo + módulo rotativo, llave de panel y reglas de versionado (§5) |
| 5 | **Escalar de 72 a ~800 exalumnos** | Referidos (F4), versión corta y reglas de publicación por sector (§6) |

## 2. Compatibilidad con la encuesta existente (AI Readiness Survey v3.0)

**Principio:** todo lo que alimenta el score canónico se conserva con el mismo ID, escala y orden de columnas. El score (`literacy×8 + skills×6 + org×7.5`, máx. 100) **no cambia**, así la comunidad es comparable con la base de +140 personas de programas corporativos.

| Bloque nuevo | Origen en v3.0 | Tratamiento |
|---|---|---|
| Q1.1, Q1.2alt, Q1.4–Q1.9 (8 ítems) | cols 11, 13–19 | **Literal.** Pegar la redacción exacta del Form v3.0 |
| Q3.1–Q3.7 (7 ítems) | cols 38–42, 84–85 | **Literal**, con un ajuste de formato en Q3.7 (ver abajo) |
| Q4.1–Q4.10 (10 ítems, con "No sé") | cols 43–52 | **Literal.** Se mantiene la exclusión de "No sé" |
| Frecuencia de herramientas | cols 21–35, 79–83 | **Literal** + 3 herramientas nuevas (T21–T23) |
| Suscripciones de pago | cols 36–37 | Literal |
| Autoridad / horizonte / presupuesto | cols 86–88 | Literal (se reutiliza en E6 y E8) |
| Métricas de impacto | col 89 | Literal (se reutiliza en E5) |
| Barreras, canales, horas/sem, formato | cols 65–69 | Versión corta |
| **Bloques D (perfil), E, F, W** | — | **Nuevos** |
| Q7 (NPS post-curso) | cols 71–76 | **Se omite**: no aplica a la comunidad |

**Cuidado con tres trampas conocidas del Form** (`methodology.md`):
1. **Q3.7** sale en 5 en personas que dicen "No" en uso de agentes: la escala se lee al revés. En el nuevo Form conviene rotular los extremos ("1 = Nunca he usado · 5 = Uso a diario") **sin cambiar el texto del ítem**. Si cambia la lectura, anotar el corte de versión.
2. **"No sé" ≠ 0** en Q4; con ≥ 6 "No sé" el eje organizacional es una foto borrosa (aplica sobre todo a quien no es directivo).
3. **Empresa**: usar una sola columna ("Empresa") y normalizar. En v3.0 la empresa a veces llega en la col 78.

> ⚠️ **Verificación pendiente:** en esta sesión tengo las etiquetas canónicas de Q1/Q3/Q4 pero no la redacción literal de cada ítem. Antes de armar el Form hay que copiar el texto exacto del Sheet `AI Readiness Survey v3.0 - Respuestas` (fila de encabezados). Sin eso se rompe la comparabilidad.

## 3. Estructura del instrumento (83 ítems; estimado 14–16 min completa y ~8–9 min corta, por validar en piloto)

| Bloque | Contenido | Ítems | Corta | Alimenta |
|---|---|---|---|---|
| **D · Perfil y consentimiento** | Identidad, Harvard, sector, tamaño, rol | 12 | ✔ | Cortes por industria |
| **Q1 · Alfabetización** | Conocimiento y uso personal | 8 | ✔ | Score canónico |
| **T · Herramientas** | Frecuencia de uso por herramienta y suscripciones | 24 | — | Adopción de herramientas |
| **Q3 · Habilidades avanzadas** | Prompts, agentes, integración, evaluación crítica | 7 | ✔ | Score canónico |
| **Q4 · Contexto organizacional** | Estrategia, datos, gobernanza, talento… | 10 | ✔ | Score canónico |
| **E · Implementación** *(nuevo)* | Nivel de adopción, casos en producción, impacto, inversión | 9 | ✔ | **Índice de Implementación** |
| **F · Innovación y red** *(nuevo)* | Casos para compartir, referidos, oferta y demanda | 7 | ✔ | **Shortlist de innovadores** |
| **G · Aprendizaje y dolor** | Barreras, canales, una tarea dolorosa | 6 | — | Contenido de eventos |
| **W · Metadatos** | Ola, versión, canal, código de referido | 4 | auto | Longitudinal |

Banco completo de reactivos (ID, texto, escala, origen, uso): **Anexo A** y archivo `Banco_Reactivos_Pulso-IA_v0.1.xlsx`.

## 4. Puntuación: dos índices separados

### 4.1 Score canónico v3.0 (sin cambios)
`total = avg(Q1)×8 + avg(Q3)×6 + avg(Q4, sin "No sé")×7.5` → INICIAL 0–29 · PRINCIPIANTE 30–49 · INTERMEDIO 50–69 · AVANZADO 70–100.

### 4.2 Índice de Implementación (II, 0–100) — *nuevo, propuesta a calibrar*

| Componente | Peso | Cálculo |
|---|---|---|
| Nivel de adopción organizacional (E1) | 40 % | E1 / 5 |
| Profundidad funcional (E2) | 25 % | promedio de las 3 funciones más altas / 5 |
| Casos en producción (E3) | 15 % | 0 → 0 · 1 → 0.25 · 2–3 → 0.5 · 4–10 → 0.75 · >10 → 1 |
| Impacto medido (E5) | 10 % | métrica + magnitud = 1 · solo métrica = 0.5 · ninguna = 0 |
| Cobertura con licencia formal (E7) | 10 % | punto medio del rango / 100 |

Los pesos son una propuesta de trabajo; conviene probarlos con ~15 respuestas piloto y revisar que ordenen de forma razonable a personas que ya conocen (por ejemplo, a José y a ti).

### 4.3 Regla de shortlist de innovadores

| Nivel | Criterio |
|---|---|
| **A · Innovador** | Score canónico ≥ 70 **y** II ≥ 60 **y** E3 ≥ 2 casos **y** consentimiento a contacto (D3b) |
| **B · Emergente** | Score 50–69 **y** II ≥ 40 **y** consentimiento a contacto |
| **R · Referido** | Nombrado en F4 por ≥ 2 personas distintas (aunque no haya respondido) |

⚠️ **Todo es autorreporte.** Antes de invitar a alguien a un panel, validar con una llamada de 15 minutos (qué está en producción, qué se mide, quién lo usa). El score identifica candidatos; no certifica.

## 5. Diseño longitudinal

| Decisión | Recomendación | Razón |
|---|---|---|
| Cadencia | **Semestral** (ola 1: oct–nov 2026, antes o durante el evento; ola 2: abr–may 2027) | La adopción de IA cambia rápido; trimestral cansa a la comunidad |
| Estructura | **Núcleo fijo (70 ítems: D, Q1, T, Q3, Q4, E; no se reescribe) + módulo rotativo (≤ 8 ítems por ola)** | Comparabilidad + espacio para temas del momento (agentes, costos, regulación) |
| Llave de panel | Correo (guardado en tabla aparte, ver §6) | Permite medir cambio individual |
| Reportes por ola | (a) corte transversal; (b) cambio emparejado de quienes repiten (Δ score, transiciones de E1); (c) desgaste (quién deja de responder) | Evita confundir "la comunidad cambió" con "cambió quién responde" |
| Control de versiones | Registro de cambios con número de versión en cada respuesta (W2) | Un ítem modificado rompe la serie |
| Ola 1 | Es la **línea base**: no se interpreta como tendencia hasta tener la ola 2 | — |

## 6. Muestra, privacidad y gobierno de datos

**Muestra.** Hoy: 72 miembros del grupo de IA dentro de ~800 exalumnos en México. No conozco la tasa de respuesta esperable; planifica con un rango y mídela en la ola 1. Con ~10 grupos de industria y una respuesta de 25 %, saldrían ~20 respuestas por grupo en promedio, pero desiguales. Por eso:

- **Regla de publicación:** no reportar ningún corte (industria, tamaño, generación) con **n < 5**. Colapsar a ~10 grupos de industria (lista en D7).
- **Sesgo de autoselección:** quien responde sobre IA ya tiene interés en IA. Declararlo en cada reporte; el resultado describe a "quienes responden", no a los 800.
- **Referidos (F4)** sirve para encontrar innovadores que no contestan, pero cuenta como señal, no como dato de la persona referida.

**Privacidad (LFPDPPP, México).** Aviso de privacidad visible antes de la primera pregunta; consentimiento en 3 niveles (D3): (a) uso estadístico agregado, obligatorio; (b) contacto para invitaciones y eventos; (c) aparecer en el directorio de innovadores o ser propuesto como ponente. Guardar identidad/contacto en una tabla separada de las respuestas (seudonimización). *Verifica el texto vigente de la ley* (hubo una nueva LFPDPPP publicada en 2025) con tu asesoría legal.

**Gobierno y conflicto de interés — decisión que conviene tomar ahora.** Tú organizas el grupo y diriges una consultoría de IA. Para proteger la confianza de la comunidad:
1. Definir por escrito **quién es el responsable de los datos** (lo natural: el Club Harvard de México) y que Practical AI® actúe como encargado/analista.
2. Prohibir el uso comercial de los datos de contacto sin el consentimiento D3b/D3c.
3. Declarar en la invitación quién diseña y analiza el instrumento.

## 7. Decisiones abiertas (necesito tu respuesta)

1. **¿Quién es el responsable de los datos?** (Club vs. Practical AI®). Cambia el aviso de privacidad.
2. **¿Una versión o dos?** Recomiendo completa para el grupo de 72 y corta (~8 min) para los 800. El score canónico y el II se calculan igual en ambas.
3. **Plataforma:** Google Forms (compatible con tu Sheet v3.0 y el panel) vs. otra herramienta con lógica condicional (Typeform, Tally).
4. **¿Se anuncian los resultados con nombres de empresas?** Recomiendo que no, solo agregados por industria; los nombres solo con D3c.
5. **Pesos del II:** ¿ajustamos tras un piloto de ~15 respuestas?

## 8. Próximos pasos propuestos

| Paso | Responsable | Cuándo |
|---|---|---|
| Pegar redacción literal Q1/Q3/Q4/T desde el Sheet v3.0 en el banco de reactivos | Arturo | Esta semana |
| Revisar bloques E y F, y la lista de industrias | José y Joel | Esta semana |
| Armar el Form (completo + corto) y piloto con 10–15 personas | Arturo | Tras revisión |
| Lanzamiento al grupo de 72, luego a los ~800 | Joel (canales del Club) | Antes del evento |
| Dashboard por industria (reutilizando el panel AI Readiness) | Arturo | Con ola 1 cerrada |

---

## Anexo A · Banco de reactivos

| ID | Bloque | Texto / contenido | Escala | Origen | Corta |
|---|---|---|---|---|---|
| D1 | D · Perfil | Nombre completo | Texto | Nuevo | Sí |
| D2 | D · Perfil | Correo electrónico (llave de panel longitudinal) | Texto | v3.0 (adaptado) | Sí |
| D3 | D · Perfil | Consentimiento: (a) uso estadístico agregado [obligatorio]; (b) contacto para invitaciones y eventos; (c) aparecer en directorio de innovadores / ser propuesto como ponente | Casillas (a obligatoria) | Nuevo (adapta col 3) | Sí |
| D4 | D · Perfil | Programa Harvard y año de egreso (HBS, HKS, HLS, HSPH, GSD, GSE, FAS/GSAS, Extension, otro) | Lista + año | Nuevo | Sí |
| D5 | D · Perfil | Ciudad y país de residencia | Texto | v3.0 | Sí |
| D6 | D · Perfil | Empresa u organización (opcional) | Texto | v3.0 | Sí |
| D7 | D · Perfil | Industria principal (Servicios financieros y seguros / Servicios profesionales (legal, consultoría, contabilidad) / Salud, farmacéutica y biotecnología / Tecnología, software y telecomunicaciones / Manufactura e industria / Comercio, consumo y retail / Energía, infraestructura e inmobiliario / Educación, gobierno y organizaciones sociales / Medios, entretenimiento y turismo / Agro, transporte, logística y otros) y secundaria (opcional) | Lista (10 grupos; base SCIAN/INEGI) | Nuevo | Sí |
| D8 | D · Perfil | Tamaño de la organización (empleados): 1 · 2–10 · 11–50 · 51–250 · 251–1,000 · >1,000 | Opción única | Nuevo | Sí |
| D9 | D · Perfil | Tu posición: fundador/dueño · socio/C-level · director/VP · gerente · profesional independiente · académico/gobierno · otro | Opción única | v3.0 (adaptado) | Sí |
| D10 | D · Perfil | Función principal | Lista | v3.0 (adaptado) | Sí |
| D11 | D · Perfil | Años de experiencia profesional | Rangos | v3.0 (adaptado) | Sí |
| D12 | D · Perfil | Tu autoridad sobre decisiones de IA en tu organización | Opción única (v3.0) | v3.0 | Sí |
| Q1.1 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Explicar IA generativa | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.2alt | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Uso en el trabajo (últimos 30 días) | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.4 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Decidir con apoyo de IA | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.5 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Riesgos éticos/regulatorios | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.6 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Mi organización fomenta el uso | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.7 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Automatizar tareas | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.8 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Generativa vs. predictiva | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q1.9 | Q1 · Alfabetización | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Distinguir confiabilidad de una salida | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| T1 | T · Herramientas | Frecuencia de uso: ChatGPT | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T2 | T · Herramientas | Frecuencia de uso: Claude | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T3 | T · Herramientas | Frecuencia de uso: Gemini | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T4 | T · Herramientas | Frecuencia de uso: Grok | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T5 | T · Herramientas | Frecuencia de uso: Copilot | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T6 | T · Herramientas | Frecuencia de uso: Perplexity | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T7 | T · Herramientas | Frecuencia de uso: Midjourney/DALL-E | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T8 | T · Herramientas | Frecuencia de uso: Sora/Runway | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T9 | T · Herramientas | Frecuencia de uso: Manus | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T10 | T · Herramientas | Frecuencia de uso: ElevenLabs | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T11 | T · Herramientas | Frecuencia de uso: Make/Zapier/n8n | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T12 | T · Herramientas | Frecuencia de uso: Notion AI | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T13 | T · Herramientas | Frecuencia de uso: Abacus | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T14 | T · Herramientas | Frecuencia de uso: Consensus | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T15 | T · Herramientas | Frecuencia de uso: NotebookLM | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T16 | T · Herramientas | Frecuencia de uso (agentes): Cowork | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T17 | T · Herramientas | Frecuencia de uso (agentes): Code (Claude Code) | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T18 | T · Herramientas | Frecuencia de uso (agentes): Antigravity | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T19 | T · Herramientas | Frecuencia de uso (agentes): Genspark | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T20 | T · Herramientas | Frecuencia de uso (agentes): Cursor/Lovable/v0 | Frecuencia (escala v3.0: Nunca … Diario) | v3.0 literal | No |
| T21 | T · Herramientas | Frecuencia de uso: Codex / agentes de OpenAI | Frecuencia (escala v3.0: Nunca … Diario) | Nuevo | No |
| T22 | T · Herramientas | Frecuencia de uso: Herramientas verticales (p. ej. Harvey, Legora u otras de tu industria) | Frecuencia (escala v3.0: Nunca … Diario) | Nuevo | No |
| T23 | T · Herramientas | Frecuencia de uso: Plataformas de agentes empresariales (Copilot Studio, Gemini Enterprise, otras) | Frecuencia (escala v3.0: Nunca … Diario) | Nuevo | No |
| T24 | T · Herramientas | ¿Pagas alguna suscripción de IA? ¿Cuáles? (+ gasto mensual en rangos) | Sí/No + texto + rango | v3.0 (+ rango nuevo) | No |
| Q3.1 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Prompts avanzados | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.2 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Agentes/proyectos personalizados | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.3 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Integración (APIs, MCP, Make) | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.4 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: IA por voz | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.5 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Evaluación crítica de outputs | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.6 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Generativa/predictiva/agéntica | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q3.7 | Q3 · Habilidades avanzadas | [PEGAR REDACCIÓN LITERAL v3.0] Etiqueta canónica: Uso de agentes (Cowork, etc.) | Likert 1–5 (anclas v3.0) | v3.0 literal | Sí |
| Q4.1 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Estrategia | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.2 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Apoyo de dirección | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.3 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Procesos identificados | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.4 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Cultura de aprendizaje | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.5 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Datos listos | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.6 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Gobernanza/ética | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.7 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Competencia usa IA | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.8 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Presupuesto | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.9 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Política documentada | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| Q4.10 | Q4 · Contexto organizacional | [PEGAR REDACCIÓN Y ANCLAS LITERALES v3.0] Etiqueta canónica: Talento | 0–4 con anclas + 'No sé' | v3.0 literal | Sí |
| E1 | E · Implementación | Nivel de adopción de IA en tu organización: 0 No hay uso · 1 Uso individual informal · 2 Uso individual con política · 3 Pilotos en equipos · 4 Flujos en producción en ≥1 área, con métricas · 5 IA integrada en procesos core o en el producto, con gobernanza y medición continua | Opción única 0–5 | Nuevo | Sí |
| E2 | E · Implementación | Nivel de adopción por función (0–5, misma escala que E1; 'No aplica'): Legal y cumplimiento; Finanzas y contabilidad; Operaciones y cadena de suministro; Comercial y marketing; Atención a clientes; TI y desarrollo de software; Recursos humanos; Estrategia y dirección; Producto / I+D | Matriz función × 0–5 | Nuevo | Sí |
| E3 | E · Implementación | Número de flujos, agentes o sistemas con IA en operación regular: 0 · 1 · 2–3 · 4–10 · >10 | Opción única | Nuevo | Sí |
| E4 | E · Implementación | Describe en 2–3 líneas el caso de mayor impacto y la tecnología (chat comercial; agentes/automatización; API propia/RAG; modelos propios/ML; IA embebida en producto; otra) | Texto + casillas | Nuevo | Sí |
| E5 | E · Implementación | Métrica principal de impacto (horas, costo, ingresos, calidad/errores, tiempo de ciclo, satisfacción, ninguna) y magnitud (<5 % · 5–15 % · 15–30 % · >30 % · aún no medido) | Opción + rango | v3.0 (col 89, ampliado) | Sí |
| E6 | E · Implementación | Inversión anual de tu organización en IA (rangos en MXN) | Rangos | v3.0 | Sí |
| E7 | E · Implementación | % de empleados con acceso o licencia formal a IA: 0 · <10 · 10–30 · 30–60 · >60 | Opción única | Nuevo | Sí |
| E8 | E · Implementación | Horizonte de implementación de tus próximas iniciativas | Opción única (v3.0) | v3.0 | Sí |
| E9 | E · Implementación | Principales obstáculos para escalar (hasta 3): costo, talento, datos, seguridad/privacidad, regulación, cultura, claridad de casos, proveedor, tiempo | Casillas (máx. 3) | v3.0 (adaptado) | Sí |
| F1 | F · Innovación y red | ¿Has diseñado o liderado una implementación de IA que otros miembros deberían conocer? Sí · En curso · No | Opción única | Nuevo | Sí |
| F2 | F · Innovación y red | Si respondiste Sí/En curso: resume el caso en una línea e indica la industria | Texto | Nuevo | Sí |
| F3 | F · Innovación y red | Disposición a compartir: panel/keynote · caso de estudio (anonimizado o con nombre) · mentoría · sesión cerrada de trabajo · ninguna | Casillas | Nuevo | Sí |
| F4 | F · Innovación y red | ¿A quién recomendarías conocer por su uso o implementación de IA? Hasta 3 (nombre, empresa, industria, por qué) | Texto estructurado | Nuevo | Sí |
| F5 | F · Innovación y red | Qué buscas de la comunidad: proveedores confiables · benchmark de pares · talento · clientes · co-inversión · capacitación · regulación · otro | Casillas | Nuevo | Sí |
| F6 | F · Innovación y red | Qué puedes ofrecer a la comunidad | Casillas | Nuevo | Sí |
| F7 | F · Innovación y red | Visibilidad de tus respuestas: solo agregadas (por defecto) · permito que se me mencione | Opción única | Nuevo | Sí |
| G1 | G · Aprendizaje y dolor | Canales por los que te mantienes al día en IA | Casillas | v3.0 | No |
| G2 | G · Aprendizaje y dolor | Horas por semana que dedicas a aprender o probar IA | Rangos | v3.0 | No |
| G3 | G · Aprendizaje y dolor | Formato de aprendizaje preferido | Opción única | v3.0 | No |
| G4 | G · Aprendizaje y dolor | Tarea que más te gustaría automatizar (nombre) | Texto | v3.0 (1 de 3 tareas) | No |
| G5 | G · Aprendizaje y dolor | Tiempo que consume y frecuencia | Texto/rangos | v3.0 | No |
| G6 | G · Aprendizaje y dolor | Nivel de dolor (0–10) | 0–10 | v3.0 | No |
| W1 | W · Metadatos | Ola (p. ej. 2026-O) | Automático | Nuevo | auto |
| W2 | W · Metadatos | Versión del instrumento (v0.1 …) | Automático | Nuevo | auto |
| W3 | W · Metadatos | Canal de entrada (grupo IA · lista de 800 · referido) | Automático | Nuevo | auto |
| W4 | W · Metadatos | Código de referido | Automático | Nuevo | auto |

*Total de ítems con respuesta (sin W): 83; en versión corta: 53.*
