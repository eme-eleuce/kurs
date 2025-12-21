/**
 * Plantillas predefinidas de productos comunes para mantenimiento
 * Estas pueden ser usadas como punto de partida para agilizar la creación de reportes
 */

export const productTemplates = {
  extintores: {
    nombre: "Extintor PQS",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del extintor", fotos: 1 },
      { descripcion: "Revisión de presión y manómetro", fotos: 1 },
      { descripcion: "Inspección de manguera y boquilla", fotos: 1 },
      { descripcion: "Verificación de etiqueta y fecha de vencimiento", fotos: 1 },
      { descripcion: "Estado final después del mantenimiento", fotos: 1 },
    ],
  },

  detectoresHumo: {
    nombre: "Detector de Humo",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del detector", fotos: 1 },
      { descripcion: "Limpieza del sensor", fotos: 1 },
      { descripcion: "Prueba de funcionamiento con aerosol", fotos: 2 },
      { descripcion: "Verificación de batería", fotos: 1 },
      { descripcion: "Estado final operativo", fotos: 1 },
    ],
  },

  lucesEmergencia: {
    nombre: "Luz de Emergencia",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial de la luz", fotos: 1 },
      { descripcion: "Prueba de encendido automático", fotos: 1 },
      { descripcion: "Verificación de batería y autonomía", fotos: 1 },
      { descripcion: "Limpieza de lentes y carcasa", fotos: 1 },
      { descripcion: "Estado final funcionando", fotos: 1 },
    ],
  },

  alarmasIncendio: {
    nombre: "Alarma de Incendio",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del sistema", fotos: 1 },
      { descripcion: "Prueba de activación manual", fotos: 2 },
      { descripcion: "Verificación de volumen de sirena", fotos: 1 },
      { descripcion: "Inspección de cableado", fotos: 1 },
      { descripcion: "Estado final del sistema", fotos: 1 },
    ],
  },

  botiquines: {
    nombre: "Botiquín de Primeros Auxilios",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del botiquín", fotos: 1 },
      { descripcion: "Inventario de contenido", fotos: 2 },
      { descripcion: "Verificación de fechas de vencimiento", fotos: 1 },
      { descripcion: "Reposición de elementos faltantes", fotos: 1 },
      { descripcion: "Estado final completo", fotos: 1 },
    ],
  },

  senalizacion: {
    nombre: "Señalización de Seguridad",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial de la señal", fotos: 1 },
      { descripcion: "Limpieza y verificación de visibilidad", fotos: 1 },
      { descripcion: "Verificación de fijación", fotos: 1 },
      { descripcion: "Estado final de la señal", fotos: 1 },
    ],
  },

  equipoComputo: {
    nombre: "Equipo de Cómputo",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del equipo", fotos: 1 },
      { descripcion: "Limpieza externa e interna", fotos: 2 },
      { descripcion: "Actualización de software", fotos: 1 },
      { descripcion: "Verificación de funcionamiento", fotos: 1 },
      { descripcion: "Estado final operativo", fotos: 1 },
    ],
  },

  aireAcondicionado: {
    nombre: "Aire Acondicionado",
    modelo: "",
    tipoMantenimiento: "Preventivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del equipo", fotos: 1 },
      { descripcion: "Limpieza de filtros", fotos: 2 },
      { descripcion: "Revisión de nivel de gas refrigerante", fotos: 1 },
      { descripcion: "Limpieza de serpentines", fotos: 2 },
      { descripcion: "Prueba de funcionamiento", fotos: 1 },
      { descripcion: "Estado final operativo", fotos: 1 },
    ],
  },

  instalacionElectrica: {
    nombre: "Instalación Eléctrica",
    modelo: "",
    tipoMantenimiento: "Correctivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Problema identificado", fotos: 2 },
      { descripcion: "Diagnóstico del fallo", fotos: 1 },
      { descripcion: "Proceso de reparación", fotos: 2 },
      { descripcion: "Pruebas de funcionamiento", fotos: 1 },
      { descripcion: "Instalación reparada", fotos: 1 },
    ],
  },

  mobiliario: {
    nombre: "Mobiliario de Oficina",
    modelo: "",
    tipoMantenimiento: "Correctivo",
    cantidad: 1,
    pasos: [
      { descripcion: "Estado inicial del mobiliario", fotos: 2 },
      { descripcion: "Daño identificado", fotos: 1 },
      { descripcion: "Proceso de reparación", fotos: 2 },
      { descripcion: "Estado final reparado", fotos: 1 },
    ],
  },
};

/**
 * Obtiene una plantilla por su clave
 */
export function getTemplate(key) {
  return productTemplates[key] ? { ...productTemplates[key] } : null;
}

/**
 * Obtiene todas las plantillas disponibles
 */
export function getAllTemplates() {
  return Object.entries(productTemplates).map(([key, template]) => ({
    key,
    nombre: template.nombre,
    tipo: template.tipoMantenimiento,
  }));
}
