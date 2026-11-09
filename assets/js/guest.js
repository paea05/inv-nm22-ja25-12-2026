import { byId } from './utils.js';

/**
 * Lee el invitado desde el hash de la URL. Formato: #Familia-Perez.4
 * (nombre con guiones y, después del punto, el número de accesos).
 * @param {string} hash - Valor de location.hash.
 * @returns {{nombre: string, accesos: number|null}} Datos del invitado.
 */
export function parseGuest(hash) {
  let raw = hash.replace('#', '');
  try { raw = decodeURIComponent(raw); } catch { /* se usa el texto tal cual */ }
  const punto = raw.lastIndexOf('.');
  const tieneAccesos = punto > 0 && /^\d{1,2}$/.test(raw.slice(punto + 1));
  const accesos = tieneAccesos ? Number(raw.slice(punto + 1)) : null;
  const nombre = (tieneAccesos ? raw.slice(0, punto) : raw).replace(/[-_~]+/g, ' ').trim();
  return { nombre, accesos };
}

/**
 * Muestra el nombre y los accesos del invitado en pantalla (usa textContent: sin riesgo de XSS).
 * @param {{nombre: string, accesos: number|null}} invitado - Datos del invitado.
 */
export function renderGuest({ nombre, accesos }) {
  if (nombre) {
    byId('guest-name').textContent = nombre;
    byId('intro-guest').textContent = `Para: ${nombre}`;
  }
  if (accesos) {
    const texto = accesos === 1 ? 'acceso' : 'accesos';
    byId('guest-access').textContent = `Cuentas con ${accesos} ${texto} para la celebración.`;
  }
}
