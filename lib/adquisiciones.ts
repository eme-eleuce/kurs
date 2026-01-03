// Funciones helper para cargar y trabajar con los datos de adquisiciones

import type {
  AdquisicionesTotales,
  AdquisicionesPorMes,
  AdquisicionesPorDependencia,
  Metadata,
  Producto,
  Dependencia,
} from '@/types/adquisiciones';

// Importar los datos JSON
import adquisicionesTotalesData from '@/data/adquisiciones-totales.json';
import adquisicionesPorMesData from '@/data/adquisiciones-por-mes.json';
import adquisicionesPorDependenciaData from '@/data/adquisiciones-por-dependencia.json';
import metadataData from '@/data/metadata.json';

// Funciones para obtener los datos
export function getAdquisicionesTotales(): AdquisicionesTotales {
  return adquisicionesTotalesData as AdquisicionesTotales;
}

export function getAdquisicionesPorMes(): AdquisicionesPorMes {
  return adquisicionesPorMesData as AdquisicionesPorMes;
}

export function getAdquisicionesPorDependencia(): AdquisicionesPorDependencia {
  return adquisicionesPorDependenciaData as AdquisicionesPorDependencia;
}

export function getMetadata(): Metadata {
  return metadataData as Metadata;
}

// Funciones helper útiles

/**
 * Obtiene los productos de un mes específico
 */
export function getProductosPorMes(mes: number): Producto[] {
  const data = getAdquisicionesPorMes();
  const mesData = data.meses.find(m => m.mes === mes);
  return mesData?.productos || [];
}

/**
 * Obtiene una dependencia específica por nombre
 */
export function getDependencia(nombre: string): Dependencia | undefined {
  const data = getAdquisicionesPorDependencia();
  return data.dependencias.find(d => 
    d.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

/**
 * Obtiene todas las dependencias de un mes específico
 */
export function getDependenciasPorMes(mes: number): Dependencia[] {
  const data = getAdquisicionesPorDependencia();
  return data.dependencias.filter(d => d.mes === mes);
}

/**
 * Busca productos por nombre (búsqueda parcial)
 */
export function buscarProductos(termino: string): Producto[] {
  const data = getAdquisicionesTotales();
  return data.productos.filter(p => 
    p.nombre.toLowerCase().includes(termino.toLowerCase())
  );
}

/**
 * Obtiene el top N de productos por cantidad
 */
export function getTopProductos(n: number = 10): Producto[] {
  const data = getAdquisicionesTotales();
  return data.productos.slice(0, n);
}

/**
 * Calcula estadísticas generales
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
