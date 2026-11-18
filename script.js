// Bogotá Conecta — frontend académico para consultar eventos culturales.
// Flujo local de consulta: ControladorEvento -> ServicioEvento -> RepositorioEvento.
// No existe conexión real con una API REST, Spring Boot ni MySQL en esta versión.

class Evento {
  constructor(id, nombre, descripcion, fecha, ubicacion) {
    Object.assign(this, { id, nombre, descripcion, fecha, ubicacion });
  }
  obtenerInformacion() {
    return `${this.nombre}. ${this.descripcion} Fecha: ${this.fecha}. Ubicación: ${this.ubicacion}.`;
  }
}

class RepositorioEvento {
  constructor() {
    // Registros ficticios de demostración; no son eventos vigentes confirmados.
    this.eventos = [
      new Evento(1, 'Muestra Cultural de Bogotá', 'Espacio demostrativo dedicado a expresiones artísticas, muestras culturales y actividades de participación ciudadana.', '25 de noviembre de 2026', 'Centro Cultural Gabriel García Márquez'),
      new Evento(2, 'Encuentro de Música en la Ciudad', 'Presentación musical de ejemplo que reúne diferentes sonidos y propuestas de artistas locales.', '30 de noviembre de 2026', 'Plaza de Bolívar'),
      new Evento(3, 'Exposición Bogotá y su Memoria', 'Exposición demostrativa sobre la historia, los espacios y las expresiones culturales de Bogotá.', '5 de diciembre de 2026', 'Museo de Bogotá')
    ];
  }
  // Equivalentes locales de findAll() y findById() del repositorio.
  buscarTodos() { return [...this.eventos]; }
  buscarPorId(id) { return this.eventos.find(evento => evento.id === Number(id)) || null; }
}

class ServicioEvento {
  constructor(repositorioEvento) { this.repositorioEvento = repositorioEvento; }
  obtenerTodos() { return this.repositorioEvento.buscarTodos(); }
  obtenerPorId(id) { return this.repositorioEvento.buscarPorId(id); }
}

class ControladorEvento {
  constructor(servicioEvento) { this.servicioEvento = servicioEvento; }
  listarEventos() { return this.servicioEvento.obtenerTodos(); }
  obtenerEventoPorId(id) { return this.servicioEvento.obtenerPorId(id); }
}

const repositorioEvento = new RepositorioEvento();
const servicioEvento = new ServicioEvento(repositorioEvento);
const controladorEvento = new ControladorEvento(servicioEvento);
let eventoSeleccionado = null;

const grid = document.getElementById('eventsGrid');
const emptyState = document.getElementById('emptyState');
const detailsSection = document.getElementById('detallesEvento');
const modal = document.getElementById('eventModal');

function visualizarListadoDeEventos(eventos) {
  grid.innerHTML = '';
  emptyState.hidden = eventos.length > 0;
  document.getElementById('resultsCount').textContent = `Mostrando ${eventos.length} eventos demostrativos`;

  eventos.forEach(evento => {
    const card = document.createElement('article');
    card.className = 'event-card';
    const cover = document.createElement('div');
    cover.className = 'event-cover cover-art';
    const coverLabel = document.createElement('span');
    coverLabel.className = 'event-cover-label';
    coverLabel.textContent = 'BOGOTÁ CONECTA · EVENTO DEMOSTRATIVO';
    cover.appendChild(coverLabel);

    const info = document.createElement('div');
    info.className = 'event-info';
    const category = document.createElement('span');
    category.className = 'event-category';
    category.textContent = 'Cultural';
    const title = document.createElement('h3');
    title.textContent = evento.nombre;
    const description = document.createElement('p');
    description.textContent = evento.descripcion;
    const location = document.createElement('div');
    location.className = 'event-location';
    const place = document.createElement('span');
    place.textContent = `⌖ ${evento.ubicacion}`;
    const selectButton = document.createElement('button');
    selectButton.className = 'detail-button';
    selectButton.type = 'button';
    selectButton.textContent = 'Ver detalles';
    selectButton.addEventListener('click', () => seleccionarEvento(evento.id));

    info.append(category, title, description, location);
    location.append(place, selectButton);
    card.append(cover, info);
    grid.appendChild(card);
  });
}

// Caso de uso UML: Consultar eventos culturales.
function consultarEventosCulturales() {
  const eventos = controladorEvento.listarEventos();
  visualizarListadoDeEventos(eventos);
  document.getElementById('eventos').scrollIntoView({ behavior: 'smooth' });
}

// Caso de uso UML: Seleccionar un evento.
function seleccionarEvento(id) {
  eventoSeleccionado = controladorEvento.obtenerEventoPorId(id);
  if (!eventoSeleccionado) return;

  document.getElementById('selectedCategory').textContent = 'Evento cultural';
  document.getElementById('selectedName').textContent = eventoSeleccionado.nombre;
  document.getElementById('selectedDescription').textContent = eventoSeleccionado.descripcion;
  document.getElementById('selectedDate').textContent = eventoSeleccionado.fecha;
  document.getElementById('selectedLocation').textContent = eventoSeleccionado.ubicacion;
  detailsSection.hidden = false;
  detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Caso de uso UML: Consultar detalles del evento seleccionado.
function consultarDetallesDelEvento() {
  if (!eventoSeleccionado) return;
  document.getElementById('modalCategory').textContent = 'Evento cultural';
  document.getElementById('modalTitle').textContent = eventoSeleccionado.nombre;
  document.getElementById('modalDescription').textContent = eventoSeleccionado.obtenerInformacion();
  document.getElementById('modalDate').textContent = eventoSeleccionado.fecha;
  document.getElementById('modalLocation').textContent = eventoSeleccionado.ubicacion;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('closeModal').focus();
}

function cerrarDetallesDelEvento() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('consultarEventos').addEventListener('click', consultarEventosCulturales);
document.getElementById('consultarEventosHeader').addEventListener('click', consultarEventosCulturales);
document.getElementById('consultarDetallesEvento').addEventListener('click', consultarDetallesDelEvento);
document.getElementById('closeModal').addEventListener('click', cerrarDetallesDelEvento);
document.getElementById('modalDone').addEventListener('click', cerrarDetallesDelEvento);
modal.addEventListener('click', event => { if (event.target === modal) cerrarDetallesDelEvento(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) cerrarDetallesDelEvento();
});
document.getElementById('menuToggle').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('open');
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.nav').classList.remove('open');
}));

document.getElementById('totalEvents').textContent = String(controladorEvento.listarEventos().length).padStart(2, '0');
visualizarListadoDeEventos(controladorEvento.listarEventos());
