import { byId } from './utils.js';

/**
 * Devuelve el índice de la foto más cercana al centro del carrusel.
 * @param {HTMLElement} pista - Contenedor con scroll horizontal.
 * @param {HTMLElement[]} fotos - Fotos del carrusel.
 * @returns {number} Índice de la foto centrada.
 */
function getCenteredIndex(pista, fotos) {
  const centro = pista.scrollLeft + pista.clientWidth / 2;
  const distancias = fotos.map((f) => Math.abs(f.offsetLeft + f.clientWidth / 2 - centro));
  return distancias.indexOf(Math.min(...distancias));
}

/**
 * Desplaza el carrusel hasta una foto, dejándola centrada.
 * @param {HTMLElement} pista - Contenedor con scroll horizontal.
 * @param {HTMLElement} foto - Foto destino.
 */
function scrollToPhoto(pista, foto) {
  pista.scrollTo({ left: foto.offsetLeft - (pista.clientWidth - foto.clientWidth) / 2, behavior: 'smooth' });
}

/**
 * Activa el carrusel: flechas, puntos indicadores y sincronización con el scroll.
 * @param {HTMLElement[]} fotos - Fotos del carrusel.
 */
export function initCarousel(fotos) {
  const pista = byId('gallery-track');
  const contenedorPuntos = byId('gallery-dots');
  const puntos = fotos.map((_, i) => {
    const punto = document.createElement('button');
    punto.type = 'button';
    punto.className = 'gallery__dot';
    punto.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
    punto.addEventListener('click', () => scrollToPhoto(pista, fotos[i]));
    contenedorPuntos.append(punto);
    return punto;
  });
  const marcarActivo = () => {
    const activo = getCenteredIndex(pista, fotos);
    puntos.forEach((p, i) => p.classList.toggle('is-active', i === activo));
    return activo;
  };
  pista.addEventListener('scroll', marcarActivo, { passive: true });
  byId('gallery-prev').addEventListener('click', () => scrollToPhoto(pista, fotos[Math.max(0, marcarActivo() - 1)]));
  byId('gallery-next').addEventListener('click', () => scrollToPhoto(pista, fotos[Math.min(fotos.length - 1, marcarActivo() + 1)]));
  marcarActivo();
}

/**
 * Activa el visor con marco de tableta: abrir, cerrar, navegar, teclado y deslizar.
 * @param {HTMLImageElement[]} fotos - Fotos que se pueden ampliar.
 */
export function initViewer(fotos) {
  const visor = byId('viewer');
  const imagen = byId('viewer-photo');
  const contador = byId('viewer-counter');
  const cerrar = byId('viewer-close');
  let actual = 0;
  let inicioX = null;

  const mostrar = (indice) => {
    actual = (indice + fotos.length) % fotos.length;
    imagen.classList.remove('is-entering');
    imagen.src = fotos[actual].src;
    imagen.alt = fotos[actual].alt;
    contador.textContent = `${actual + 1} / ${fotos.length}`;
    void imagen.offsetWidth; // reinicia la animación de entrada
    imagen.classList.add('is-entering');
  };
  const abrir = (indice) => {
    mostrar(indice);
    visor.hidden = false;
    document.body.classList.add('is-locked');
    cerrar.focus();
  };
  const cerrarVisor = () => {
    visor.hidden = true;
    document.body.classList.remove('is-locked');
    fotos[actual].focus();
  };

  fotos.forEach((foto, i) => foto.addEventListener('click', () => abrir(i)));
  fotos.forEach((foto, i) => foto.addEventListener('keydown', (e) => { if (e.key === 'Enter') abrir(i); }));
  visor.addEventListener('click', (e) => { if (e.target === visor) cerrarVisor(); });
  cerrar.addEventListener('click', cerrarVisor);
  byId('viewer-prev').addEventListener('click', () => mostrar(actual - 1));
  byId('viewer-next').addEventListener('click', () => mostrar(actual + 1));
  document.addEventListener('keydown', (e) => {
    if (visor.hidden) return;
    if (e.key === 'Escape') cerrarVisor();
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });
  visor.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    inicioX = null;
    if (Math.abs(dx) > 45) mostrar(actual + (dx < 0 ? 1 : -1));
  });
}
