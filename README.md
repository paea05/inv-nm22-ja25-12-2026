# Invitación digital · Bautizo de Jesús Adrián y 4.º cumpleaños de Nina María

Invitación web de una sola página (mobile-first) para el **sábado 26 de diciembre de 2026**.
Incluye pantalla de carga y apertura con sello, invitado personalizado, cuenta regresiva,
mapas, galería con visor, confirmación por WhatsApp y música de fondo.

**Sitio publicado:** https://paea05.github.io/inv-nm22-ja25-12-2026/

## Tecnologías
HTML5 semántico · CSS3 (variables, Flexbox, Grid; metodología BEM) · JavaScript ES6+ (módulos, sin librerías) · Bootstrap 5.3 (solo la cuadrícula) · GitHub Pages.

## Estructura
```
index.html              Página única de la invitación
assets/css/styles.css   Estilos propios organizados por secciones
assets/js/              Módulos: config, utils, guest, countdown, events, gallery, music, intro, main
assets/img/             Imágenes optimizadas, íconos y vista previa para WhatsApp (og.jpg)
assets/audio/           Música de fondo (MP3)
assets/vendor/          Bootstrap 5 grid (copia local con su licencia)
```

## Arbol de Estructura
```
inv-nm22-ja25-12-2026/
│
├── index.html
│
├── assets/
│   ├── audio/
│   │   └── musica.mp3
│   │
│   ├── css/
│   │   └── styles.css
│   │
│   ├── img/
│   │   ├── apple-touch-icon.png
│   │   ├── banner.jpg
│   │   ├── gallery-1.jpg
│   │   ├── gallery-2.jpg
│   │   ├── gallery-3.jpg
│   │   ├── gallery-4.jpg
│   │   ├── gallery-5.jpg
│   │   ├── gallery-6.jpg
│   │   ├── icon.svg
│   │   ├── og.jpg
│   │   ├── opening-bautizo.jpg
│   │   └── opening-cumple.jpg
│   │
│   ├── js/
│   │   ├── config.js
│   │   ├── countdown.js
│   │   ├── events.js
│   │   ├── gallery.js
│   │   ├── guest.js
│   │   ├── intro.js
│   │   ├── main.js
│   │   ├── music.js
│   │   └── utils.js
│   │
│   └── vendor/
│       └── bootstrap/
│           ├── LICENSE
│           └── bootstrap-grid.min.css
│
├── README.md
└── .gitignore
```

## Uso
- **Editar datos** (horas, direcciones, padrinos, teléfonos, regalos): `assets/js/config.js`.
- **Invitado personalizado:** agregar al enlace `#Nombre-Apellido.accesos`, por ejemplo `.../#Familia-Perez.4`.
- **Probar en local:** los módulos JS requieren servidor, no abrir con doble clic.
  `python3 -m http.server 8000` y abrir `http://localhost:8000`.
- **Publicar:** subir a la rama `main`; GitHub Pages publica automáticamente.

## Notas
Accesible (alt en imágenes, foco visible, navegación por teclado, `prefers-reduced-motion`) y con modo oscuro automático.
Música: pista libre de derechos elegida por la familia; revisar la licencia de la fuente original antes de redistribuir.
