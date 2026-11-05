(() => {
  'use strict';
  const svg = document.getElementById('repoops-atlas');
  if (!svg) return;
  const Z = document.getElementById('zones'), E = document.getElementById('edges');
  const N = document.getElementById('nodes'), L = document.getElementById('labels');
  const status = document.getElementById('atlas-status'), card = document.getElementById('atlas-card');
  const textView = document.getElementById('atlas-text-view'), textToggle = document.getElementById('toggle-text-view');
  const NS = 'http://www.w3.org/2000/svg';
  // Retain the original SVG viewer, visual components and edge geometry. The
  // published layout is fixed; no v1 design mode or personal positions are read.
  const DATA = {
    view: {x: 0, y: 40, w: 1810, h: 1010},
    zones: [
      ['zone-feature', 18, 65, 1772, 170, 'SDD · RUTA FUNCIONAL INICIAL', 'Referencia del framework. La variante, los gates y sus retornos concretos siguen en definición para RepoOps.'],
      ['zone-artifacts', 18, 280, 1772, 270, 'CLIENTES EXTERNOS · PREPARAN Y REVISAN EL TRABAJO', 'Cognición fuera del motor. Pre-SDD es opcional; no se exige una seed adoptada.'],
      ['zone-engine', 18, 590, 1772, 420, 'REPOOPS · GOBIERNA LA OPERACIÓN Y SU EFECTO', 'Responsabilidades integrables. Este mapa no prescribe servicios, objetos, transportes ni una cadena de contratos.']
    ],
    defs: {}, baseEdges: [], info: {}
  };
  function node(id, x, y, w, h, type, kicker, title, note, info) {
    DATA.defs[id] = {x, y, w, h, type, kicker, title, note};
    DATA.info[id] = info;
  }
  const phases = [
    ['design', 'DESIGN', 'diseño y límites', 'Describe el cambio y las decisiones de diseño.'],
    ['spec', 'SPEC', 'comportamiento esperado', 'Concreta el comportamiento y los requisitos que se deben comprobar.'],
    ['validation', 'VALIDATION', 'revisión de la especificación', 'Revisa la especificación según las condiciones de la ruta SDD.'],
    ['tasks', 'TASKS', 'trabajo acotado', 'Descompone el trabajo previsto y sus límites.'],
    ['implementation', 'IMPLEMENT', 'preparación del candidato', 'Produce el material candidato con las herramientas del cliente.'],
    ['verify', 'VERIFY', 'comprobaciones requeridas', 'Contrasta el candidato con los requisitos aplicables.'],
    ['audit', 'AUDIT', 'revisión y hallazgos', 'Aporta la revisión requerida por la ruta concreta.'],
    ['closed', 'ARCHIVE', 'cierre del ciclo', 'Conserva el cierre y las referencias del recorrido SDD.']
  ];
  phases.forEach(([id, title, note, summary], i) => node(id, 70 + i * 210, 128, 180, 76,
    ['validation', 'audit'].includes(id) ? 'gate' : id === 'implementation' ? 'implementation' : id === 'closed' ? 'close' : 'phase',
    'SDD FRAMEWORK', title, note, {
      kind: 'REFERENCIA DEL FRAMEWORK', status: 'SDD Framework · open source', summary,
      caps: [['Ámbito', 'Ciclo de trabajo'], ['RepoOps nuevo', 'Integración por demostrar']],
      receives: ['Material y requisitos pertinentes de la funcionalidad.'],
      produces: ['Documentos o resultados de la etapa, según el framework y la ruta aplicable.'],
      does: ['Este recorrido de referencia no fija el momento del commit ni la autoridad de estado del nuevo motor.', 'La variante, los gates y los retornos concretos del primer producto siguen en definición.', 'Una etapa SDD no concede permisos técnicos sobre Git.'], sdd: true
    }));
  node('architect', 70, 350, 360, 86, 'wrapper-ai', 'CLIENTE EXTERNO', 'Architect', 'diseño · especificación · preparación', {
    kind: 'COGNICIÓN FUERA DEL MOTOR', status: 'Dirección adoptada · cliente externo',
    summary: 'Architect prepara el trabajo y puede utilizar herramientas para ejecutar órdenes o pruebas. Su harness y su cognición quedan fuera de RepoOps.',
    caps: [['Modelo y herramientas', 'Los elige el usuario'], ['Permisos', 'Los limita el entorno']],
    receives: ['Objetivo del usuario, proyecto y contexto pertinentes.'],
    produces: ['Peticiones, documentación, material e informes para el recorrido.'],
    does: ['No se convierte en un wrapper cognitivo interno del motor.', 'Su configuración editable o su nombre de rol no conceden admisión.', 'Pre-SDD es opcional; no exige ACULL/ADOPTA ni una seed adoptada.']
  });
  node('implementer', 610, 350, 360, 86, 'wrapper-write', 'CLIENTE EXTERNO', 'Implementador', 'edición · pruebas · material candidato', {
    kind: 'PREPARACIÓN DEL MATERIAL', status: 'Dirección adoptada · cliente externo',
    summary: 'Una persona o un agente prepara cambios sobre una base identificada. La copia editable puede seguir evolucionando; el material de cada operación debe quedar fijado para su comprobación.',
    caps: [['Trabajo', 'Copia editable'], ['Material comprobado', 'Candidato fijado']],
    receives: ['Base identificada, requisitos y límites del trabajo.'],
    produces: ['Material candidato y los informes que correspondan.'],
    does: ['Una edición posterior no puede alterar el candidato que se está comprobando.', 'El permiso para preparar un cambio no equivale a permiso para incorporarlo.', 'No se exige un harness, catálogo de modelos ni pin cognitivo interno.']
  });
  node('reviewers', 1150, 350, 360, 86, 'wrapper-ai', 'CLIENTES EXTERNOS', 'Revisores externos', 'informes sobre material identificado', {
    kind: 'REVISIÓN EXTERNA CUANDO PROCEDA', status: 'Dirección adoptada · condiciones por concretar',
    summary: 'Los revisores aportan informes sobre el candidato y los requisitos del gate aplicable. El cliente puede transportar esos informes manualmente o con sus herramientas disponibles.',
    caps: [['Encargo', 'Candidato y requisitos'], ['Independencia', 'No acreditada por el canal']],
    receives: ['Material identificado y un encargo de revisión acotado.'],
    produces: ['Informe, hallazgos y límites de la revisión.'],
    does: ['Recibir un informe externo no autentica el modelo ni acredita independencia o calidad.', 'Un informe no se transforma por sí solo en prueba ejecutada o admisión.', 'El motor no necesita lanzar un harness cognitivo ni gestionar una flota de revisores.']
  });
  node('material', 70, 470, 1440, 58, 'artifact', 'MATERIAL APORTADO POR EL CLIENTE', 'Petición, documentos, cambios e informes', 'Referencias necesarias del repositorio, la base y el material · sin cadena universal de identidades', {
    kind: 'FRONTERA CLIENTE–MOTOR', status: 'Dirección adoptada · contrato concreto en definición',
    summary: 'RepoOps recibe una operación explícita y material al que poder atribuir las comprobaciones. La conversación puede prepararlos, pero no sustituye su alcance ni sus condiciones.',
    caps: [['Referencias', 'Las necesarias para la operación'], ['Formato de entrada', 'Por concretar']],
    receives: ['Documentación SDD, cambios e informes preparados fuera del motor.'],
    produces: ['Material presentado para su admisión y comprobación.'],
    does: ['No impone capability_id, reservation_id, transaction_id ni un servicio de identidad humana.', 'La aplicabilidad de un patch no demuestra por sí sola que la base sea la correcta.', 'No fija un Feature Record nuevo como autoridad central de estado.']
  });
  node('request', 70, 680, 240, 86, 'control', 'PETICIÓN', 'Qué se solicita', 'operación · target · límites', {
    kind: 'RESPONSABILIDAD DEL CORE', status: 'Core mínimo vigente · diseño adoptado',
    summary: 'La petición concreta qué operación se solicita, sobre qué repositorio o ref y con qué material, precondiciones y límites relevantes.',
    caps: [['Autor de la petición', 'Persona o agente'], ['Representación', 'Propia del producto']],
    receives: ['Operación, target, base y material pertinentes.'],
    produces: ['Una petición explícita que el dominio puede admitir o rechazar.'],
    does: ['Solicitar no equivale a ser admitido.', 'No obliga a crear un objeto o servicio separado.', 'Un cambio material del alcance exige revisar la admisión.']
  });
  node('admission', 410, 680, 240, 86, 'helper', 'ADMISIÓN', 'Qué se permite', 'permisos · alcance · condiciones', {
    kind: 'RESPONSABILIDAD DEL CORE', status: 'Core mínimo vigente · diseño adoptado',
    summary: 'El dominio comprueba los permisos técnicos, el alcance y las condiciones aplicables antes del efecto. La aprobación humana se solicita solo cuando la política concreta la requiere.',
    caps: [['Permisos', 'Aplicados técnicamente'], ['Asentimiento humano', 'Condicional']],
    receives: ['Petición y condiciones que exige la operación.'],
    produces: ['Admisión o rechazo con su alcance y límites.'],
    does: ['La prosa, el rol del cliente o un informe no sustituyen el límite técnico.', 'ApprovalRecord v2 solo se aplica cuando se requiere asentimiento; no autentica a la persona física.', 'No exige una cadena de capacidades, reservas o contratos históricos.']
  });
  node('operation', 790, 680, 340, 86, 'runner', 'OPERACIÓN ACOTADA', 'Candidato y efecto Git', 'material fijado · comprobaciones aplicables', {
    kind: 'OPERACIÓN DEL DOMINIO REPOPS', status: 'Dirección adoptada · integración por demostrar',
    summary: 'El motor comprueba material fijado y gobierna el efecto Git admitido. Tests, builds y hooks son ejecución de código y requieren límites de acceso apropiados.',
    caps: [['Primer resultado', 'Commit recuperable'], ['Push inicial', 'Manual con Git']],
    receives: ['Petición admitida, base explícita, candidato fijado e inputs pertinentes.'],
    produces: ['Las comprobaciones y el efecto que admita la operación, con referencias consultables.'],
    does: ['No contiene Architect, implementadores ni revisores cognitivos internos.', 'No fija aquí el orden del commit respecto de VERIFY/AUDIT ni la autoridad concreta del estado SDD.', 'No promete push, PR, merge o sincronización automáticos en el primer MVP.', 'La implementación anterior y sus pruebas no acreditan el nuevo recorrido integrado.']
  });
  node('result', 1330, 680, 300, 86, 'evidence', 'RESULTADO', 'Qué ocurrió', 'consultable · evidencia · límites', {
    kind: 'RESPONSABILIDAD DEL CORE', status: 'Core mínimo vigente · diseño adoptado',
    summary: 'El resultado distingue admisión, inicio, declaración del ejecutor y efecto comprobado. Conserva la evidencia necesaria para que el consumidor pueda consultarlo e interpretar sus límites.',
    caps: [['Consulta', 'Resultado conservado'], ['Efecto', 'Lo determina el dominio']],
    receives: ['Hechos de la operación, observaciones pertinentes y resultados de comprobación.'],
    produces: ['Resultado consultable con alcance, referencias y límites conocidos.'],
    does: ['Un PASS, un hash o un informe no acreditan por sí solos todo el efecto.', 'Fallo de contenido, falta de entorno y no ejecutado deben distinguirse.', 'No impone EvidenceEnvelope, un almacén universal de jobs ni un schema aún no adoptado.']
  });
  node('recovery', 1330, 855, 300, 86, 'queue', 'RECUPERACIÓN · SI APLICA', 'Consultar y reconciliar', 'antes de repetir un efecto incierto', {
    kind: 'RESPONSABILIDAD CONDICIONAL DEL CORE', status: 'Core mínimo vigente · integración por demostrar',
    summary: 'Cuando una interrupción puede dejar un efecto parcial, desconocido o duplicado, se consulta y reconcilia el estado del dominio antes de decidir otro intento.',
    caps: [['Aplicación', 'Cuando el efecto lo requiere'], ['Reintento', 'Sin permiso automático']],
    receives: ['Resultado incierto y referencias suficientes del material y del efecto.'],
    produces: ['Una determinación actualizada o una incertidumbre explícita para decidir cómo continuar.'],
    does: ['Timeout, cancelación o respuesta perdida no demuestran ausencia de efecto.', 'El retorno del cliente no acredita que todos los procesos hayan terminado.', 'No se elimina candidato o evidencia con efecto incierto ni se reaplica a ciegas.', 'No exige una plataforma distribuida ni promete exactamente-una-vez universal.']
  });
  DATA.baseEdges = phases.slice(0, -1).map((p, i) => [p[0], phases[i + 1][0], '', 'flow', 0]);
  DATA.baseEdges.push(
    ['architect', 'material', '', 'artifact', 0], ['implementer', 'material', '', 'artifact', 0],
    ['reviewers', 'material', '', 'artifact', 0], ['material', 'request', 'petición y material', 'artifact', 0],
    ['request', 'admission', '', 'engine', 0], ['admission', 'operation', '', 'engine', 0],
    ['operation', 'result', '', 'engine', 0], ['result', 'recovery', 'si el efecto queda incierto', 'return', 0]
  );
  const defs = DATA.defs, info = DATA.info;
  let view = {...DATA.view}, pan = null, selected = null, returnFocus = null, customView = false;
  let textual = window.matchMedia('(max-width: 760px)').matches;
  function X(tag, attrs = {}) {
    const element = document.createElementNS(NS, tag);
    for (const [key, value] of Object.entries(attrs)) element.setAttribute(key, value);
    return element;
  }
  function applyView() { svg.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`); }
  function boundary(b, ux, uy, out) {
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    const k = 1 / Math.max(Math.abs(ux) / (b.w / 2 || 1), Math.abs(uy) / (b.h / 2 || 1), .0001);
    return {x: cx + (out ? 1 : -1) * ux * k, y: cy + (out ? 1 : -1) * uy * k};
  }
  function geom(edge) {
    // Enter the engine to the right of its heading, then reach the request.
    // This keeps the transport line clear of the zone titles.
    if (edge[0] === 'material' && edge[1] === 'request') {
      return {S: {x: 1510, y: 499}, T: {x: 190, y: 680},
        C1: {x: 1720, y: 499}, C2: {x: 1720, y: 660}, label: {x: 1690, y: 565},
        route: 'M1510 499 H1708 Q1720 499 1720 511 V648 Q1720 660 1708 660 H202 Q190 660 190 672 V680'};
    }
    const a = defs[edge[0]], b = defs[edge[1]];
    const dx = b.x + b.w / 2 - a.x - a.w / 2, dy = b.y + b.h / 2 - a.y - a.h / 2;
    const length = Math.hypot(dx, dy) || 1, ux = dx / length, uy = dy / length;
    const S = boundary(a, ux, uy, true), T = boundary(b, ux, uy, false), bend = edge[4] || 0;
    return {S, T, C1: {x: S.x + (T.x - S.x) / 3 - uy * bend, y: S.y + (T.y - S.y) / 3 + ux * bend},
      C2: {x: S.x + 2 * (T.x - S.x) / 3 - uy * bend, y: S.y + 2 * (T.y - S.y) / 3 + ux * bend}};
  }
  function cubic(g, t = .5) {
    const u = 1 - t;
    return {x: u*u*u*g.S.x + 3*u*u*t*g.C1.x + 3*u*t*t*g.C2.x + t*t*t*g.T.x,
      y: u*u*u*g.S.y + 3*u*u*t*g.C1.y + 3*u*t*t*g.C2.y + t*t*t*g.T.y};
  }
  function path(g) { return g.route || `M${g.S.x} ${g.S.y}C${g.C1.x} ${g.C1.y} ${g.C2.x} ${g.C2.y} ${g.T.x} ${g.T.y}`; }
  function marker(cls) { return `url(#a-${['flow', 'artifact', 'engine', 'git', 'return'].includes(cls) ? cls : 'default'})`; }
  function renderZones() {
    Z.replaceChildren();
    for (const [cls, x, y, w, h, title, subtitle] of DATA.zones) {
      Z.appendChild(X('rect', {class: `zone ${cls}`, x, y, width: w, height: h, rx: 20}));
      for (const [className, value, offset] of [['zone-title', title, 26], ['zone-subtitle', subtitle, 46]]) {
        const t = X('text', {class: className, x: x + 18, y: y + offset}); t.textContent = value; Z.appendChild(t);
      }
    }
    const annotations = [
      [70, 855, 'PRIMER MVP · LOCAL', 'Motor y canónico en el mismo host. Commit recuperable; push manual.'],
      [70, 915, 'SIGUE EN DEFINICIÓN', 'Contrato de entrada, autoridad de estado, gates y momento del efecto.'],
      [70, 975, 'ESTADO REAL', 'Hay piezas y pruebas previas. El motor nuevo aún no tiene un recorrido integrado demostrado.']
    ];
    for (const [x, y, title, text] of annotations) {
      let t = X('text', {class: 'zone-title', x, y}); t.textContent = title; Z.appendChild(t);
      t = X('text', {class: 'zone-subtitle', x, y: y + 22}); t.textContent = text; Z.appendChild(t);
    }
  }
  function renderNodes() {
    N.replaceChildren();
    for (const [id, d] of Object.entries(defs)) {
      const g = X('g', {class: `node type-${d.type} selectable`, 'data-id': id,
        transform: `translate(${d.x} ${d.y})`, tabindex: 0, role: 'button',
        'aria-label': `${d.title}: ${d.note}. Ver detalle`, 'aria-controls': 'atlas-card', 'aria-expanded': 'false'});
      g.appendChild(X('rect', {class: 'box', width: d.w, height: d.h, rx: 12}));
      for (const [className, text, y] of [['kicker', d.kicker, d.h === 58 ? 15 : 20],
        ['title', d.title, d.h === 58 ? 33 : 44], ['note', d.note, d.h === 58 ? 49 : 64]]) {
        const t = X('text', {class: className, x: d.w / 2, y}); t.textContent = text; g.appendChild(t);
      }
      N.appendChild(g);
    }
  }
  function renderEdges() {
    E.replaceChildren(); L.replaceChildren();
    for (const edge of DATA.baseEdges) {
      const g = geom(edge);
      E.appendChild(X('path', {class: `edge ${edge[3]}`, d: path(g), 'marker-end': marker(edge[3])}));
      if (edge[2]) {
        const p = g.label || cubic(g), width = Math.max(52, edge[2].length * 6.4 + 20);
        L.appendChild(X('rect', {class: 'edge-label-bg', x: p.x - width / 2, y: p.y - 11, width, height: 22, rx: 9}));
        const t = X('text', {class: 'edge-label', x: p.x, y: p.y + 4}); t.textContent = edge[2]; L.appendChild(t);
      }
    }
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  }
  function fmtList(items) { return `<ul>${items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`; }
  function updateSelection() {
    for (const g of N.children) {
      const active = g.dataset.id === selected; g.classList.toggle('selected', active); g.setAttribute('aria-expanded', String(active));
    }
    textView?.querySelectorAll('[data-node]').forEach(button => button.setAttribute('aria-expanded', String(button.dataset.node === selected)));
  }
  function openCard(key, opener) {
    const d = info[key], n = defs[key]; if (!d || !n) return;
    returnFocus = opener || document.activeElement; selected = key;
    card.innerHTML = `<div class="card-head"><div><div class="card-kind">${escapeHTML(d.kind)}</div><h2 id="atlas-card-title">${escapeHTML(n.title)}</h2><div class="card-tech">Modelo público · actualizado al core mínimo</div></div><button class="card-close" type="button" aria-label="Cerrar detalle">×</button></div><div class="card-status"><b>Estado:</b> ${escapeHTML(d.status)}</div><p class="card-summary">${escapeHTML(d.summary)}</p><div class="card-grid">${d.caps.map(([label, value]) => `<div class="card-cap"><b>${escapeHTML(label)}</b><span>${escapeHTML(value)}</span></div>`).join('')}</div><div class="card-section"><h3>RECIBE</h3>${fmtList(d.receives)}</div><div class="card-section"><h3>APORTA</h3>${fmtList(d.produces)}</div><div class="card-section"><h3>LÍMITES</h3>${fmtList(d.does)}</div>${d.sdd ? '<div class="card-section"><h3>OPEN SOURCE</h3><a href="https://github.com/CollSalvia-Org/sdd-framework">SDD Framework ↗</a></div>' : ''}`;
    card.setAttribute('role', 'region'); card.setAttribute('aria-labelledby', 'atlas-card-title');
    card.classList.add('open'); card.scrollTop = 0;
    card.querySelector('.card-close').addEventListener('click', closeCard);
    updateSelection(); card.querySelector('.card-close').focus({preventScroll: true});
  }
  function closeCard() {
    selected = null; card.classList.remove('open'); updateSelection();
    if (returnFocus?.isConnected) returnFocus.focus({preventScroll: true});
  }
  function renderTextView() {
    if (!textView) return;
    const groups = [
      ['SDD · referencia del framework', phases.map(p => p[0])],
      ['Clientes externos y material', ['architect', 'implementer', 'reviewers', 'material']],
      ['RepoOps · operación y resultado', ['request', 'admission', 'operation', 'result', 'recovery']]
    ];
    textView.innerHTML = groups.map(([title, ids]) => `<section class="atlas-text-group"><h2>${escapeHTML(title)}</h2>${ids.map(id => `<button class="atlas-text-node" type="button" data-node="${id}" aria-controls="atlas-card" aria-expanded="false"><strong>${escapeHTML(defs[id].title)}</strong><span>${escapeHTML(info[id].summary)}</span></button>`).join('')}</section>`).join('');
    textView.addEventListener('click', event => {
      const button = event.target.closest('[data-node]'); if (button) openCard(button.dataset.node, button);
    });
  }
  function setTextView(next) {
    textual = next; closeCard(); document.body.classList.toggle('atlas-reading-text', textual);
    svg.hidden = textual; svg.style.display = textual ? 'none' : '';
    if (textView) textView.hidden = !textual;
    status.hidden = textual;
    for (const id of ['zoom-out', 'zoom-in', 'fit']) document.getElementById(id).hidden = textual;
    if (textToggle) {
      textToggle.textContent = textual ? 'Ver diagrama' : 'Vista textual';
      textToggle.setAttribute('aria-expanded', String(textual));
    }
    if (!textual) fit();
  }
  function fit() {
    const r = svg.getBoundingClientRect(); if (!r.width || !r.height) return;
    const a = r.width / r.height;
    let {x, y, w, h} = DATA.view;
    if (w / h > a) { const nh = w / a; y -= (nh - h) / 2; h = nh; }
    else { const nw = h * a; x -= (nw - w) / 2; w = nw; }
    view = {x, y, w, h}; customView = false; applyView();
  }
  function zoomBy(factor) {
    const cx = view.x + view.w / 2, cy = view.y + view.h / 2;
    const w = Math.min(4000, Math.max(650, view.w * factor)), h = w * view.h / view.w;
    view = {x: cx - w / 2, y: cy - h / 2, w, h}; customView = true; applyView();
  }
  svg.addEventListener('click', event => {
    const node = event.target.closest('.node'); if (node) openCard(node.dataset.id, node);
  });
  svg.addEventListener('keydown', event => {
    const node = event.target.closest('.node');
    if (node && ['Enter', ' '].includes(event.key)) { event.preventDefault(); openCard(node.dataset.id, node); }
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && selected) { event.preventDefault(); closeCard(); } });
  svg.addEventListener('pointerdown', event => {
    if (event.target.closest('.node') || event.button !== 0) return;
    const m = svg.getScreenCTM(); if (!m) return;
    pan = {pid: event.pointerId, x: event.clientX, y: event.clientY, vx: view.x, vy: view.y, sx: m.a, sy: m.d};
    svg.setPointerCapture(event.pointerId);
  });
  svg.addEventListener('pointermove', event => {
    if (!pan || event.pointerId !== pan.pid) return;
    view.x = pan.vx - (event.clientX - pan.x) / pan.sx; view.y = pan.vy - (event.clientY - pan.y) / pan.sy;
    customView = true; applyView();
  });
  function endPan(event) {
    if (pan?.pid !== event.pointerId) return;
    pan = null; if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
  }
  svg.addEventListener('pointerup', endPan); svg.addEventListener('pointercancel', endPan);
  // Page scrolling stays native. Zoom is explicit and cannot move graph nodes.
  document.getElementById('zoom-out').addEventListener('click', () => zoomBy(1.22));
  document.getElementById('zoom-in').addEventListener('click', () => zoomBy(.82));
  document.getElementById('fit').addEventListener('click', fit);
  textToggle?.addEventListener('click', () => setTextView(!textual));
  window.addEventListener('resize', () => { if (!customView && !textual) fit(); });
  renderZones(); renderEdges(); renderNodes(); renderTextView(); applyView();
  document.body.dataset.atlasMode = 'view';
  status.textContent = 'Selecciona un nodo para ver su detalle · arrastra el fondo para desplazar · +/− para ampliar';
  setTextView(textual);
})();
