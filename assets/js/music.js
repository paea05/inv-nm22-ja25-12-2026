import { byId } from './utils.js';

/**
 * Crea el reproductor de música de fondo con botón de pausa y fundido de volumen.
 * @returns {{start: Function}} start() muestra el botón y empieza a sonar (debe llamarse tras un toque).
 */
export function createMusicPlayer() {
  const audio = byId('music');
  const boton = byId('music-btn');
  let quiereSonar = false;
  let fundido = null;

  /** Cambia el volumen poco a poco; si el destino es 0, pausa al terminar. */
  const fadeTo = (destino, ms) => {
    clearInterval(fundido);
    const origen = audio.volume;
    const t0 = Date.now();
    fundido = setInterval(() => {
      const k = Math.min((Date.now() - t0) / ms, 1);
      audio.volume = origen + (destino - origen) * k;
      if (k >= 1) {
        clearInterval(fundido);
        if (destino === 0) audio.pause();
      }
    }, 50);
  };

  /** Actualiza el aspecto y los atributos de accesibilidad del botón. */
  const renderButton = (sonando) => {
    boton.classList.toggle('is-paused', !sonando);
    boton.setAttribute('aria-pressed', String(sonando));
    boton.setAttribute('aria-label', sonando ? 'Pausar música' : 'Reproducir música');
  };

  const play = () => {
    audio.volume = 0;
    audio.play().catch(() => { quiereSonar = false; renderButton(false); });
    quiereSonar = true;
    renderButton(true);
    fadeTo(0.5, 1800);
  };
  const pause = () => { quiereSonar = false; renderButton(false); fadeTo(0, 500); };

  boton.addEventListener('click', () => (quiereSonar ? pause() : play()));
  // Si se cambia de app o se bloquea el teléfono, la música se pausa y se reanuda al volver.
  document.addEventListener('visibilitychange', () => {
    if (!quiereSonar) return;
    if (document.hidden) audio.pause(); else audio.play().catch(() => {});
  });

  return { start: () => { boton.hidden = false; play(); } };
}
