/**
 * Datos editables de la invitación.
 * Para cambiar horas, direcciones, padrinos o teléfonos solo se modifica este archivo.
 */
export const CONFIG = {
  fecha: '2026-12-26',          // Fecha del evento (AAAA-MM-DD)
  horaMisa: '',                 // Formato "HH:MM"; vacío = "Hora por confirmar"
  horaFiesta: '15:00',          // Recepción: 3:00 p.m. (hora del centro de México)
  dirMisa: 'Parroquia Santa María Guadalupe, C. Iturbide 52, El Reposo, La Piragua, 68310 San Juan Bautista Tuxtepec, Oax.',
  dirFiesta: 'Avenida 5 de Mayo 41, San Francisco Salsipuedes, 68442',
  padres: [
    { rol: 'Padres de Jesús Adrián y Nina María', nombres: ['Maria Guadalupe Ronquillo & Adrian Pantoja'] },
    { rol: 'Padrino de bautizo (Jesús Adrián)', nombres: ['Omar David Juan Alcantar'] },
    { rol: 'Padrinos de acción de gracias (Nina María)', nombres: ['Ricardo Alberto Sánchez Abascal', 'Martha Eli López Nieto'] },
  ],
  regalosUrl: '',               // Enlace de la mesa de regalos; vacío = sección oculta
  whatsapp: [                   // Teléfonos de 10 dígitos (se antepone la lada 52)
    { telefono: '5534410756', etiqueta: 'Confirmar a Papá' },
    { telefono: '5563690351', etiqueta: 'Confirmar a Mamá' },
  ],
};
