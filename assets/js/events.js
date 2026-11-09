import { byId, formatHora12, buildMapsUrl } from './utils.js';

/**
 * Muestra fecha y hora de la misa y de la recepción ("Hora por confirmar" si no hay hora).
 * @param {object} cfg - Objeto CONFIG.
 */
export function renderEventTimes(cfg) {
  const texto = (hora) => `Sábado 26 de diciembre · ${hora ? formatHora12(hora) : 'Hora por confirmar'}`;
  byId('misa-time').textContent = texto(cfg.horaMisa);
  byId('fiesta-time').textContent = texto(cfg.horaFiesta);
}

/**
 * Asigna a cada botón "Ver mapa" su enlace de Google Maps.
 * @param {object} cfg - Objeto CONFIG.
 */
export function renderMapLinks(cfg) {
  byId('misa-map').href = buildMapsUrl(cfg.dirMisa);
  byId('fiesta-map').href = buildMapsUrl(cfg.dirFiesta);
}

/**
 * Crea un elemento con clase y texto.
 * @param {string} tag - Etiqueta HTML.
 * @param {string} clase - Clase CSS.
 * @param {string} texto - Contenido de texto.
 * @returns {HTMLElement} El elemento creado.
 */
function createText(tag, clase, texto) {
  const el = document.createElement(tag);
  el.className = clase;
  el.textContent = texto;
  return el;
}

/**
 * Dibuja la lista de padres y padrinos; si no hay datos, la sección queda oculta.
 * @param {object} cfg - Objeto CONFIG.
 */
export function renderPeople(cfg) {
  if (!cfg.padres.length) return;
  const lista = byId('people-list');
  cfg.padres.forEach(({ rol, nombres }) => {
    lista.append(createText('p', 'people__role', rol));
    nombres.forEach((n) => lista.append(createText('p', 'people__name', n)));
  });
  byId('people-section').hidden = false;
}

/**
 * Muestra la mesa de regalos solo si ya hay un enlace configurado.
 * @param {object} cfg - Objeto CONFIG.
 */
export function renderGifts(cfg) {
  if (!cfg.regalosUrl) return;
  byId('gifts-link').href = cfg.regalosUrl;
  byId('gifts-section').hidden = false;
}

/**
 * Crea un botón de WhatsApp por teléfono; el número no se muestra, solo la etiqueta.
 * @param {object} cfg - Objeto CONFIG.
 * @param {string} nombreInvitado - Nombre que se incluye en el mensaje.
 */
export function renderRsvp(cfg, nombreInvitado) {
  if (!cfg.whatsapp.length) return;
  const mensaje = `Hola, confirmo mi asistencia al bautizo de Jesús Adrián y cumpleaños de Nina María. Invitado: ${nombreInvitado}`;
  cfg.whatsapp.forEach(({ telefono, etiqueta }) => {
    const enlace = createText('a', 'button', etiqueta);
    enlace.href = `https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}`;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    byId('rsvp-actions').append(enlace);
  });
  byId('rsvp-section').hidden = false;
}
