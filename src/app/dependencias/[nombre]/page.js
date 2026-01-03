"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { getDependenciaDetalleCompleto } from "../../../../lib/adquisiciones.js";
import { maintenanceTemplates } from "@/data/maintenanceTemplates";

// Función para buscar la plantilla de mantenimiento
const buscarPlantillaMantenimiento = (nombreProducto, tipo) => {
  // Normalizar el nombre del producto
  const nombreNormalizado = nombreProducto.toUpperCase().trim();
  
  // Buscar coincidencia exacta
  const claveTipo = tipo === 'mantenimiento_preventivo' ? 'PREVENTIVO' : 'CORRECTIVO';
  const claveExacta = `${nombreNormalizado} - ${claveTipo}`;
  
  if (maintenanceTemplates[claveExacta]) {
    return maintenanceTemplates[claveExacta];
  }
  
  // Buscar por palabras clave del producto
  for (const [clave, plantilla] of Object.entries(maintenanceTemplates)) {
    if (plantilla.tipo === claveTipo) {
      const palabrasPlantilla = plantilla.nombre.toUpperCase().split(' ');
      const palabrasProducto = nombreNormalizado.split(' ');
      
      // Si comparten al menos 2 palabras significativas, es una coincidencia
      const coincidencias = palabrasPlantilla.filter(p => 
        p.length > 3 && palabrasProducto.some(pp => pp.includes(p) || p.includes(pp))
      );
      
      if (coincidencias.length >= 2) {
        return plantilla;
      }
    }
  }
  
  return null;
};

export default function DependenciaDetallePage() {
  const params = useParams();
  const router = useRouter();
  const [dependencia, setDependencia] = useState(null);
  const [driveLink, setDriveLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedPreventivos, setExpandedPreventivos] = useState({});
  const [expandedCorrectivos, setExpandedCorrectivos] = useState({});
  const [filtroMantenimiento, setFiltroMantenimiento] = useState('todos'); // 'todos', 'preventivos', 'correctivos'
  const [filtroProductos, setFiltroProductos] = useState('todos'); // 'todos', 'adquisicion', 'mantenimiento_preventivo', 'mantenimiento_correctivo'

  useEffect(() => {
    const loadData = async () => {
      try {
        // Decodificar el nombre de la URL
        const nombreDependencia = decodeURIComponent(params.nombre);
        
        // Obtener detalle de la dependencia
        const detalle = getDependenciaDetalleCompleto(nombreDependencia);
        
        if (!detalle) {
          setLoading(false);
          return;
        }

        setDependencia(detalle);

        // Cargar link de Drive
        try {
          const linksResponse = await fetch("/data/driveLinks.json");
          if (linksResponse.ok) {
            const links = await linksResponse.json();
            const link = links[detalle.nombre] || links[nombreDependencia];
            setDriveLink(link);
          }
        } catch (err) {
          console.error("Error cargando links de Drive:", err);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error cargando dependencia:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [params.nombre]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando detalle...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!dependencia) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Dependencia no encontrada</h2>
            <p className="text-gray-600 mb-4">No se encontró información para esta dependencia</p>
            <button
              onClick={() => router.push("/dependencias")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver al directorio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const adquisiciones = dependencia.productos.filter(p => p.tipo === 'adquisicion');
  const mantPreventivos = dependencia.productos.filter(p => p.tipo === 'mantenimiento_preventivo');
  const mantCorrectivos = dependencia.productos.filter(p => p.tipo === 'mantenimiento_correctivo');
  
  // Filtrar productos según el filtro seleccionado
  const productosFiltrados = filtroProductos === 'todos' 
    ? dependencia.productos 
    : dependencia.productos.filter(p => p.tipo === filtroProductos);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/dependencias")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al directorio
          </button>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-3">{dependencia.nombre}</h1>
            <div className="flex flex-wrap gap-4">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-black font-medium">
                📅 Mes {dependencia.mes}
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-black font-medium">
                📊 {dependencia.total_productos} productos
              </span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mb-6 flex flex-wrap gap-4">
          {driveLink && (
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg font-semibold text-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Ver imágenes de la dependencia
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          <button
            onClick={() => router.push(`/mapa?dependencia=${encodeURIComponent(dependencia.nombre)}`)}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg font-semibold text-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ver ubicación en el mapa
          </button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-3xl font-bold text-gray-800">{dependencia.total_productos}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Adquisiciones</p>
                <p className="text-3xl font-bold text-blue-600">{adquisiciones.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mant. Preventivo</p>
                <p className="text-3xl font-bold text-green-600">{mantPreventivos.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Mant. Correctivo</p>
                <p className="text-3xl font-bold text-orange-600">{mantCorrectivos.length}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Detalle de Productos</h2>
            
            {/* Filtros de tipo de producto */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFiltroProductos('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filtroProductos === 'todos'
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Todos ({dependencia.productos.length})
              </button>
              <button
                onClick={() => setFiltroProductos('adquisicion')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filtroProductos === 'adquisicion'
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Adquisiciones ({adquisiciones.length})
              </button>
              <button
                onClick={() => setFiltroProductos('mantenimiento_preventivo')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filtroProductos === 'mantenimiento_preventivo'
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Preventivo ({mantPreventivos.length})
              </button>
              <button
                onClick={() => setFiltroProductos('mantenimiento_correctivo')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  filtroProductos === 'mantenimiento_correctivo'
                    ? "bg-orange-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Correctivo ({mantCorrectivos.length})
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cant.</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Marca</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Modelo</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productosFiltrados.map((producto, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {producto.cantidad}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {producto.item}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                        producto.tipo === 'adquisicion' ? 'bg-blue-100 text-blue-800' :
                        producto.tipo === 'mantenimiento_preventivo' ? 'bg-green-100 text-green-800' :
                        producto.tipo === 'mantenimiento_correctivo' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {producto.tipo === 'adquisicion' ? 'Adquisición' :
                         producto.tipo === 'mantenimiento_preventivo' ? 'Mant. Preventivo' :
                         producto.tipo === 'mantenimiento_correctivo' ? 'Mant. Correctivo' :
                         producto.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {producto.marca || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {producto.modelo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {producto.codigo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {producto.accion}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sección de Mantenimientos */}
        {(mantPreventivos.length > 0 || mantCorrectivos.length > 0) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Plan de Mantenimientos</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mantenimientos Preventivos */}
              {mantPreventivos.length > 0 && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-green-600 text-white p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mantenimientos Preventivos ({mantPreventivos.length})
                    </h3>
                  </div>
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    <div className="space-y-4">
                      {mantPreventivos.map((producto, idx) => {
                        const plantilla = buscarPlantillaMantenimiento(producto.item, 'mantenimiento_preventivo');
                        const isExpanded = expandedPreventivos[idx] || false;
                        
                        return (
                          <div key={idx} className="border border-green-200 bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div 
                              className="p-4 cursor-pointer hover:bg-green-50 transition-colors"
                              onClick={() => setExpandedPreventivos(prev => ({...prev, [idx]: !prev[idx]}))}
                            >
                              <div className="flex items-start gap-3">
                                <span className="bg-green-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg min-w-[3rem] text-center">
                                  {producto.cantidad}x
                                </span>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-base">{producto.item}</h4>
                                  {(producto.marca || producto.modelo) && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {producto.marca && `${producto.marca}`}
                                      {producto.marca && producto.modelo && ' - '}
                                      {producto.modelo && `${producto.modelo}`}
                                    </p>
                                  )}
                                </div>
                                <button className="text-green-600 hover:text-green-700 transition-transform">
                                  <svg 
                                    className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            {isExpanded && (
                              <div className="px-4 pb-4 space-y-2">
                                {plantilla && plantilla.pasos && (
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded w-full">
                                  <p className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    Pasos a Seguir:
                                  </p>
                                  <ol className="space-y-2.5 ml-1">
                                    {plantilla.pasos.map((paso, pIdx) => (
                                      <li key={pIdx} className="text-sm text-gray-800 leading-relaxed">
                                        <span className="font-bold text-blue-700 mr-2">{pIdx + 1}.</span>
                                        {paso.descripcion}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Mantenimientos Correctivos */}
              {mantCorrectivos.length > 0 && (filtroMantenimiento === 'todos' || filtroMantenimiento === 'correctivos') && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-orange-600 text-white p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Mantenimientos Correctivos ({mantCorrectivos.length})
                    </h3>
                  </div>
                  <div className="p-4 max-h-[600px] overflow-y-auto">
                    <div className="space-y-4">
                      {mantCorrectivos.map((producto, idx) => {
                        const plantilla = buscarPlantillaMantenimiento(producto.item, 'mantenimiento_correctivo');
                        const isExpanded = expandedCorrectivos[idx] || false;
                        
                        return (
                          <div key={idx} className="border border-orange-200 bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div 
                              className="p-4 cursor-pointer hover:bg-orange-50 transition-colors"
                              onClick={() => setExpandedCorrectivos(prev => ({...prev, [idx]: !prev[idx]}))}
                            >
                              <div className="flex items-start gap-3">
                                <span className="bg-orange-600 text-white text-sm font-bold px-3 py-1.5 rounded-lg min-w-[3rem] text-center">
                                  {producto.cantidad}x
                                </span>
                                <div className="flex-1">
                                  <h4 className="font-bold text-gray-900 text-base">{producto.item}</h4>
                                  {(producto.marca || producto.modelo) && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                      {producto.marca && `${producto.marca}`}
                                      {producto.marca && producto.modelo && ' - '}
                                      {producto.modelo && `${producto.modelo}`}
                                    </p>
                                  )}
                                </div>
                                <button className="text-orange-600 hover:text-orange-700 transition-transform">
                                  <svg 
                                    className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            {isExpanded && (
                              <div className="px-4 pb-4 space-y-2">
                                {plantilla && plantilla.pasos && (
                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded w-full">
                                  <p className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    Pasos a Seguir:
                                  </p>
                                  <ol className="space-y-2.5 ml-1">
                                    {plantilla.pasos.map((paso, pIdx) => (
                                      <li key={pIdx} className="text-sm text-gray-800 leading-relaxed">
                                        <span className="font-bold text-blue-700 mr-2">{pIdx + 1}.</span>
                                        {paso.descripcion}
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botón de volver al final */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push("/dependencias")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al directorio
          </button>
        </div>
      </div>
    </div>
  );
}
