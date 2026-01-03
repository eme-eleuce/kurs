/**
 * Plantillas de mantenimiento preventivo y correctivo
 * Cada plantilla incluye el nombre del producto y sus pasos específicos
 */

export const maintenanceTemplates = {
  // BANCO DE VÁLVULAS
  "BANCO DE VÁLVULAS PARA ROCIADORES - PREVENTIVO": {
    nombre: "BANCO DE VÁLVULAS PARA ROCIADORES",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Revisar las válvulas de entrada/salida para asegurar que funcionen sin obstrucciones", fotos: 2 },
      { descripcion: "Aplicar lubricante a los vástagos, manijas o componentes móviles según especificación del fabricante", fotos: 2 },
      { descripcion: "Inspeccionar empaques, juntas o adaptadores, y reemplazarlos si están deteriorados", fotos: 2 },
      { descripcion: "Asegurarse de que todas las conexiones estén firmes, alineadas y libres de fugas", fotos: 1 },
      { descripcion: "Confirmar el estado de actuadores eléctricos, neumáticos o hidráulicos", fotos: 1 },
    ],
  },

  // BOMBA JOCKEY
  "BOMBA JOCKEY - CORRECTIVO": {
    nombre: "BOMBA JOCKEY",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reparación o reemplazo de sello mecánico con fugas", fotos: 2 },
      { descripcion: "Cambio de rodamientos dañados o con ruido", fotos: 2 },
      { descripcion: "Reparación de fallas eléctricas en el motor o tablero", fotos: 2 },
      { descripcion: "Sustitución de piezas desgastadas o defectuosas", fotos: 2 },
      { descripcion: "Corrección de desalineación de acoplamientos", fotos: 1 },
      { descripcion: "Reparación de fugas en la carcasa o conexiones", fotos: 2 },
      { descripcion: "Verificación y calibración del encendido automático mediante el presostato y cambio en caso de ser necesario", fotos: 2 },
    ],
  },

  "BOMBA JOCKEY - PREVENTIVO": {
    nombre: "BOMBA JOCKEY",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Cambio de sello mecánico", fotos: 2 },
      { descripcion: "Cambio de rodamientos", fotos: 2 },
      { descripcion: "Engrase de cojinetes del motor", fotos: 1 },
      { descripcion: "Revisión de alineación de acoplamientos", fotos: 1 },
      { descripcion: "Limpieza general de la bomba y motor", fotos: 2 },
      { descripcion: "Verificación de la presión de operación y funcionamiento automático", fotos: 1 },
      { descripcion: "Revisión de conexiones eléctricas y estado del tablero de control", fotos: 2 },
      { descripcion: "Verificación y calibración del encendido automático mediante el presostato y cambio en caso de ser necesario", fotos: 2 },
    ],
  },

  // BOMBA PRINCIPAL ELÉCTRICA
  "BOMBA PRINCIPAL ELÉCTRICA - CORRECTIVO": {
    nombre: "BOMBA PRINCIPAL ELÉCTRICA",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reparación o reemplazo de contactores, relés térmicos o tablero anexo", fotos: 2 },
      { descripcion: "Sustitución de barras y terminales defectuosos", fotos: 2 },
      { descripcion: "Cambio de piezas dañadas (sello, rodamientos, acoplamientos)", fotos: 2 },
      { descripcion: "Reparación de fugas o daños en la carcasa", fotos: 2 },
      { descripcion: "Reparación de fallas eléctricas en el motor o sistema de control", fotos: 2 },
    ],
  },

  "BOMBA PRINCIPAL ELÉCTRICA - PREVENTIVO": {
    nombre: "BOMBA PRINCIPAL ELÉCTRICA",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Cambio de sello mecánico", fotos: 2 },
      { descripcion: "Lubricación de cojinetes de la bomba", fotos: 1 },
      { descripcion: "Inspección y ajuste de la alineación de acoplamientos", fotos: 1 },
      { descripcion: "Limpieza de rejillas de succión de cisterna o reservorio", fotos: 2 },
      { descripcion: "Cambio de aceite del motor", fotos: 2 },
      { descripcion: "Revisión de conexiones eléctricas y tablero de control", fotos: 2 },
      { descripcion: "Prueba de arranque y funcionamiento bajo carga", fotos: 1 },
      { descripcion: "Verificación de presión y caudal", fotos: 1 },
      { descripcion: "Verificación y calibración del encendido automático mediante el presostato", fotos: 2 },
    ],
  },

  // BOMBA PRINCIPAL COMBUSTIÓN
  "BOMBA PRINCIPAL COMBUSTIÓN - PREVENTIVO": {
    nombre: "BOMBA PRINCIPAL COMBUSTIÓN",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Cambio de sello mecánico", fotos: 2 },
      { descripcion: "Lubricación de cojinetes de la bomba", fotos: 1 },
      { descripcion: "Inspección y ajuste de la alineación de acoplamientos", fotos: 1 },
      { descripcion: "Limpieza de rejillas de succión", fotos: 2 },
      { descripcion: "Cambio de aceite del motor y filtro de aceite", fotos: 2 },
      { descripcion: "Cambio de filtro de aire", fotos: 2 },
      { descripcion: "Cambio de filtro de combustible y limpieza de colector de sedimentos", fotos: 2 },
      { descripcion: "Revisión y cambio de refrigerante", fotos: 2 },
      { descripcion: "Cambio de termostato", fotos: 2 },
      { descripcion: "Reemplazo de baterías", fotos: 2 },
      { descripcion: "Verificación y ajuste de bandas", fotos: 1 },
      { descripcion: "Limpieza o cambio de respiradero del cárter", fotos: 1 },
      { descripcion: "Prueba de arranque y autonomía", fotos: 1 },
      { descripcion: "Revisión de interruptores de circuito y fusibles", fotos: 1 },
      { descripcion: "Verificación y calibración del encendido automático mediante el presostato", fotos: 2 },
    ],
  },

  "BOMBA PRINCIPAL COMBUSTIÓN - CORRECTIVO": {
    nombre: "BOMBA PRINCIPAL COMBUSTIÓN",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reparación o reemplazo de piezas dañadas del motor", fotos: 2 },
      { descripcion: "Reparación de fugas de combustible, aceite o refrigerante", fotos: 2 },
      { descripcion: "Sustitución de baterías defectuosas", fotos: 2 },
      { descripcion: "Reparación de fallas en el sistema de arranque", fotos: 2 },
      { descripcion: "Cambio de acoplamientos, rodamientos o sello en mal estado", fotos: 2 },
      { descripcion: "Reparación de tablero de control o sistemas eléctricos asociados", fotos: 2 },
    ],
  },

  // CONTROLADOR DE BOMBAS
  "CONTROLADOR DE BOMBAS - PREVENTIVO": {
    nombre: "CONTROLADOR DE BOMBAS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza interna/externa", fotos: 2 },
      { descripcion: "Ajuste de dispositivos (relés, disyuntores, contactores)", fotos: 2 },
      { descripcion: "Verificación de torque en terminales", fotos: 1 },
      { descripcion: "Revisión de funcionamiento de sensores, PLCs, y software", fotos: 2 },
    ],
  },

  // EDUCTOR DE ESPUMA
  "EDUCTOR DE ESPUMA CONTRA INCENDIOS EN TUBERÍA DE 6\" - PREVENTIVO": {
    nombre: "EDUCTOR DE ESPUMA CONTRA INCENDIOS EN TUBERÍA DE 6\"",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Revisar las válvulas de entrada/salida para asegurar que funcionen sin obstrucciones", fotos: 2 },
      { descripcion: "Confirmar que el orificio de mezcla esté libre de residuos o bloqueos", fotos: 1 },
      { descripcion: "Inspeccionar empaques, juntas o adaptadores, y reemplazarlos si están deteriorados", fotos: 2 },
      { descripcion: "Asegurarse de que todas las conexiones estén firmes, alineadas y libres de fugas", fotos: 1 },
      { descripcion: "Verificar que el eductor aspire correctamente el concentrado de espuma", fotos: 2 },
    ],
  },

  // GABINETE CONTRA INCENDIOS
  "GABINETE CONTRA INCENDIOS - CORRECTIVO": {
    nombre: "GABINETE CONTRA INCENDIOS",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reparación de estructura dañada", fotos: 2 },
      { descripcion: "Reparación de Cerradura", fotos: 2 },
      { descripcion: "Pintura de la Estructura", fotos: 2 },
    ],
  },

  "GABINETE CONTRA INCENDIOS - PREVENTIVO": {
    nombre: "GABINETE CONTRA INCENDIOS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Inspección general del gabinete, estructura y bisagras", fotos: 2 },
      { descripcion: "Reparación de Cerradura", fotos: 2 },
      { descripcion: "Limpieza y lubricación de componentes móviles", fotos: 1 },
      { descripcion: "Revisión de manómetros y presión", fotos: 1 },
      { descripcion: "Pintura de gabinete si es necesario", fotos: 2 },
    ],
  },

  // HIDRANTES
  "HIDRANTES DE 6\" - PREVENTIVO": {
    nombre: "HIDRANTES DE 6\"",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza exterior del cuerpo del hidrante y área circundante para facilitar su acceso y operación", fotos: 2 },
      { descripcion: "Revisión del estado de las tapas, cadenas, empaques, roscas y reemplazándolos si es necesario", fotos: 2 },
      { descripcion: "Engrase del vástago, tapas y componentes móviles según lo especificado por el fabricante", fotos: 1 },
      { descripcion: "Apertura completa del hidrante para verificar el funcionamiento correcto de la válvula principal", fotos: 2 },
      { descripcion: "Prueba de caudal y presión residual mediante instrumentos adecuados para evaluar el desempeño hidráulico", fotos: 2 },
      { descripcion: "Revisión de fugas durante la operación y cierre; inspección de empaques y reemplazándolos si es necesario", fotos: 2 },
    ],
  },

  // TUBERÍA DE SISTEMAS HIDRÁULICOS
  "METROS LINEALES DE TUBERÍA DE SISTEMAS HIDRÁULICOS - PREVENTIVO": {
    nombre: "METROS LINEALES DE TUBERÍA DE SISTEMAS HIDRÁULICOS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Revisión de obstrucciones en tuberías", fotos: 2 },
      { descripcion: "Prueba de presión y fugas", fotos: 2 },
      { descripcion: "Pintura de la Tubería", fotos: 2 },
    ],
  },

  "METROS LINEALES DE TUBERÍA DE SISTEMAS HIDRÁULICOS - CORRECTIVO": {
    nombre: "METROS LINEALES DE TUBERÍA DE SISTEMAS HIDRÁULICOS",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Cambios de partes de tubería deterioradas por la corrosión", fotos: 2 },
      { descripcion: "Prueba de presión y fugas", fotos: 2 },
      { descripcion: "Pintura de la Tubería", fotos: 2 },
    ],
  },

  // MONITORES CONTRA INCENDIOS
  "MONITORES CONTRA INCENDIOS DE 2 1/2\" - PREVENTIVO": {
    nombre: "MONITORES CONTRA INCENDIOS DE 2 1/2\"",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza externa del cuerpo del monitor para remover polvo, residuos, óxido superficial", fotos: 2 },
      { descripcion: "Verificación del libre movimiento horizontal y vertical del monitor, asegurando que los mecanismos de rotación y elevación operen sin trabas", fotos: 2 },
      { descripcion: "Lubricación de las partes móviles: juntas, ejes, engranajes o rodamientos según recomendación del fabricante", fotos: 1 },
      { descripcion: "Revisión del sistema de fijación o anclaje para asegurar que el monitor esté firmemente sujeto a su base o pedestal", fotos: 1 },
      { descripcion: "Prueba operativa con flujo de agua para verificar caudal, presión y patrón de chorro (niebla, sólido, etc.)", fotos: 2 },
      { descripcion: "Verificación de ausencia de fugas en uniones, empaques y reemplazándolos si es necesario", fotos: 2 },
    ],
  },

  // ROCIADORES
  "ROCIADORES - PREVENTIVO": {
    nombre: "ROCIADORES",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Inspección visual de rociadores, limpieza de boquillas", fotos: 2 },
      { descripcion: "Revisión de obstrucciones en tuberías", fotos: 1 },
      { descripcion: "Prueba de presión y fugas", fotos: 2 },
    ],
  },

  // SIAMESAS / SIAMESA
  "SIAMESAS - PREVENTIVO": {
    nombre: "SIAMESAS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza externa del cuerpo de la siamesa para remover suciedad, pintura, corrosión o residuos acumulados", fotos: 2 },
      { descripcion: "Revisión del estado de empaques y juntas para prevenir fugas o pérdida de estanqueidad y reemplazándolos si es necesario", fotos: 2 },
      { descripcion: "Ajustar el estado de las roscas hembra para asegurar que estén limpias, sin daños y permitan una conexión rápida y segura", fotos: 1 },
      { descripcion: "Ajustar la válvula de retención interna, asegurando que esté operativa y libre de obstrucciones o corrosión", fotos: 2 },
      { descripcion: "Colocar señaletica visible de \"USO EXCLUSIVO DEL BCBG\"", fotos: 1 },
    ],
  },

  "SIAMESA - PREVENTIVO": {
    nombre: "SIAMESA",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza externa del cuerpo de la siamesa para remover suciedad, pintura, corrosión o residuos acumulados", fotos: 2 },
      { descripcion: "Revisión del estado de empaques y juntas para prevenir fugas o pérdida de estanqueidad y reemplazándolos si es necesario", fotos: 2 },
      { descripcion: "Ajustar el estado de las roscas hembra para asegurar que estén limpias, sin daños y permitan una conexión rápida y segura", fotos: 1 },
      { descripcion: "Ajustar la válvula de retención interna, asegurando que esté operativa y libre de obstrucciones o corrosión", fotos: 2 },
      { descripcion: "Colocar señaletica visible de \"USO EXCLUSIVO DEL BCBG\"", fotos: 1 },
    ],
  },

  "SIAMESAS - CORRECTIVO": {
    nombre: "SIAMESAS",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reemplazo de partes incompletas como tapones macho con cadena, parte móvil de la rosca hembra, cadenas o accesorios de sujeción", fotos: 2 },
      { descripcion: "Reparación o cambio de empaques internos si presentan fugas o desgaste", fotos: 2 },
      { descripcion: "Reparación o cambio de la brida o conexión si presenta fisuras o filtraciones", fotos: 2 },
      { descripcion: "Sustitución de válvula antirretorno, si no asegura la estanqueidad o permite el retorno de agua, debe reemplazarse", fotos: 2 },
    ],
  },

  "SIAMESA - CORRECTIVO": {
    nombre: "SIAMESA",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reemplazo de partes incompletas como tapones macho con cadena, parte móvil de la rosca hembra, cadenas o accesorios de sujeción", fotos: 2 },
      { descripcion: "Reparación o cambio de empaques internos si presentan fugas o desgaste", fotos: 2 },
      { descripcion: "Reparación o cambio de la brida o conexión si presenta fisuras o filtraciones", fotos: 2 },
      { descripcion: "Sustitución de válvula antirretorno, si no asegura la estanqueidad o permite el retorno de agua, debe reemplazarse", fotos: 2 },
    ],
  },

  // TABLERO ELÉCTRICO CONTROLADOR DE BOMBAS
  "TABLERO ELÉCTRICO CONTROLADOR DE BOMBAS - PREVENTIVO": {
    nombre: "TABLERO ELÉCTRICO CONTROLADOR DE BOMBAS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza interna y externa del gabinete del tablero para eliminar polvo, humedad o residuos contaminantes", fotos: 2 },
      { descripcion: "Asegurar el cierre adecuado del gabinete y estado físico de la carcasa, sellos y bisagras", fotos: 1 },
      { descripcion: "Ajuste de conexiones eléctricas de fuerza y control, aplicando torque según especificaciones del fabricante", fotos: 2 },
      { descripcion: "Revisión de señales de alarma, indicadores luminosos, funciones de arranque y paro automático", fotos: 2 },
      { descripcion: "Ajuste del estado del cableado interno y comprobación de voltajes", fotos: 2 },
      { descripcion: "Prueba funcional del arranque de la bomba desde el tablero (modo automático y manual)", fotos: 2 },
    ],
  },

  "TABLERO ELÉCTRICO CONTROLADOR DE BOMBAS - CORRECTIVO": {
    nombre: "TABLERO ELÉCTRICO CONTROLADOR DE BOMBAS",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reemplazo de tarjetas electrónicas, PLCs o módulos de control que presenten fallas o mal funcionamiento", fotos: 2 },
      { descripcion: "Sustitución de contactores, relés térmicos, sensores de voltaje o presión que estén dañados o fuera de especificación", fotos: 2 },
      { descripcion: "Reparación o sustitución de cableado de fuerza o control que presente cortocircuitos, sobrecalentamiento, conexiones sueltas o deterioro del aislamiento", fotos: 2 },
      { descripcion: "Corrección de fallas en la lógica de control, programación del PLC o configuración de alarmas", fotos: 2 },
      { descripcion: "Sustitución de fusibles, disyuntores o terminales defectuosos que afecten el suministro o control de la bomba", fotos: 2 },
      { descripcion: "Restablecimiento de la funcionalidad total del tablero, incluyendo arranque y parada en modo automático y manual", fotos: 1 },
      { descripcion: "Prueba operativa del sistema luego de la intervención correctiva, asegurando la respuesta del tablero y comunicación con los dispositivos asociados", fotos: 2 },
    ],
  },

  // TANQUES DE AGUA
  "TANQUES DE AGUA DE 65 000 GAL - PREVENTIVO": {
    nombre: "TANQUES DE AGUA DE 65 000 GAL",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza de la superficie exterior del tanque y sus componentes para evitar acumulación de residuos, polvo o crecimiento vegetal", fotos: 2 },
      { descripcion: "Pintura o recubrimiento anticorrosivo del tanque, tanto interna como externamente", fotos: 2 },
      { descripcion: "Asegurar el correcto funcionamiento de los sensores de nivel, válvulas de entrada y salida, y tuberías conectadas", fotos: 2 },
      { descripcion: "Verificación de la operación de rebosadero, drenaje y ventilación del tanque", fotos: 2 },
      { descripcion: "Ajustar estado de tapas, registros, bridas, pernos y puntos de acceso para confirmar su hermeticidad y estado físico", fotos: 2 },
    ],
  },

  // TOMA DE AGUA
  "TOMA DE AGUA DE 2 1/2\" - PREVENTIVO": {
    nombre: "TOMA DE AGUA DE 2 1/2\"",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza externa del cuerpo de la toma de agua para remover suciedad, pintura, corrosión o residuos acumulados", fotos: 2 },
      { descripcion: "Revisión del estado de empaques y juntas para prevenir fugas o pérdida de estanqueidad y reemplazándolos si es necesario", fotos: 2 },
      { descripcion: "Ajustar el estado de las roscas hembra para asegurar que estén limpias, sin daños y permitan una conexión rápida y segura", fotos: 1 },
      { descripcion: "Colocar señaletica visible de \"USO EXCLUSIVO DEL BCBG\"", fotos: 1 },
    ],
  },

  // VÁLVULA DE COMPUERTA
  "VÁLVULA DE COMPUERTA DE 4 PULG - CORRECTIVO": {
    nombre: "VÁLVULA DE COMPUERTA DE 4 PULG",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reparación o sustitución del vástago de la válvula si presenta agarrotamiento, doblado o daño mecánico", fotos: 2 },
      { descripcion: "Reemplazo del empaque o sello interno si se detectan fugas por el eje o cuerpo de la válvula", fotos: 2 },
      { descripcion: "Sustitución del volante (maneral) si está dañado, deformado o ausente", fotos: 2 },
      { descripcion: "Corrección de fugas en la unión entre bridas mediante reemplazo de empaques o ajuste de pernos", fotos: 2 },
      { descripcion: "Limpieza interna de la válvula en caso de obstrucciones por sedimentos, óxido o cuerpos extraños", fotos: 2 },
      { descripcion: "Rectificación o reemplazo del disco u obturador si hay desgaste excesivo o falla en el cierre hermético", fotos: 2 },
      { descripcion: "Aplicación de lubricante en componentes internos para facilitar el giro y evitar futuras obstrucciones", fotos: 1 },
      { descripcion: "Realización de prueba de apertura y cierre completa tras la reparación para asegurar operación funcional", fotos: 2 },
    ],
  },

  // VÁLVULA DE VÁSTAGO
  "VÁLVULA DE VÁSTAGO DE 6 PULG - PREVENTIVO": {
    nombre: "VÁLVULA DE VÁSTAGO DE 6 PULG",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Inspección del cuerpo de la válvula para verificar corrosión, golpes o presencia de fugas", fotos: 2 },
      { descripcion: "Limpieza del vástago expuesto y del cuerpo de la válvula para retirar polvo, grasa, pintura suelta o residuos acumulados", fotos: 2 },
      { descripcion: "Lubricación del vástago roscado (en válvulas OS&Y) para facilitar el movimiento ascendente/descendente", fotos: 1 },
      { descripcion: "Ajuste de la posición del vástago y del volante para asegurar que la válvula esté en estado completamente abierto o cerrado según corresponda", fotos: 1 },
      { descripcion: "Prueba de estanqueidad en sistema presurizado para asegurar cierre hermético", fotos: 2 },
    ],
  },

  // CONTROLADORA DE SIRENAS
  "CONTROLADORA DE SIRENAS - PREVENTIVO": {
    nombre: "CONTROLADORA DE SIRENAS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza interna y externa del módulo de control, eliminando polvo y residuos de ventilación o entorno", fotos: 2 },
      { descripcion: "Verificación del estado y fijación de los cables de entrada y salida, revisando terminales, conexiones y ausencia de falsos contactos", fotos: 2 },
      { descripcion: "Prueba de activación manual y remota de las sirenas para validar la correcta emisión de señal sonora", fotos: 2 },
      { descripcion: "Revisión de los indicadores LED o pantallas, confirmando estado normal o detección de fallas", fotos: 1 },
      { descripcion: "Confirmación del enlace con el panel de detección o sistema de activación automatizada", fotos: 1 },
    ],
  },

  // DETECTOR DE HUMO
  "DETECTOR DE HUMO - CORRECTIVO": {
    nombre: "DETECTOR DE HUMO",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reubicar detectores que estén mal ubicados para su correcto funcionamiento y detección", fotos: 2 },
      { descripcion: "Instalación de tubería EMT y cableado contra incendios para su reubicación", fotos: 2 },
    ],
  },

  "DETECTOR DE HUMO - PREVENTIVO": {
    nombre: "DETECTOR DE HUMO",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza interior del detector para remover acumulación de polvo y partículas", fotos: 2 },
      { descripcion: "Limpieza de borneras y contactos eléctricos del detector", fotos: 1 },
      { descripcion: "Ajustar la correcta fijación del detector a su base o soporte", fotos: 1 },
      { descripcion: "Prueba funcional mediante humo calibrado o simulador aprobado para confirmar la capacidad de activación", fotos: 2 },
      { descripcion: "Comprobación de señal de alarma enviada correctamente al panel de control", fotos: 1 },
      { descripcion: "Verificación de direccionamiento y comunicación con el sistema (en sistemas direccionables)", fotos: 1 },
    ],
  },

  // DETECTOR DE HUMO FOTOBEAMS
  "DETECTOR DE HUMO (FOTOBEAMS) - PREVENTIVO": {
    nombre: "DETECTOR DE HUMO (FOTOBEAMS)",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza de las lentes ópticas del emisor y receptor con paño seco y suave para eliminar polvo, humedad o suciedad acumulada", fotos: 2 },
      { descripcion: "Verificación del campo libre entre ambos dispositivos, asegurando que no haya obstrucciones o interferencias en la trayectoria del haz", fotos: 1 },
      { descripcion: "Prueba de funcionamiento mediante generación de humo simulado o prueba funcional para comprobar correcta activación", fotos: 2 },
      { descripcion: "Revisión de las señales de falla, alineación y alarma registradas en el panel de control o módulo asociado", fotos: 2 },
      { descripcion: "Ajuste de la programación de sensibilidad y temporización según condiciones del entorno y configuración aprobada", fotos: 1 },
    ],
  },

  // DETECTOR DE HUMO/TEMPERATURA
  "DETECTOR DE HUMO/TEMPERATURA - PREVENTIVO": {
    nombre: "DETECTOR DE HUMO/TEMPERATURA",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza del sensor, remover partículas de polvo que puedan afectar la detección", fotos: 2 },
      { descripcion: "Prueba funcional de la detección de humo con generador de humo aprobado o simulador específico", fotos: 2 },
      { descripcion: "Prueba funcional de la detección de temperatura con dispositivo térmico simulado (calor controlado) que alcance el umbral de activación", fotos: 2 },
      { descripcion: "Verificación de la activación de la señal de alarma en el panel de control ante estímulo de humo y calor", fotos: 1 },
      { descripcion: "Confirmación de la alimentación eléctrica y comunicación correcta con el sistema", fotos: 1 },
      { descripcion: "Ajustar el montaje firme en su base o soporte, en la ubicación adecuada según diseño", fotos: 1 },
    ],
  },

  // ESTACIONES MANUALES
  "ESTACIONES MANUALES - PREVENTIVO": {
    nombre: "ESTACIONES MANUALES",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Colocar señaletica visible", fotos: 1 },
      { descripcion: "Limpieza externa del dispositivo para retirar polvo, grasa u otros contaminantes", fotos: 1 },
      { descripcion: "Prueba funcional de activación real supervisada, validando la señal de alarma en el panel de control", fotos: 2 },
      { descripcion: "Confirmación de restablecimiento correcto del dispositivo después de la prueba", fotos: 1 },
      { descripcion: "Ajuste del cableado, terminales y fijación del dispositivo a la pared o estructura", fotos: 2 },
      { descripcion: "Verificación del número de identificación o dirección del dispositivo (en sistemas direccionables)", fotos: 1 },
    ],
  },

  // LUCES ESTROBOSCÓPICAS
  "LUCES ESTROBOSCÓPICAS - PREVENTIVO": {
    nombre: "LUCES ESTROBOSCÓPICAS",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza externa de la carcasa y lente de la estroboscópica con paño seco o aire comprimido para asegurar visibilidad y funcionamiento", fotos: 2 },
      { descripcion: "Ajustar el montaje y sujeción firme del dispositivo a la superficie o caja de conexiones", fotos: 1 },
      { descripcion: "Prueba de activación funcional desde el panel de control para confirmar respuesta visual efectiva", fotos: 2 },
      { descripcion: "Asegurar el patrón de destello y frecuencia conforme a los parámetros establecidos por el fabricante", fotos: 1 },
      { descripcion: "Revisión de sincronización (en sistemas sincronizados) para evitar destellos fuera de fase", fotos: 1 },
    ],
  },

  // PANEL DE DETECCIÓN
  "PANEL DE DETECCIÓN - CORRECTIVO": {
    nombre: "PANEL DE DETECCIÓN",
    tipo: "CORRECTIVO",
    pasos: [
      { descripcion: "Reemplazo de detectores, estaciones manuales o luces estroboscópicas defectuosas", fotos: 2 },
      { descripcion: "Reparación de paneles de control y cableado", fotos: 2 },
      { descripcion: "Sustitución de baterías agotadas", fotos: 2 },
      { descripcion: "Reparación de teclado o módulos averiados", fotos: 2 },
    ],
  },

  "PANEL DE DETECCIÓN - PREVENTIVO": {
    nombre: "PANEL DE DETECCIÓN",
    tipo: "PREVENTIVO",
    pasos: [
      { descripcion: "Limpieza de detectores de humo y temperatura", fotos: 2 },
      { descripcion: "Prueba de funcionamiento de detectores, estaciones manuales y luces estroboscópicas", fotos: 2 },
      { descripcion: "Revisión y limpieza de paneles de control", fotos: 2 },
      { descripcion: "Verificación y reemplazo de baterías en paneles y dispositivos", fotos: 2 },
      { descripcion: "Revisión de cableado y conexiones", fotos: 2 },
      { descripcion: "Prueba de sirenas y alarmas", fotos: 2 },
    ],
  },
};

/**
 * Busca plantillas que coincidan con el texto ingresado
 */
export function searchMaintenanceTemplates(searchText) {
  if (!searchText || searchText.trim().length < 3) return [];

  const search = searchText.toLowerCase();
  const results = [];

  Object.entries(maintenanceTemplates).forEach(([key, template]) => {
    const nombreMatch = template.nombre.toLowerCase().includes(search);
    const tipoMatch = template.tipo.toLowerCase().includes(search);
    const keyMatch = key.toLowerCase().includes(search);

    if (nombreMatch || tipoMatch || keyMatch) {
      results.push({
        key,
        display: `${template.nombre} - ${template.tipo}`,
        template,
      });
    }
  });

  return results;
}

/**
 * Obtiene una plantilla por su clave
 */
export function getMaintenanceTemplate(key) {
  return maintenanceTemplates[key] || null;
}
