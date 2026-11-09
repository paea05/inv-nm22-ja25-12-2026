import { byId } from './utils.js';

const MS_DIA = 86400000;

/**
 * Calcula cuánto falta para la fecha objetivo.
 * @param {Date} objetivo - Fecha y hora del evento.
 * @param {Date} [ahora] - Momento de referencia (por defecto, ahora).
 * @returns {{dias:number, horas:number, minutos:number, segundos:number, terminado:boolean, esHoy:boolean}}
 */
export function getTimeLeft(objetivo, ahora = new Date()) {
  const diff = objetivo - ahora;
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, terminado: true, esHoy: Math.abs(diff) < MS_DIA };
  }
  return {
    dias: Math.floor(diff / MS_DIA),
    horas: Math.floor((diff % MS_DIA) / 3600000),
    minutos: Math.floor((diff % 3600000) / 60000),
    segundos: Math.floor((diff % 60000) / 1000),
    terminado: false,
    esHoy: false,
  };
}

/**
 * Pinta el tiempo restante y el mensaje final en la página.
 * @param {ReturnType<typeof getTimeLeft>} t - Tiempo restante.
 */
function renderCountdown(t) {
  byId('cd-days').textContent = t.dias;
  byId('cd-hours').textContent = t.horas;
  byId('cd-minutes').textContent = t.minutos;
  byId('cd-seconds').textContent = t.segundos;
  if (t.terminado) {
    byId('cd-msg').textContent = t.esHoy ? '¡Hoy es el gran día!' : '¡Gracias por celebrar con nosotros!';
  }
}

/**
 * Inicia la cuenta regresiva y la actualiza cada segundo.
 * @param {Date} objetivo - Fecha y hora del evento.
 */
export function startCountdown(objetivo) {
  const actualizar = () => renderCountdown(getTimeLeft(objetivo));
  actualizar();
  setInterval(actualizar, 1000);
}
