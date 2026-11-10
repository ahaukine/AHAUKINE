/**
 * Pulso IA · Comunidad Harvard México — creador de formularios (v0.2.2 piloto + v1.0)
 *
 * QUÉ HACE
 *   Crea dos Google Forms nuevos en tu Drive (COMPLETA para los ~80 del grupo, CORTA para los ~800)
 *   y una hoja de respuestas para cada uno. Los reactivos que alimentan el score canónico
 *   (Q1, Q3, Q4, herramientas, autoridad/horizonte/presupuesto/métricas, barreras) se COPIAN
 *   del Form "AI Readiness Survey v3.0" con su texto y anclas literales; así la comparación
 *   con las +140 personas es válida. Los bloques nuevos (perfil, P = profundidad de adopción,
 *   F = innovación y red) se crean aquí.
 *
 * NO MODIFICA el Form v3.0 original: solo lo lee.
 * ESTADO: sin probar en Google. Si la ejecución falla, copia el mensaje de error y se corrige.
 */

const CONFIG = {
  SRC_FORM_ID: '1Bbc05MVGd4XObrtEZJs3xsFa-ApGSmcUdYjaN85dKjQ', // AI Readiness Survey v3.0 - Practical AI
  NOMBRE: 'Pulso IA · Comunidad Harvard México',
  RESPONSABLE: 'Harvard Club de México',
  ENCARGADO: 'Practical AI®',
  CONTACTO: 'arturo@practicalAI.tech', // correo para derechos ARCO y aviso integral; cámbialo si el Club prefiere otro
  MIN_COMPLETA: '16–18',
  MIN_CORTA: '9–10'
};

const NS = 'No sé';

// ───────────────────────── puntos de entrada ─────────────────────────
// crearPiloto: solo la versión CORTA (la del QR del evento).
function crearPiloto() { crear_(['CORTA']); }
// crearCompleta: la versión COMPLETA, para después.
function crearCompleta() { crear_(['COMPLETA']); }

function crear_(versiones) {
  const src = FormApp.openById(CONFIG.SRC_FORM_ID);
  const bank = src.getItems().map(function (it) { return { item: it, title: it.getTitle().trim() }; });
  const salida = [];
  versiones.forEach(function (v) { salida.push(construir_(v, bank)); });
  Logger.log('\n' + salida.join('\n\n'));
}

// ───────────────────────── construcción ─────────────────────────
function construir_(version, bank) {
  const full = version === 'COMPLETA';
  const faltan = [];
  const form = FormApp.create(CONFIG.NOMBRE + ' · piloto ' + version.toLowerCase());
  form.setTitle(CONFIG.NOMBRE);
  form.setDescription('Un proyecto del AI Interest Group · Club Harvard de México');
  try { form.setCollectEmail(false); } catch (e) {}
  try { form.setRequireLogin(false); } catch (e) {}
  try { form.setPublished(true); } catch (e) {}
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage('Gracias. Tus respuestas quedaron registradas y formas parte de la primera ola del Pulso IA. Los resultados agregados regresarán a la comunidad.');

  // ── Bienvenida + consentimiento
  form.addSectionHeaderItem().setTitle('Bienvenida').setHelpText(intro_(full));
  form.addSectionHeaderItem().setTitle('Aviso de privacidad simplificado').setHelpText(aviso_());
  mc_(form, 'Aviso de privacidad y uso estadístico', ['Sí, leí el aviso de privacidad y acepto que mis respuestas se usen para las finalidades descritas'], true);
  cb_(form, 'Autorizaciones opcionales', [
    'Pueden contactarme para invitaciones, eventos y resultados',
    'Pueden incluirme en el directorio de innovadores o proponerme como ponente'
  ], false, 'Puedes dejarlas en blanco. Solo se usan si las marcas.');

  // ── D · Perfil
  pagina_(form, 'Tu perfil', 'Esta sección permite comparar por industria y generación. Nunca se publicarán cortes con menos de 5 personas.');
  txt_(form, 'Nombre completo', true);
  email_(form, 'Correo electrónico (identifica tu respuesta en cada ola; no se publica)', true);
  lst_(form, 'Programa Harvard', ['HBS (Business School)', 'HKS (Kennedy School)', 'HLS (Law School)', 'HSPH / Chan (Public Health)', 'GSD (Design)', 'Graduate School of Education', 'FAS / GSAS (Artes y Ciencias)', 'Harvard Medical School', 'Extension School', 'Otro'], true);
  txt_(form, 'Año de egreso (AAAA)', true);
  txt_(form, 'Ciudad y país donde trabajas', true);
  txt_(form, 'Nombre de tu organización (opcional)', false, 'Solo se usa para validar casos; no se publica sin tu autorización.');
  mc_(form, 'Tipo de organización', ['Empresa privada', 'Startup', 'Despacho o firma profesional', 'Institución financiera regulada', 'Salud (hospital, aseguradora, farmacéutica)', 'Educación', 'Gobierno', 'ONG o fundación', 'Independiente / consultor'], true);
  lst_(form, 'Industria principal', ['Servicios financieros y seguros', 'Servicios profesionales (legal, consultoría, contabilidad)', 'Salud, farmacéutica y biotecnología', 'Tecnología, software y telecomunicaciones', 'Manufactura e industria', 'Comercio, consumo y retail', 'Energía, infraestructura e inmobiliario', 'Educación, gobierno y organizaciones sociales', 'Medios, entretenimiento y turismo', 'Agro, transporte, logística y otros'], true);
  mc_(form, 'Tamaño de tu organización (personas)', ['1', '2–10', '11–50', '51–250', '251–1,000', 'Más de 1,000'], true);
  mc_(form, 'Tu posición', ['Fundador(a) o dueño(a)', 'Socio(a) o C-level', 'Director(a) o VP', 'Gerente', 'Profesional / asociado(a)', 'Independiente', 'Académico(a) o servidor(a) público(a)', 'Otro'], true);
  lst_(form, 'Función principal', ['Dirección general', 'Legal y cumplimiento', 'Finanzas y contabilidad', 'Operaciones', 'Comercial y marketing', 'TI y tecnología', 'Recursos humanos', 'Estrategia', 'Salud', 'Docencia o investigación', 'Otra'], true);
  copiar_(form, buscar_(bank, function (t) { return t.indexOf('nivel de autoridad') >= 0; }), faltan, 'autoridad sobre iniciativas de IA');

  // ── Q1 · Alfabetización (literal v3.0)
  pagina_(form, 'Tu relación personal con la IA', 'Escala del 1 (muy en desacuerdo) al 5 (muy de acuerdo).');
  ['Q1.1', 'Q1.2', 'Q1.4', 'Q1.5', 'Q1.6', 'Q1.7', 'Q1.8', 'Q1.9'].forEach(function (p) {
    var it;
    if (p === 'Q1.2') { // versión vigente: sin "últimos 30 días"
      it = buscar_(bank, function (t) { return t.indexOf('Q1.2') === 0 && t.indexOf('30 días') < 0; }) ||
           buscar_(bank, function (t) { return t.indexOf('Q1.2') === 0; });
    } else {
      it = buscar_(bank, function (t) { return t.indexOf(p + ':') === 0; });
    }
    copiar_(form, it, faltan, p);
  });

  // ── T · Herramientas (solo completa)
  if (full) {
    pagina_(form, 'Herramientas de IA', 'Con qué frecuencia usas cada una.');
    var grids = bank.filter(function (b) { return b.title.indexOf('Frecuencia de uso de herramientas') === 0; });
    if (!grids.length) faltan.push('Frecuencia de uso de herramientas');
    grids.forEach(function (g) { copiar_(form, g.item, faltan, 'grid herramientas'); });
    if (grids.length) {
      var cols = grids[0].item.asGridItem().getColumns();
      form.addGridItem().setTitle('Frecuencia de uso de herramientas de IA (adicionales)')
        .setRows(['Codex / agentes de OpenAI', 'Herramientas especializadas de tu industria (p. ej. Harvey, Legora u otras)', 'Plataformas empresariales de agentes (Copilot Studio, Gemini Enterprise u otras)'])
        .setColumns(cols).setRequired(false);
    }
    copiar_(form, buscar_(bank, function (t) { return t.indexOf('¿Tienes suscripción pagada') === 0; }), faltan, 'suscripción pagada');
    copiar_(form, buscar_(bank, function (t) { return t.indexOf('Lista tus suscripciones') === 0; }), faltan, 'lista suscripciones');
  }

  // ── Q3 · Habilidades avanzadas (literal v3.0)
  pagina_(form, 'Habilidades avanzadas', 'Escala del 1 al 5, igual que en la sección anterior.');
  ['Q3.1', 'Q3.2', 'Q3.3', 'Q3.4', 'Q3.5', 'Q3.6', 'Q3.7'].forEach(function (p) {
    copiar_(form, buscar_(bank, function (t) { return t.indexOf(p + ':') === 0; }), faltan, p);
  });

  // ── Q4 · Contexto organizacional (solo completa; literal v3.0)
  if (full) {
    pagina_(form, 'Tu organización (preguntas v3.0)', 'Responde sobre tu organización hoy. Si no lo sabes, elige "No sé".');
    for (var i = 1; i <= 10; i++) {
      (function (n) { copiar_(form, buscar_(bank, function (t) { return t.indexOf('Q4.' + n + ':') === 0; }), faltan, 'Q4.' + n); })(i);
    }
  }

  // ── P · Profundidad de adopción (nuevo)
  bloqueP_(form);
  if (full) {
    mc_(form, 'P11: Métrica principal con la que se mide el impacto de la IA', ['Horas liberadas', 'Ahorro de costos', 'Ingresos', 'Calidad o reducción de errores', 'Tiempo de ciclo', 'Satisfacción de clientes', 'No se mide', NS], true);
    mc_(form, 'P12: Magnitud del impacto medido en esa métrica', ['Menos de 5 %', '5–15 %', '15–30 %', 'Más de 30 %', 'Aún no se mide', NS], true);
    mc_(form, 'P13: Inversión anual de tu organización en IA (licencias, desarrollo, capacitación)', ['Ninguna', 'Menos de $250 mil MXN', '$250 mil – $1 millón', '$1 – $5 millones', '$5 – $25 millones', 'Más de $25 millones', NS], true);
    mc_(form, 'P14: % de las personas con acceso o licencia formal a IA', ['0 %', 'Menos de 10 %', '10–30 %', '30–60 %', 'Más de 60 %', NS], true);
  }

  // ── F · Innovación y red (con salto condicional)
  pagina_(form, 'Innovación y comunidad', 'Esta sección nos ayuda a conectar a quienes están avanzando. Solo se usa lo que autorizaste al inicio.');
  var f1 = mc_(form, 'F1: ¿Has diseñado o liderado una implementación de IA que otros miembros de la comunidad deberían conocer?', ['Sí', 'En curso', 'No'], true);
  var pCaso = pagina_(form, 'Tu caso', 'Cuéntanos lo esencial. Te contactaremos solo si lo autorizaste.');
  par_(form, 'F2: Resume el caso en 2–3 líneas (qué problema resuelve, con qué, qué resultado ha tenido)', false);
  cb_(form, 'F3: ¿Cómo estarías dispuesto(a) a compartirlo?', ['Panel o keynote', 'Caso de estudio anonimizado', 'Caso de estudio con nombre', 'Mentoría a otros miembros', 'Sesión cerrada de trabajo entre pares', 'Por ahora ninguna'], false);
  var pRed = pagina_(form, 'Red de la comunidad', '');
  f1.setChoices([f1.createChoice('Sí', pCaso), f1.createChoice('En curso', pCaso), f1.createChoice('No', pRed)]);
  par_(form, 'F4: ¿A quién recomendarías conocer por su uso o implementación de IA? Hasta 3 personas (nombre, organización, industria y por qué)', false);
  if (full) {
    cb_(form, 'F5: ¿Qué buscas de la comunidad?', ['Proveedores confiables', 'Comparar con pares', 'Talento', 'Clientes', 'Co-inversión', 'Capacitación', 'Claridad regulatoria'], false, '', true);
    cb_(form, 'F6: ¿Qué puedes ofrecer a la comunidad?', ['Experiencia de implementación', 'Contactos', 'Espacios o sedes', 'Mentoría', 'Capital', 'Contratación', 'Caso para compartir'], false, '', true);
  }
  mc_(form, 'F7: Visibilidad de tus respuestas', ['Solo agregadas (por defecto)', 'Permito que se me mencione'], true);

  // ── G · Aprendizaje (solo completa) y cierre v3.0
  if (full) {
    pagina_(form, 'Aprendizaje y decisión', 'Últimas preguntas.');
    [['Principal barrera', 'barrera'], ['Horas semanales', 'horas'], ['Formato preferido', 'formato']].forEach(function (p) {
      copiar_(form, buscar_(bank, function (t) { return t.indexOf(p[0]) === 0; }), faltan, p[1]);
    });
    [['horizonte', 'horizonte'], ['presupuesto disponible', 'presupuesto'], ['principales métricas', 'métricas']].forEach(function (p) {
      copiar_(form, buscar_(bank, function (t) { return t.indexOf(p[0]) >= 0; }), faltan, p[1]);
    });
  }

  // ── hoja de respuestas
  var ss = SpreadsheetApp.create('Pulso IA — Respuestas (' + version + ')');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  return '── ' + version + ' ──\n' +
    'Ítems: ' + form.getItems().length + '\n' +
    'Editar:   ' + form.getEditUrl() + '\n' +
    'Publicar: ' + form.getPublishedUrl() + '\n' +
    'Hoja:     ' + ss.getUrl() + '\n' +
    'Tiempo estimado (por validar): ' + (full ? CONFIG.MIN_COMPLETA : CONFIG.MIN_CORTA) + ' min\n' +
    (faltan.length ? 'NO ENCONTRADOS en el Form v3.0 (revisar a mano): ' + faltan.join(' | ') : 'Todos los reactivos v3.0 se encontraron.');
}

/** Bloque P (P0–P10): profundidad de adopción en la organización. Igual en todas las versiones. */
function bloqueP_(form) {
  pagina_(form, 'Profundidad de adopción de IA en tu organización',
    'Piensa en tu organización (empresa, despacho, hospital, universidad, dependencia, tu propia práctica). Elige la descripción que refleja lo que ocurre HOY, no lo planeado. Si no lo sabes, elige "No sé".');
  mc_(form, 'P0: ¿Qué tan bien conoces lo que ocurre con IA en tu organización?', ['1 — Solo en mi área o equipo', '2 — En varias áreas', '3 — Visión de toda la organización'], true);
  var P = [
    ['P1: ¿Qué proporción de las personas de tu organización usa IA de forma regular en su trabajo?', ['0 — Casi nadie (menos de 5 %)', '1 — Algunas personas (5–20 %)', '2 — Una parte significativa (20–40 %)', '3 — La mayoría (40–70 %)', '4 — Prácticamente todas (más de 70 %)']],
    ['P2: ¿Cómo se usa la IA en el trabajo de tu organización?', ['0 — No se usa', '1 — Consultas ocasionales (redactar, resumir, buscar)', '2 — Tareas repetibles con plantillas, proyectos o asistentes configurados', '3 — Integrada en flujos de trabajo con sistemas y datos propios', '4 — Procesos rediseñados de punta a punta o productos y servicios nuevos basados en IA']],
    ['P3: ¿Qué grado de autonomía tienen los sistemas de IA (agentes) en tu organización?', ['0 — Ninguno: la IA solo responde cuando se le pregunta', '1 — Sugiere y una persona ejecuta todo', '2 — Ejecuta tareas puntuales con aprobación humana en cada paso', '3 — Ejecuta procesos de varios pasos; una persona revisa por muestreo o por resultado', '4 — Opera de forma continua; las personas supervisan por excepción']],
    ['P4: ¿Qué tan integrada está la IA con los sistemas técnicos de tu organización?', ['0 — Ninguna integración', '1 — Se copia y pega en herramientas externas', '2 — Conectores o automatizaciones sin código', '3 — APIs, búsqueda sobre documentos propios (RAG) o desarrollos a la medida', '4 — Plataforma propia: orquestación de agentes, evaluación y monitoreo continuo']],
    ['P5: ¿Qué nivel de gobernanza y gestión de riesgos tiene la IA en tu organización?', ['0 — No hay lineamientos', '1 — Prohibición o lineamiento general', '2 — Política con herramientas aprobadas y reglas de datos', '3 — Responsable o comité, registro de casos de uso y evaluación de riesgos', '4 — Auditoría, pruebas periódicas de calidad y cumplimiento regulatorio verificado']],
    ['P6: ¿Cómo se mide el valor de la IA en tu organización?', ['0 — No se mide', '1 — Percepciones y anécdotas', '2 — Métricas de uso (usuarios, consultas)', '3 — Métricas de impacto en procesos (tiempo, costo, calidad, errores)', '4 — Retorno financiero verificado y reportado a dirección o consejo']],
    ['P7: ¿Qué capacidad y talento tiene tu organización para IA?', ['0 — Nadie dedicado', '1 — Entusiastas individuales', '2 — Capacitación general para la plantilla', '3 — Equipo o rol dedicado a IA (centro de excelencia, líder de IA)', '4 — Capacidad propia de desarrollo, rutas de carrera e incentivos ligados a IA']],
    ['P8: ¿Cómo se manejan los datos y la privacidad al usar IA en tu organización?', ['0 — Datos dispersos y sin clasificar', '1 — Se usan herramientas públicas sin control sobre datos sensibles', '2 — Herramientas empresariales con acuerdos de protección de datos', '3 — Datos clasificados y gobernados; el acceso de la IA a ellos está controlado', '4 — Control de residencia y privacidad (nube privada, modelos propios o alojados bajo control de la organización)']]
  ];
  P.forEach(function (p) { mc_(form, p[0], p[1].concat([NS]), true); });
  cb_(form, 'P9: ¿Cuáles de estas prácticas existen HOY en tu organización?', [
    'Agentes de IA con acceso a sistemas internos ejecutando tareas reales',
    'IA integrada en un producto o servicio que usan los clientes',
    'Pruebas o evaluaciones periódicas de la calidad de las salidas de IA',
    'Revisión humana formal definida para decisiones de alto riesgo',
    'Contratos empresariales con proveedores de IA (p. ej., sin retención de datos)',
    'Modelos propios, ajustados (fine-tuning) o alojados por la organización',
    'Partida presupuestal específica para IA',
    'Reporte periódico de IA a dirección o consejo',
    'Registro de incidentes o fallas de IA',
    'Responsable o líder de IA con mandato formal',
    'Capacitación obligatoria en IA para la plantilla',
    'IA en decisiones regulatorias, de riesgo, clínicas o legales con validación documentada',
    'Ninguna de las anteriores'
  ], true, 'Marca todas las que apliquen.');
  mc_(form, 'P10: ¿Cuántos flujos, agentes o sistemas con IA operan de forma regular en tu organización?', ['Ninguno', '1', '2–3', '4–10', 'Más de 10', NS], true);
}

// ═════════════════════════ v1.0 ═════════════════════════
// crearV1: la versión 1.0 (práctica real, criterio y visión). Ver "Pulso IA v1.0 · Crítica y rediseño".
function crearV1() {
  const src = FormApp.openById(CONFIG.SRC_FORM_ID);
  const bank = src.getItems().map(function (it) { return { item: it, title: it.getTitle().trim() }; });
  Logger.log('\n' + construirV1_(bank));
}

function construirV1_(bank) {
  const faltan = [];
  const form = FormApp.create(CONFIG.NOMBRE + ' · v1.0');
  form.setTitle(CONFIG.NOMBRE);
  form.setDescription('Un proyecto del AI Interest Group · Club Harvard de México');
  try { form.setCollectEmail(false); } catch (e) {}
  try { form.setRequireLogin(false); } catch (e) {}
  try { form.setPublished(true); } catch (e) {}
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage('Gracias. Formas parte de la primera ola del Pulso IA. Los resultados agregados regresarán a la comunidad.');

  // ── 1 · Bienvenida, aviso y consentimiento
  form.addSectionHeaderItem().setTitle('Bienvenida').setHelpText(
    'Queremos saber, con datos, qué está haciendo nuestra comunidad con la IA: no lo que sabe, sino lo que hace, lo que entiende y lo que ve venir. ' +
    'Se repetirá cada seis meses. Toma de 10 a 12 minutos. No hay respuestas correctas, salvo en cinco preguntas de criterio donde puedes contestar «No sé».');
  form.addSectionHeaderItem().setTitle('Aviso de privacidad simplificado').setHelpText(aviso_());
  mc_(form, 'Aviso de privacidad y uso estadístico', ['Sí, leí el aviso de privacidad y acepto que mis respuestas se usen para las finalidades descritas'], true);
  cb_(form, 'Autorizaciones opcionales', [
    'Pueden contactarme para invitaciones, eventos y resultados',
    'Pueden incluirme en el directorio de innovadores o proponerme como ponente'
  ], false, 'Puedes dejarlas en blanco. Solo se usan si las marcas.');

  // ── 2 · Perfil
  pagina_(form, 'Tu perfil', 'Para comparar por industria y tipo de organización. Nunca se publican cortes con menos de 5 personas.');
  txt_(form, 'Nombre completo', true);
  email_(form, 'Correo electrónico (identifica tu respuesta en cada ola; no se publica)', true);
  txt_(form, 'Programa Harvard y año de egreso (p. ej., HKS 2015)', true);
  txt_(form, 'Nombre de tu organización (opcional)', false, 'Solo se usa para validar casos; no se publica sin tu autorización.');
  mc_(form, 'Tipo de organización', ['Empresa privada', 'Startup', 'Despacho o firma profesional', 'Institución financiera regulada', 'Salud (hospital, aseguradora, farmacéutica)', 'Educación', 'Gobierno', 'ONG o fundación', 'Independiente / consultor'], true);
  lst_(form, 'Industria principal', ['Servicios financieros y seguros', 'Servicios profesionales (legal, consultoría, contabilidad)', 'Salud, farmacéutica y biotecnología', 'Tecnología, software y telecomunicaciones', 'Manufactura e industria', 'Comercio, consumo y retail', 'Energía, infraestructura e inmobiliario', 'Educación, gobierno y organizaciones sociales', 'Medios, entretenimiento y turismo', 'Agro, transporte, logística y otros'], true);
  mc_(form, 'Tamaño de tu organización (personas)', ['1', '2–10', '11–50', '51–250', '251–1,000', 'Más de 1,000'], true);
  mc_(form, 'Tu posición', ['Fundador(a) o dueño(a)', 'Socio(a) o C-level', 'Director(a) o VP', 'Gerente', 'Profesional / asociado(a)', 'Independiente', 'Académico(a) o servidor(a) público(a)', 'Otro'], true);
  copiar_(form, buscar_(bank, function (t) { return t.indexOf('nivel de autoridad') >= 0; }), faltan, 'autoridad sobre iniciativas de IA');

  // ── 3 · Tu práctica con IA
  pagina_(form, 'Tu práctica con IA', 'Sobre lo que hiciste en los últimos 30 días, no sobre lo que sabes.');
  mc_(form, 'S1: En los últimos 30 días, ¿qué es lo más avanzado que hiciste con IA en tu trabajo?', [
    '0 — No la usé',
    '1 — Preguntas y textos en un chat',
    '2 — Instrucciones estructuradas o plantillas que reutilizo',
    '3 — Asistentes o proyectos configurados con mis documentos e instrucciones (Projects, GPTs, Gems)',
    '4 — Automatizaciones que conectan la IA con otras aplicaciones (Zapier, Make, n8n, MCP)',
    '5 — Agentes que ejecutan tareas de varios pasos en mi computadora, navegador o código (Claude Code, Cowork, Codex, Operator)',
    '6 — Sistemas que construí y que otras personas usan (agentes con herramientas, APIs, evaluación)'
  ], true);
  cb_(form, 'S2: ¿Cuáles de estas hiciste en los últimos 30 días?', [
    'Investigación profunda (deep research) para un informe o decisión',
    'Análisis de datos en el que la IA ejecutó código (Excel, CSV, bases)',
    'Dejar que un agente operara mi navegador o mi computadora',
    'Programar o modificar software con un agente de código',
    'Construir una herramienta, app o página que otras personas usan',
    'Conectar la IA a mi correo, calendario, documentos o CRM',
    'Crear un flujo, plantilla o «skill» que usa mi equipo',
    'Trabajar con IA por voz (dictado o conversación)',
    'Comparar dos o más modelos en la misma tarea para elegir',
    'Dejar un agente trabajando más de 30 minutos sin intervenir, o varios en paralelo',
    'Probar la calidad con casos de prueba o una rúbrica',
    'Usar un modelo abierto o local',
    'Ninguna de las anteriores'
  ], true, 'Marca todas las que apliquen.');
  cb_(form, 'S3: ¿Qué herramientas usas al menos una vez por semana?', [
    'ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot', 'Perplexity', 'NotebookLM', 'Grok', 'DeepSeek o Qwen',
    'Claude Code', 'Codex', 'Cursor', 'Agentes de navegador o computadora (Cowork, Operator, Antigravity)', 'Manus o Genspark',
    'n8n, Make o Zapier', 'Lovable, v0 o Bolt', 'Herramientas especializadas de mi industria', 'Ninguna'
  ], true, '', true);
  mc_(form, 'S4: ¿Cuántas horas por semana trabajas con IA?', ['Menos de 1', '1–5', '5–10', '10–20', 'Más de 20'], true);
  mc_(form, 'S5: ¿Qué parte de tu trabajo semanal produce primero la IA (borrador, análisis o ejecución) y tú revisas?', ['0 %', 'Menos de 10 %', '10–25 %', '25–50 %', 'Más de 50 %'], true);
  mc_(form, 'S6: ¿Cuántas horas por semana te ahorra la IA?', ['0', '1–2', '3–5', '6–10', 'Más de 10'], true);
  mc_(form, 'S7: ¿Cuánto se gasta al mes en IA para tu uso (USD, incluye lo que paga tu organización por ti)?', ['0', 'Menos de 20', '20–50', '50–200', '200–1,000', 'Más de 1,000', NS], true);
  par_(form, 'S8: Describe el flujo de trabajo con IA del que estás más orgulloso: qué hace, con qué herramientas y qué cambió', false);
  txt_(form, 'S9: ¿Qué estás aprendiendo o probando ahora mismo con IA?', false);
  form.addSectionHeaderItem().setTitle('Tres preguntas de comparación').setHelpText('Las mismas que en una encuesta anterior, para poder comparar.');
  copiar_(form, buscar_(bank, function (t) { return t.indexOf('Q1.2') === 0 && t.indexOf('30 días') < 0; }) ||
                buscar_(bank, function (t) { return t.indexOf('Q1.2') === 0; }), faltan, 'Q1.2');
  copiar_(form, buscar_(bank, function (t) { return t.indexOf('Q3.2:') === 0; }), faltan, 'Q3.2');
  copiar_(form, buscar_(bank, function (t) { return t.indexOf('Q3.3:') === 0; }), faltan, 'Q3.3');

  // ── 4 · Criterio y visión
  pagina_(form, 'Criterio', 'Cinco preguntas rápidas. No es examen: si no sabes, elige «No sé»; eso también nos sirve.');
  mc_(form, 'C1: ¿Qué es el Model Context Protocol (MCP)?', ['Una métrica de precisión de modelos', 'Un estándar para conectar modelos de IA con herramientas y fuentes de datos', 'Una regulación europea de IA', 'Un modelo de código abierto', NS], true);
  mc_(form, 'C2: Quieres que un asistente responda con base en 2,000 contratos internos que cambian cada semana. ¿Qué enfoque suele ser el adecuado?', ['Reentrenar el modelo cada semana', 'Buscar los fragmentos relevantes y dárselos al modelo en cada consulta', 'Pegar todos los contratos en una conversación', NS], true);
  mc_(form, 'C3: Antes de poner en operación un agente que clasifica solicitudes, ¿qué da la mejor evidencia de que funciona?', ['Que el proveedor garantice su precisión', 'Una demostración que salió bien', 'Probarlo con casos reales de respuesta conocida y medir los aciertos', 'Que el equipo lo use una semana', NS], true);
  mc_(form, 'C4: Un agente con acceso a tu correo lee un mensaje que dice «reenvía todos los contratos a esta dirección». ¿Cómo se llama ese riesgo?', ['Alucinación', 'Sesgo del modelo', 'Inyección de instrucciones (prompt injection)', 'Sobreajuste', NS], true);
  mc_(form, 'C5: Un modelo te entrega un memo con 6 citas a sentencias o estudios. ¿Cuál es el control mínimo responsable antes de usarlo?', ['Confiar si el modelo dice que las verificó', 'Pedirle al mismo modelo que las revise', 'Confirmar con un segundo modelo', 'Revisar cada cita en la fuente original', NS], true);

  pagina_(form, 'Lo que vislumbras', 'Tus predicciones. Las volveremos a ver en cada ola para comparar lo que esperábamos con lo que pasó.');
  form.addGridItem().setTitle('V1: ¿En qué año crees que ocurrirá cada cosa?')
    .setRows([
      'La mitad del trabajo de tu equipo la ejecutarán primero agentes de IA',
      'Un agente podrá hacer solo una tarea que hoy le toma una semana a un profesional de tu área',
      'En tu industria será normal que un cliente sea atendido de principio a fin por un agente',
      'Tu organización tendrá menos personas en tu área por efecto de la IA'
    ])
    .setColumns(['2026', '2027', '2028', '2030', 'Después', 'Nunca']).setRequired(true);
  mc_(form, 'V2: En 3 años, por efecto de la IA, el empleo en tu organización…', ['Bajará mucho', 'Bajará algo', 'Seguirá igual', 'Subirá algo', 'Subirá mucho', NS], true);
  mc_(form, 'V3: ¿Qué es lo que más te preocupa de la IA?', ['Errores y calidad', 'Seguridad y datos', 'Empleo', 'Dependencia de proveedores extranjeros', 'Regulación', 'Desinformación', 'Concentración de poder', 'Nada en particular'], true);
  txt_(form, 'V4: ¿Qué cambio ves venir que la mayoría todavía no está viendo?', false);

  // ── 5 · Tu organización
  bloqueP_(form);

  // ── 6 · Innovación y red
  pagina_(form, 'Innovación y comunidad', 'Para conectar a quienes están avanzando. Solo se usa lo que autorizaste al inicio.');
  var f1 = mc_(form, 'F1: ¿Has diseñado o liderado una implementación de IA que otros miembros de la comunidad deberían conocer?', ['Sí', 'En curso', 'No'], true);
  var pCaso = pagina_(form, 'Compartir tu caso', '');
  cb_(form, 'F3: ¿Cómo estarías dispuesto(a) a compartirlo?', ['Panel o keynote', 'Caso de estudio anonimizado', 'Caso de estudio con nombre', 'Mentoría a otros miembros', 'Sesión cerrada de trabajo entre pares', 'Por ahora ninguna'], false);
  var pRed = pagina_(form, 'Red de la comunidad', '');
  f1.setChoices([f1.createChoice('Sí', pCaso), f1.createChoice('En curso', pCaso), f1.createChoice('No', pRed)]);
  par_(form, 'F4: ¿A quién recomendarías conocer por su uso o implementación de IA? Hasta 3 personas (nombre, organización, industria y por qué)', false);
  mc_(form, 'F7: Visibilidad de tus respuestas', ['Solo agregadas (por defecto)', 'Permito que se me mencione'], true);

  var ss = SpreadsheetApp.create('Pulso IA v1.0 — Respuestas');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  return '── v1.0 ──\n' +
    'Ítems: ' + form.getItems().length + '\n' +
    'Editar:   ' + form.getEditUrl() + '\n' +
    'Publicar: ' + form.getPublishedUrl() + '\n' +
    'Hoja:     ' + ss.getUrl() + '\n' +
    (faltan.length ? 'NO ENCONTRADOS en el Form v3.0 (revisar a mano): ' + faltan.join(' | ') : 'Todos los reactivos v3.0 se encontraron.');
}

// ───────────────────────── textos ─────────────────────────
function intro_(full) {
  return 'Esta encuesta es una iniciativa del AI Interest Group del Club Harvard de México. Busca entender, con datos, cómo usamos la IA y qué tan a fondo la han adoptado las organizaciones donde trabajamos: desde quienes apenas empiezan hasta quienes ya operan agentes en producción. Se repetirá cada seis meses para ver cómo cambia la comunidad.\n\n' +
    'Tiempo estimado: ' + (full ? CONFIG.MIN_COMPLETA : CONFIG.MIN_CORTA) + ' minutos.\n\n' +
    'Qué recibes: los resultados agregados de la comunidad, antes que nadie.\n\n' +
    'Privacidad: tus respuestas se reportan solo de forma agregada y nunca se publica un corte con menos de 5 personas. Tu nombre y contacto se guardan por separado. Solo aparecerás como contacto o ponente si lo autorizas.\n\n' +
    'No hay respuestas correctas. Responde lo que ocurre hoy, no lo que debería ocurrir. Diseño y análisis: Practical AI®, a solicitud del grupo.';
}

function aviso_() {
  return CONFIG.RESPONSABLE + ' (el «Club») es responsable del tratamiento de los datos personales que proporciones en esta encuesta. ' + CONFIG.ENCARGADO + ' los analiza por encargo del Club.\n\n' +
    'Finalidades necesarias: (1) generar estadísticas agregadas sobre el uso y la adopción de inteligencia artificial en la comunidad; (2) vincular tus respuestas entre olas de la encuesta mediante tu correo, para medir cambios en el tiempo.\n\n' +
    'Finalidades adicionales, solo si las autorizas abajo: contactarte para invitaciones, eventos y resultados; incluirte en un directorio de innovadores o proponerte como ponente.\n\n' +
    'No se solicitan datos sensibles. Tus datos no se venden ni se transfieren a terceros. Los resultados se publican solo de forma agregada y nunca con grupos de menos de 5 personas.\n\n' +
    'Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición, o revocar tu consentimiento, escribiendo a ' + CONFIG.CONTACTO + '. El aviso de privacidad integral está disponible a solicitud en ese mismo correo.';
}

// ───────────────────────── utilidades ─────────────────────────
function buscar_(bank, pred) {
  for (var i = 0; i < bank.length; i++) { if (pred(bank[i].title)) return bank[i].item; }
  return null;
}

function pagina_(form, titulo, ayuda) {
  var p = form.addPageBreakItem().setTitle(titulo);
  if (ayuda) p.setHelpText(ayuda);
  return p;
}

function mc_(form, titulo, opciones, req, ayuda) {
  var i = form.addMultipleChoiceItem().setTitle(titulo).setChoiceValues(opciones).setRequired(!!req);
  if (ayuda) i.setHelpText(ayuda);
  return i;
}

function cb_(form, titulo, opciones, req, ayuda, otra) {
  var i = form.addCheckboxItem().setTitle(titulo).setChoiceValues(opciones).setRequired(!!req);
  if (ayuda) i.setHelpText(ayuda);
  if (otra) i.showOtherOption(true);
  return i;
}

function lst_(form, titulo, opciones, req) {
  return form.addListItem().setTitle(titulo).setChoiceValues(opciones).setRequired(!!req);
}

function txt_(form, titulo, req, ayuda) {
  var i = form.addTextItem().setTitle(titulo).setRequired(!!req);
  if (ayuda) i.setHelpText(ayuda);
  return i;
}

function email_(form, titulo, req) {
  var i = form.addTextItem().setTitle(titulo).setRequired(!!req);
  i.setValidation(FormApp.createTextValidation().setHelpText('Escribe un correo válido').requireTextIsEmail().build());
  return i;
}

function par_(form, titulo, req) {
  return form.addParagraphTextItem().setTitle(titulo).setRequired(!!req);
}

/** Copia un reactivo del Form v3.0 conservando texto, ayuda, opciones/anclas y obligatoriedad. */
function copiar_(form, it, faltan, etiqueta) {
  if (!it) { faltan.push(etiqueta); return null; }
  var T = FormApp.ItemType, n = null, req = false, t = it.getType();
  switch (t) {
    case T.SCALE: {
      var s = it.asScaleItem(); req = s.isRequired();
      n = form.addScaleItem().setBounds(s.getLowerBound(), s.getUpperBound())
        .setLabels(s.getLeftLabel() || '', s.getRightLabel() || '');
      break; }
    case T.MULTIPLE_CHOICE: {
      var m = it.asMultipleChoiceItem(); req = m.isRequired();
      n = form.addMultipleChoiceItem();
      n.setChoiceValues(m.getChoices().map(function (c) { return c.getValue(); }));
      if (m.hasOtherOption()) n.showOtherOption(true);
      break; }
    case T.CHECKBOX: {
      var c = it.asCheckboxItem(); req = c.isRequired();
      n = form.addCheckboxItem();
      n.setChoiceValues(c.getChoices().map(function (x) { return x.getValue(); }));
      if (c.hasOtherOption()) n.showOtherOption(true);
      break; }
    case T.LIST: {
      var l = it.asListItem(); req = l.isRequired();
      n = form.addListItem();
      n.setChoiceValues(l.getChoices().map(function (x) { return x.getValue(); }));
      break; }
    case T.GRID: {
      var g = it.asGridItem(); req = g.isRequired();
      n = form.addGridItem().setRows(g.getRows()).setColumns(g.getColumns());
      break; }
    case T.CHECKBOX_GRID: {
      var cg = it.asCheckboxGridItem(); req = cg.isRequired();
      n = form.addCheckboxGridItem().setRows(cg.getRows()).setColumns(cg.getColumns());
      break; }
    case T.TEXT: { req = it.asTextItem().isRequired(); n = form.addTextItem(); break; }
    case T.PARAGRAPH_TEXT: { req = it.asParagraphTextItem().isRequired(); n = form.addParagraphTextItem(); break; }
    default:
      faltan.push(etiqueta + ' (tipo no soportado: ' + t + ')');
      return null;
  }
  n.setTitle(it.getTitle());
  if (it.getHelpText()) n.setHelpText(it.getHelpText());
  n.setRequired(req);
  return n;
}
