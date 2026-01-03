// Funciones helper para cargar y trabajar con los datos de adquisiciones

// Importar los datos JSON
import adquisicionesTotalesData from '../src/data/adquisiciones-totales.json';
import adquisicionesPorMesData from '../src/data/adquisiciones-por-mes.json';
import adquisicionesPorDependenciaData from '../src/data/adquisiciones-por-dependencia.json';
import metadataData from '../src/data/metadata.json';
import dependenciasDetalleCompletoData from '../src/data/dependencias-detalle-completo.json';

// Funciones para obtener los datos
export function getAdquisicionesTotales() {
  return adquisicionesTotalesData;
}

export function getAdquisicionesPorMes() {
  return adquisicionesPorMesData;
}

export function getAdquisicionesPorDependencia() {
  return adquisicionesPorDependenciaData;
}

export function getMetadata() {
  return metadataData;
}

/**
 * Obtiene el detalle completo de todas las dependencias
 * Incluye todos los productos (adquisiciones, mantenimientos, etc.)
 * @returns {Object} Objeto con metadata y array de dependencias con todos sus productos
 */
export function getDependenciasDetalleCompleto() {
  return dependenciasDetalleCompletoData;
}

// Funciones helper útiles

/**
 * Obtiene los productos de un mes específico
 * @param {number} mes - Número del mes (1, 2, o 3)
 * @returns {Array} Array de productos del mes
 */
export function getProductosPorMes(mes) {
  const data = getAdquisicionesPorMes();
  const mesData = data.meses.find(m => m.mes === mes);
  return mesData?.productos || [];
}

/**
 * Obtiene una dependencia específica por nombre
 * @param {string} nombre - Nombre de la dependencia a buscar
 * @returns {Object|undefined} Objeto de dependencia o undefined
 */
export function getDependencia(nombre) {
  const data = getAdquisicionesPorDependencia();
  return data.dependencias.find(d => 
    d.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

/**
 * Obtiene todas las dependencias de un mes específico
 * @param {number} mes - Número del mes (1, 2, o 3)
 * @returns {Array} Array de dependencias del mes
 */
export function getDependenciasPorMes(mes) {
  const data = getAdquisicionesPorDependencia();
  return data.dependencias.filter(d => d.mes === mes);
}

/**
 * Busca productos por nombre (búsqueda parcial)
 * @param {string} termino - Término de búsqueda
 * @returns {Array} Array de productos que coinciden
 */
export function buscarProductos(termino) {
  const data = getAdquisicionesTotales();
  return data.productos.filter(p => 
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  );
}

/**
 * Obtiene el top N de productos por cantidad
 * @param {number} n - Número de productos a retornar (default: 10)
 * @returns {Array} Array de los N productos con mayor cantidad
 */
export function getTopProductos(n = 10) {
  const data = getAdquisicionesTotales();
  return data.productos.slice(0, n);
}

/**
 * Calcula estadísticas generales
 * @returns {Object} Objeto con estadísticas generales
 */
export function getEstadisticas() {
  const metadata = getMetadata();
  const porMes = getAdquisicionesPorMes();
  
  return {
    totalProductos: metadata.resumen.total_productos_unicos,
    totalUnidades: metadata.resumen.total_unidades,
    totalDependencias: metadata.resumen.total_dependencias,
    promedioUnidadesPorMes: Math.round(
      metadata.resumen.total_unidades / metadata.resumen.total_meses
    ),
    distribucionPorMes: porMes.meses.map(m => ({
      mes: m.mes,
      unidades: m.total_unidades,
      porcentaje: Math.round((m.total_unidades / metadata.resumen.total_unidades) * 100)
    }))
  };
}

/**
 * Normaliza un nombre para comparación
 * @param {string} nombre - Nombre a normalizar
 * @returns {string} Nombre normalizado
 */
function normalizarNombre(nombre) {
  return nombre
    .toUpperCase()
    .replace(/\./g, '')
    .replace(/,/g, '')
    .replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ó/g, 'O')
    .replace(/Ú/g, 'U')
    .replace(/Ñ/g, 'N')
    .trim();
}

/**
 * Obtiene el detalle completo de una dependencia específica
 * Incluye todos los productos (no solo adquisiciones)
 * @param {string} nombre - Nombre de la dependencia a buscar
 * @returns {Object|undefined} Objeto de dependencia con todos sus productos o undefined
 */
export function getDependenciaDetalleCompleto(nombre) {
  const data = getDependenciasDetalleCompleto();
  const nombreNorm = normalizarNombre(nombre);
  
  // Primero intentar coincidencia exacta
  let resultado = data.dependencias.find(d => 
    normalizarNombre(d.nombre) === nombreNorm
  );
  
  if (resultado) return resultado;
  
  // Luego intentar coincidencia parcial (uno contiene al otro)
  resultado = data.dependencias.find(d => {
    const depNorm = normalizarNombre(d.nombre);
    return depNorm.includes(nombreNorm) || nombreNorm.includes(depNorm);
  });
  
  if (resultado) return resultado;
  
  // Finalmente, intentar por palabras clave compartidas
  const palabrasNombre = nombreNorm.split(/\s+/).filter(p => p.length > 3);
  
  resultado = data.dependencias.find(d => {
    const depNorm = normalizarNombre(d.nombre);
    const palabrasDep = depNorm.split(/\s+/).filter(p => p.length > 3);
    
    // Contar palabras en común
    const palabrasComunes = palabrasNombre.filter(p => palabrasDep.includes(p));
    
    // Si comparten al menos 2 palabras significativas, es una coincidencia
    return palabrasComunes.length >= 2;
  });
  
  return resultado;
}

/**
 * Filtra productos por tipo
 * @param {string} nombre - Nombre de la dependencia
 * @param {string} tipo - Tipo de producto: 'adquisicion', 'mantenimiento_preventivo', 'mantenimiento_correctivo', 'mantenimiento', 'otro'
 * @returns {Array} Array de productos del tipo especificado
 */
export function getProductosPorTipo(nombre, tipo) {
  const dep = getDependenciaDetalleCompleto(nombre);
  if (!dep) return [];
  return dep.productos.filter(p => p.tipo === tipo);
}

/**
 * Obtiene todas las adquisiciones de una dependencia
 * @param {string} nombre - Nombre de la dependencia
 * @returns {Array} Array de productos de tipo adquisición
 */
export function getAdquisicionesDependencia(nombre) {
  return getProductosPorTipo(nombre, 'adquisicion');
}

/**
 * Obtiene todos los mantenimientos de una dependencia
 * @param {string} nombre - Nombre de la dependencia
 * @param {string} tipoMantenimiento - Opcional: 'preventivo', 'correctivo', o undefined para todos
 * @returns {Array} Array de productos de mantenimiento
 */
export function getMantenimientosDependencia(nombre, tipoMantenimiento) {
  const dep = getDependenciaDetalleCompleto(nombre);
  if (!dep) return [];
  
  if (!tipoMantenimiento) {
    return dep.productos.filter(p => 
      p.tipo.includes('mantenimiento')
    );
  }
  
  return dep.productos.filter(p => 
    p.tipo === `mantenimiento_${tipoMantenimiento}`
  );
}

/**
 * Obtiene estadísticas de una dependencia específica
 * @param {string} nombre - Nombre de la dependencia
 * @returns {Object|null} Objeto con estadísticas de la dependencia
 */
export function getEstadisticasDependencia(nombre) {
  const dep = getDependenciaDetalleCompleto(nombre);
  if (!dep) return null;
  
  const porTipo = {
    adquisicion: 0,
    mantenimiento_preventivo: 0,
    mantenimiento_correctivo: 0,
    mantenimiento: 0,
    otro: 0
  };
  
  dep.productos.forEach(p => {
    porTipo[p.tipo]++;
  });
  
  return {
    nombre: dep.nombre,
    mes: dep.mes,
    totalProductos: dep.total_productos,
    porTipo: porTipo
  };
}
