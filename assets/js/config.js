/**
 * Datos editables de la invitación.
 * Para cambiar horas, direcciones, padrinos o teléfonos solo se modifica este archivo.
 */
export const CONFIG = {
  fecha: '2026-12-26',          // Fecha del evento (AAAA-MM-DD)
  horaMisa: '08:00',                 // Formato "HH:MM"; vacío = "Hora por confirmar"
  horaFiesta: '15:00',          // Recepción: 3:00 p.m. (hora del centro de México)
  dirMisa: 'Parroquia Santa María Guadalupe, C. Iturbide 52, El Reposo, La Piragua, 68310 San Juan Bautista Tuxtepec, Oax.',
  dirFiesta: 'Calle Benito Juárez 45, San Francisco Salsipuedes, San Juan Bautista Tuxtepec, Oaxaca, 68442',
  mapaFiesta: 'https://maps.google.com/?q=18.115377,-96.237259',  // Ubicación exacta (coordenadas)
  padres: [
    { rol: 'Padres de Jesús Adrián y Nina María', nombres: ['Maria Guadalupe Ronquillo Chepe & Adrian Pantoja Esteban'] },
    { rol: 'Padrino de bautizo (Jesús Adrián)', nombres: ['Omar David Juan Alcantar'] },
    { rol: 'Padrinos de acción de gracias (Nina María)', nombres: ['Martha Eli López Nieto', 'Ricardo Alberto Sánchez Abascal'] },
  ],
  regalosUrl: '',               // Enlace de la mesa de regalos; vacío = sección oculta
  whatsapp: [                   // Teléfonos de 10 dígitos (se antepone la lada 52)
    { telefono: '5534410756', etiqueta: 'Confirmar a Papá' },
    { telefono: '5563690351', etiqueta: 'Confirmar a Mamá' },
  ],
};
