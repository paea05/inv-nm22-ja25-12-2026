import { CONFIG } from './config.js';
import { byId } from './utils.js';
import { parseGuest, renderGuest } from './guest.js';
import { startCountdown } from './countdown.js';
import { renderEventTimes, renderMapLinks, renderPeople, renderGifts, renderRsvp } from './events.js';
import { initCarousel, initViewer } from './gallery.js';
import { createMusicPlayer } from './music.js';
import { runLoader, initSeal } from './intro.js';

/** Punto de entrada: conecta todos los módulos cuando el DOM está listo. */
function init() {
  const intro = byId('intro');
  document.body.classList.add('is-locked');

  const invitado = parseGuest(window.location.hash);
  renderGuest(invitado);
  renderEventTimes(CONFIG);
  renderMapLinks(CONFIG);
  renderPeople(CONFIG);
  renderGifts(CONFIG);
  renderRsvp(CONFIG, invitado.nombre || 'Invitado especial');
  startCountdown(new Date(`${CONFIG.fecha}T${CONFIG.horaMisa || '00:00'}:00`));

  const fotos = [...document.querySelectorAll('.gallery__photo')];
  initCarousel(fotos);
  initViewer(fotos);

  const musica = createMusicPlayer();
  runLoader(intro);
  initSeal(intro, musica.start);
}

init();
