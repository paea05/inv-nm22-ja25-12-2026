import { byId } from './utils.js';

const DURACION_CARGA_MS = 2400;

/**
 * Anima la pantalla de carga (barra, porcentaje e iconos) hasta llegar a 100 %.
 * Espera al evento "load" para no pasar de 90 % si la página aún no termina de cargar.
 * @param {HTMLElement} intro - Contenedor de la pantalla de inicio.
 */
export function runLoader(intro) {
  const barra = byId('intro-bar');
  const porcentaje = byId('intro-percent');
  const iconos = [...intro.querySelectorAll('.intro__icon')];
  const t0 = performance.now();
  let cargada = document.readyState === 'complete';
  window.addEventListener('load', () => { cargada = true; });

  const paso = (ahora) => {
    let avance = Math.min((ahora - t0) / DURACION_CARGA_MS, 1);
    if (!cargada) avance = Math.min(avance, 0.9);
    const n = Math.round(avance * 100);
    barra.style.width = `${n}%`;
    porcentaje.textContent = `Cargando ${n}%`;
    iconos.forEach((icono, i) => icono.classList.toggle('is-active', i <= Math.floor(avance * 3.99)));
    if (avance >= 1) intro.classList.add('is-ready');
    else requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

/**
 * Activa el sello: al tocarlo se abren las mitades, se libera el scroll y se avisa con un callback.
 * @param {HTMLElement} intro - Contenedor de la pantalla de inicio.
 * @param {Function} alAbrir - Función a ejecutar al abrir (por ejemplo, iniciar la música).
 */
export function initSeal(intro, alAbrir) {
  byId('intro-seal').addEventListener('click', () => {
    intro.classList.add('is-open');
    document.body.classList.remove('is-locked');
    window.scrollTo(0, 0);
    alAbrir();
    setTimeout(() => intro.remove(), 1500);
  });
}
