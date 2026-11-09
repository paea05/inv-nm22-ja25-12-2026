/**
 * Atajo para buscar un elemento por su id.
 * @param {string} id - Id del elemento.
 * @returns {HTMLElement} El elemento encontrado.
 */
export const byId = (id) => document.getElementById(id);

/**
 * Convierte una hora de 24 h a formato de 12 h con "a.m." / "p.m.".
 * @param {string} hhmm - Hora como "15:00".
 * @returns {string} Hora legible, por ejemplo "3:00 p.m.".
 */
export function formatHora12(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const sufijo = h >= 12 ? 'p.m.' : 'a.m.';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${sufijo}`;
}

/**
 * Arma el enlace de Google Maps para una dirección.
 * @param {string} direccion - Dirección en texto.
 * @returns {string} URL de búsqueda en Google Maps.
 */
export const buildMapsUrl = (direccion) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
