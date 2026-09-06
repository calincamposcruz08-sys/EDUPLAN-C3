const state = {
  resources: JSON.parse(localStorage.getItem("eduplan_resources") || "[]")
};

const content = document.getElementById("content");
const currentPage = document.getElementById("currentPage");
const modal = document.getElementById("generatorModal");
const sidebar = document.getElementById("sidebar");

const areas = [
  ["📐","Matemática"],["🗣️","Comunicación"],["🔬","Ciencia y Tecnología"],
  ["🌎","Personal Social"],["🇬🇧","Inglés"],["🏃","Educación Física"],
  ["🎨","Arte y Cultura"],["✝️","Educación Religiosa"]
];

function save(){ localStorage.setItem("eduplan_resources", JSON.stringify(state.resources)); }

function layoutTitle(title, subtitle){
  currentPage.textContent = title;
  return `<div class="section-title"><div><h2>${title}</h2><span>${subtitle}</span></div></div>`;
}

function renderInicio(){
  currentPage.textContent="Inicio";
  content.innerHTML = `
    <div class="hero">
      <div>
        <span class="eyebrow">Plataforma docente</span>
        <h1>Bienvenido a EDUPLAN C-3</h1>
        <p>Planifica, crea y organiza tus recursos pedagógicos desde un solo espacio. Utiliza EDUPLAN IA para generar materiales de manera rápida y estructurada.</p>
      </div>
      <button class="primary-btn" onclick="openGenerator()">✨ Crear con IA</button>
    </div>

    <div class="stats">
      <div class="stat"><div class="label">Recursos creados</div><div class="num">${state.resources.length}</div></div>
      <div class="stat"><div class="label">Áreas disponibles</div><div class="num">8</div></div>
      <div class="stat"><div class="label">Herramientas</div><div class="num">12+</div></div>
      <div class="stat"><div class="label">Biblioteca</div><div class="num">${state.resources.length}</div></div>
    </div>

    ${layoutTitle("Herramientas pedagógicas","Accede rápidamente a las funciones principales")}
    <div class="cards">
      ${[
        ["📅","Programación anual","Organiza la planificación general del año escolar.","planificacion"],
        ["📚","Unidades de aprendizaje","Diseña unidades con propósitos, competencias y evidencias.","planificacion"],
        ["📝","Sesiones de aprendizaje","Crea sesiones estructuradas listas para editar.","sesiones"],
        ["📊","Evaluación","Genera criterios, rúbricas y listas de cotejo.","evaluacion"],
        ["🧩","Actividades","Diseña actividades contextualizadas para tus estudiantes.","recursos"],
        ["📄","Fichas de aprendizaje","Crea fichas de trabajo listas para usar.","recursos"],
        ["🤖","EDUPLAN IA","Genera recursos pedagógicos con asistencia inteligente.","ia"],
        ["🎨","Arte y Cultura","Planifica experiencias artísticas y culturales.","arte"]
      ].map(x=>`<div class="card"><div class="card-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><button onclick="${x[3]==='ia'?'openGenerator()':`go('${x[3]}')`}">Abrir herramienta</button></div>`).join("")}
    </div>

    ${layoutTitle("Áreas curriculares","Selecciona un área para comenzar")}
    <div class="area-grid">
      ${areas.map(a=>`<div class="area" onclick="openGeneratorFor('${a[1]}')"><div class="circle">${a[0]}</div><div><strong>${a[1]}</strong><small>Crear recursos</small></div></div>`).join("")}
    </div>
  `;
}

function renderPlanificacion(){
  currentPage.textContent="Planificación";
  content.innerHTML = `
    ${layoutTitle("Planificación","Herramientas para organizar tu trabajo pedagógico")}
    <div class="cards">
      ${[
        ["📅","Programación anual","Organiza competencias, áreas y propósitos del año."],
        ["📚","Unidad de aprendizaje","Diseña una unidad completa y contextualizada."],
        ["🚀","Proyecto de aprendizaje","Construye experiencias basadas en retos y productos."],
        ["🗂️","Experiencia de aprendizaje","Integra actividades, evidencias y evaluación."]
      ].map(x=>`<div class="card"><div class="card-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><button onclick="openGenerator()">Crear</button></div>`).join("")}
    </div>
  `;
}
function renderSesiones(){
  currentPage.textContent="Sesiones";
  content.innerHTML = `${layoutTitle("Sesiones de aprendizaje","Crea y organiza tus sesiones")}${resourceToolbar()}<div id="list" class="resource-list"></div>`;
  renderList();
}
function renderEvaluacion(){
  currentPage.textContent="Evaluación";
  content.innerHTML = `${layoutTitle("Evaluación","Instrumentos y recursos para la evaluación formativa")}
    <div class="cards">
      ${[
        ["📋","Rúbrica","Define criterios y niveles de logro."],
        ["☑️","Lista de cotejo","Registra el cumplimiento de criterios."],
        ["📈","Escala de valoración","Valora niveles de desempeño."],
        ["📝","Cuestionario","Genera preguntas para evaluar aprendizajes."]
      ].map(x=>`<div class="card"><div class="card-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><button onclick="openGenerator()">Crear</button></div>`).join("")}
    </div>`;
}
function renderRecursos(){
  currentPage.textContent="Recursos";
  content.innerHTML = `${layoutTitle("Recursos didácticos","Materiales listos para personalizar")}
    <div class="cards">
      ${[
        ["🧩","Actividades","Dinámicas y tareas contextualizadas."],
        ["📄","Fichas","Fichas imprimibles y de trabajo."],
        ["💡","Organizadores","Mapas, cuadros y organizadores gráficos."],
        ["🎯","Situaciones significativas","Contextos auténticos para el aprendizaje."]
      ].map(x=>`<div class="card"><div class="card-icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p><button onclick="openGenerator()">Crear</button></div>`).join("")}
    </div>`;
}
function renderBiblioteca(){
  currentPage.textContent="Mi biblioteca";
  content.innerHTML = `${layoutTitle("Mi biblioteca","Tus recursos generados en este dispositivo")}${resourceToolbar()}<div id="list" class="resource-list"></div>`;
  renderList();
}
function resourceToolbar(){
 return `<div class="toolbar"><input id="search" placeholder="Buscar recurso..." oninput="renderList()"><select id="filter" onchange="renderList()"><option value="">Todas las áreas</option>${areas.map(a=>`<option>${a[1]}</option>`).join("")}</select><button class="primary-btn" onclick="openGenerator()">+ Crear recurso</button></div>`;
}
function renderList(){
 const list=document.getElementById("list"); if(!list)return;
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 const f=document.getElementById("filter")?.value||"";
 const data=state.resources.filter(r=>(r.tema+r.area+r.tipo).toLowerCase().includes(q)&&(!f||r.area===f));
 list.innerHTML=data.length?data.map(r=>`<div class="resource-row"><div><strong>${escapeHtml(r.tema)}</strong><span>${r.tipo} · ${r.area} · ${r.grado}</span></div><span class="tag">${r.fecha}</span></div>`).join(""):`<div class="empty">Aún no tienes recursos guardados. Crea el primero con <b>EDUPLAN IA</b>.</div>`;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

function go(section){
 if(section==="inicio")renderInicio();
 else if(section==="planificacion")renderPlanificacion();
 else if(section==="sesiones")renderSesiones();
 else if(section==="evaluacion")renderEvaluacion();
 else if(section==="recursos")renderRecursos();
 else if(section==="biblioteca")renderBiblioteca();
 else if(section==="arte")openGeneratorFor("Arte y Cultura");
 sidebar.classList.remove("open");
}
document.querySelectorAll(".nav-item").forEach(btn=>{
 btn.addEventListener("click",()=>{
   document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));
   btn.classList.add("active");
   go(btn.dataset.section);
 });
});
document.getElementById("menuBtn").onclick=()=>sidebar.classList.toggle("open");

function openGenerator(){ modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); }
function closeGenerator(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.getElementById("generatorResult").classList.add("hidden"); }
function openGeneratorFor(area){ openGenerator(); document.getElementById("area").value=area; }

document.getElementById("generatorForm").addEventListener("submit",e=>{
 e.preventDefault();
 const nivel=document.getElementById("nivel").value, grado=document.getElementById("grado").value;
 const area=document.getElementById("area").value, tipo=document.getElementById("tipo").value;
 const tema=document.getElementById("tema").value.trim(), indicaciones=document.getElementById("indicaciones").value.trim();
 const today=new Date().toLocaleDateString("es-PE");
 const result = `RECURSO GENERADO POR EDUPLAN C-3

Tipo: ${tipo}
Nivel: ${nivel}
Grado: ${grado}
Área: ${area}
Tema: ${tema}

PROPÓSITO
Los estudiantes desarrollarán aprendizajes vinculados con ${tema}, relacionando los conocimientos y habilidades del área con una situación significativa y contextualizada.

SECUENCIA SUGERIDA
1. INICIO
• Recuperación de saberes previos.
• Presentación del propósito.
• Motivación mediante una situación cercana al estudiante.

2. DESARROLLO
• Exploración y construcción del aprendizaje.
• Actividad práctica y colaborativa.
• Acompañamiento y retroalimentación docente.

3. CIERRE
• Socialización de evidencias.
• Reflexión y metacognición.
• Acuerdos para continuar aprendiendo.

EVIDENCIA
Producto o desempeño relacionado con: ${tema}.

CRITERIOS
• Comprende y desarrolla la actividad propuesta.
• Aplica estrategias pertinentes.
• Comunica sus resultados con claridad.
• Reflexiona sobre lo aprendido.

${indicaciones ? "INDICACIONES DEL DOCENTE\n"+indicaciones : ""}

Nota: Esta versión genera una estructura base editable. La conexión a una API de IA real puede añadirse mediante una variable de entorno en el backend.`;

 state.resources.unshift({tema,area,tipo,grado,nivel,fecha:today});
 save();
 const box=document.getElementById("generatorResult");
 box.textContent=result;
 box.classList.remove("hidden");
});

window.addEventListener("click",e=>{if(e.target===modal)closeGenerator()});
renderInicio();
