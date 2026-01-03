"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import dependenciasData from "@/data/dependencias-detalle-completo.json";
import { maintenanceTemplates } from "@/data/maintenanceTemplates";
import { generateWordReport } from "@/utils/reportGeneratorV2";

export default function GeneradorV2Page() {
  const [selectedDependencia, setSelectedDependencia] = useState("");
  const [tipoReporte, setTipoReporte] = useState("mantenimiento"); // "mantenimiento" o "adquisiciones"
  const [dependenciaData, setDependenciaData] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Obtener lista de dependencias
  const todasDependencias = dependenciasData.dependencias.map(d => d.nombre).sort();
  
  // Filtrar dependencias según el término de búsqueda
  const dependenciasFiltradas = todasDependencias.filter(dep => 
    dep.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cargar datos de la dependencia seleccionada
  useEffect(() => {
    if (selectedDependencia) {
      const data = dependenciasData.dependencias.find(
        d => d.nombre === selectedDependencia
      );
      
      if (data) {
        if (tipoReporte === "mantenimiento") {
          // Procesar productos con sus pasos de mantenimiento
          const productosConPasos = data.productos
          .filter(p => p.tipo === 'mantenimiento_preventivo' || p.tipo === 'mantenimiento_correctivo')
          .map(producto => {
            // Buscar plantilla de mantenimiento
            const itemNormalizado = producto.item.toLowerCase().trim();
            const tipoParaPlantilla = producto.tipo === 'mantenimiento_preventivo' ? 'preventivo' : 'correctivo';
            
            // Intentar matching exacto primero
            let templateKey = Object.keys(maintenanceTemplates).find(key => {
              const template = maintenanceTemplates[key];
              const templateNombre = template.nombre.toLowerCase().trim();
              const templateTipo = template.tipo.toLowerCase();
              
              return templateNombre === itemNormalizado && templateTipo === tipoParaPlantilla;
            });
            
            // Si no hay match exacto, intentar matching flexible
            if (!templateKey) {
              // Normalizar el nombre del producto
              const normalizarNombre = (nombre) => {
                return nombre
                  .toLowerCase()
                  .trim()
                  // Remover palabras comunes
                  .replace(/\bde\b/g, '')
                  // Normalizar comillas y caracteres especiales - removerlas completamente
                  .replace(/["""']/g, '')
                  // Corregir typos comunes y normalizar acentos
                  .replace(/bastago/g, 'vastago')
                  .replace(/vástago/g, 'vastago')
                  .replace(/válvula/g, 'valvula')
                  .replace(/válvulas/g, 'valvulas')
                  // Normalizar espacios
                  .replace(/\s+/g, ' ')
                  .trim();
              };
              
              const itemNormalizado2 = normalizarNombre(itemNormalizado);
              
              templateKey = Object.keys(maintenanceTemplates).find(key => {
                const template = maintenanceTemplates[key];
                const templateNombre = template.nombre.toLowerCase().trim();
                const templateNormalizado = normalizarNombre(templateNombre);
                const templateTipo = template.tipo.toLowerCase();
                
                // Match exacto normalizado
                if (templateNormalizado === itemNormalizado2 && templateTipo === tipoParaPlantilla) {
                  return true;
                }
                
                // Match con singular/plural - más robusto
                if (templateTipo === tipoParaPlantilla) {
                  // Función para convertir a singular palabra por palabra
                  const toSingular = (text) => {
                    return text.split(' ').map(word => {
                      // Quitar 'es' si termina en 'es', sino quitar 's' si termina en 's'
                      if (word.endsWith('es')) {
                        return word.slice(0, -2); // Quitar 'es'
                      } else if (word.endsWith('s')) {
                        return word.slice(0, -1); // Quitar 's'
                      }
                      return word;
                    }).join(' ');
                  };
                  
                  const itemSingular = toSingular(itemNormalizado2);
                  const templateSingular = toSingular(templateNormalizado);
                  
                  // Comparar singulares
                  if (itemSingular === templateSingular) return true;
                  
                  // Comparar uno singular con otro plural
                  if (itemSingular === templateNormalizado) return true;
                  if (itemNormalizado2 === templateSingular) return true;
                }
                
                return false;
              });
            }
            
            const template = templateKey ? maintenanceTemplates[templateKey] : null;
            
            return {
              ...producto,
              pasos: template ? template.pasos : [],
              tipoTexto: producto.tipo === 'mantenimiento_preventivo' ? 'Mantenimiento Preventivo' : 'Mantenimiento Correctivo'
            };
          });

          setDependenciaData({
            ...data,
            productosConPasos
          });
        } else {
          // Procesar productos de adquisiciones
          const productosAdquisiciones = data.productos
            .filter(p => p.tipo === 'adquisicion')
            .map(producto => ({
              ...producto,
              tipoTexto: 'Adquisición'
            }));

          setDependenciaData({
            ...data,
            productosAdquisiciones
          });
        }
      }
    } else {
      setDependenciaData(null);
    }
  }, [selectedDependencia, tipoReporte]);

  // Generar datos del reporte automáticamente cuando se selecciona dependencia
  useEffect(() => {
    if (dependenciaData) {
      if (tipoReporte === "mantenimiento") {
        setReportData({
          tipo: "mantenimiento",
          titulo: `MANTENIMIENTO DEL SISTEMA CONTRA INCENDIOS DE ${selectedDependencia.toUpperCase()}`,
          dependencia: selectedDependencia,
          productos: dependenciaData.productosConPasos
        });
      } else {
        setReportData({
          tipo: "adquisiciones",
          titulo: `ADQUISICIONES DE ${selectedDependencia.toUpperCase()}`,
          dependencia: selectedDependencia,
          productos: dependenciaData.productosAdquisiciones
        });
      }
    } else {
      setReportData(null);
    }
  }, [dependenciaData, selectedDependencia, tipoReporte]);

  const handleDownloadReport = async () => {
    try {
      await generateWordReport(reportData);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("Hubo un error al generar el reporte. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📝 Generador de Reportes
          </h1>
          <p className="text-gray-600">
            Genera reportes automáticos de mantenimiento por dependencia
          </p>
        </div>

        {/* Selector de Tipo de Reporte */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            1. Selecciona el Tipo de Reporte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setTipoReporte("mantenimiento")}
              className={`p-6 rounded-lg border-2 transition-all ${
                tipoReporte === "mantenimiento"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <div className="text-4xl mb-2">🔧</div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">Mantenimiento</h3>
              <p className="text-sm text-gray-600">
                Reporte de mantenimientos preventivos y correctivos
              </p>
            </button>
            <button
              onClick={() => setTipoReporte("adquisiciones")}
              className={`p-6 rounded-lg border-2 transition-all ${
                tipoReporte === "adquisiciones"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-green-300"
              }`}
            >
              <div className="text-4xl mb-2">📦</div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">Adquisiciones</h3>
              <p className="text-sm text-gray-600">
                Reporte de productos adquiridos con fichas técnicas
              </p>
            </button>
          </div>
        </div>

        {/* Selector de Dependencia */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            2. Selecciona la Dependencia
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="dependencia" className="block text-sm font-semibold text-gray-700 mb-2">
                Dependencia
              </label>
              <select
                id="dependencia"
                value={selectedDependencia}
                onChange={(e) => setSelectedDependencia(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black font-medium bg-white"
                style={{ color: '#000000' }}
              >
                <option value="" style={{ color: '#000000' }}>-- Selecciona una dependencia --</option>
                {todasDependencias.map((dep, idx) => (
                  <option key={idx} value={dep} style={{ color: '#000000' }}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {dependenciaData && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2">Información de la dependencia:</h3>
                <div className="text-sm text-black space-y-1">
                  <p>• Total de productos: <strong>{dependenciaData.total_productos}</strong></p>
                  <p>• {tipoReporte === "mantenimiento" ? "Mantenimientos" : "Adquisiciones"}: <strong>{tipoReporte === "mantenimiento" ? dependenciaData.productosConPasos?.length || 0 : dependenciaData.productosAdquisiciones?.length || 0}</strong></p>
                  <p>• Mes programado: <strong>{dependenciaData.mes}</strong></p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Previsualización del Reporte */}
        {reportData && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                3. Previsualización del Reporte
              </h2>
              <button
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-semibold text-sm flex items-center gap-2"
              >
                {isPreviewExpanded ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Ver menos
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Ver todo ({reportData.productos?.length || 0} productos)
                  </>
                )}
              </button>
            </div>
            
            {/* Contenido del Reporte */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              {/* Título del Reporte */}
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-8 uppercase">
                {reportData.titulo}
              </h1>

              {/* Productos */}
              <div className="space-y-8">
                {reportData.productos && (isPreviewExpanded ? reportData.productos : reportData.productos.slice(0, 1)).map((producto, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                    {/* Nombre del Producto */}
                    <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">
                      {producto.item}
                    </h2>

                    {reportData.tipo === "mantenimiento" ? (
                      <>
                        {/* Información del Producto - Mantenimiento */}
                        <div className="mb-4 space-y-2">
                          <p className="text-sm text-gray-900">
                            <span className="font-bold">Cantidad:</span> {producto.cantidad}
                          </p>
                          <p className="text-sm text-gray-900">
                            <span className="font-bold">Marca / modelo / serie:</span> {producto.marca || 'N/A'}{producto.modelo ? ` - ${producto.modelo}` : ''}
                          </p>
                          <p className="text-sm text-gray-900">
                            <span className="font-bold">Situación requerida:</span> {producto.tipoTexto}
                          </p>
                        </div>

                        {/* Detalle del Mantenimiento (Pasos) */}
                        {producto.pasos && producto.pasos.length > 0 && (
                          <div className="mb-4">
                            <h3 className="font-semibold text-gray-900 mb-2">Detalle del mantenimiento:</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 ml-2">
                              {producto.pasos.map((paso, pIdx) => (
                                <li key={pIdx}>{paso.descripcion}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Sección de Fotos - Mantenimiento */}
                        <div className="text-center mt-6">
                          <h3 className="font-bold text-gray-900 mb-4">
                            TRABAJOS DURANTE EL MANTENIMIENTO
                          </h3>
                          <p className="text-gray-600 italic mb-8">
                            [Insertar fotos del mantenimiento aquí]
                          </p>
                          <div className="h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Información del Producto - Adquisiciones */}
                        <div className="mb-4 space-y-2">
                          <p className="text-sm text-gray-900">
                            <span className="font-bold">Cantidad:</span> {producto.cantidad}
                          </p>
                        </div>

                        {/* Sección 1: FICHA TÉCNICA */}
                        <div className="mb-8">
                          <h3 className="font-bold text-gray-900 mb-4 text-center">
                            FICHA TÉCNICA
                          </h3>
                          <p className="text-gray-600 italic text-center mb-4">
                            [Insertar fotos de la ficha técnica aquí]
                          </p>
                          <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"></div>
                        </div>

                        {/* Sección 2: INSERTAR FOTOS */}
                        <div className="text-center mt-6">
                          <h3 className="font-bold text-gray-900 mb-4">
                            INSERTAR FOTOS
                          </h3>
                          <p className="text-gray-600 italic mb-4">
                            [Insertar fotos de productos aquí]
                          </p>
                          <div className="h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"></div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                
                {/* Mensaje de productos ocultos */}
                {!isPreviewExpanded && reportData.productos && reportData.productos.length > 1 && (
                  <div className="text-center py-6 border-t border-gray-300">
                    <p className="text-gray-600 mb-3">
                      ... y {reportData.productos.length - 1} productos más
                    </p>
                    <button
                      onClick={() => setIsPreviewExpanded(true)}
                      className="text-blue-600 hover:text-blue-700 font-semibold underline"
                    >
                      Haz clic en "Ver todo" para ver el reporte completo
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botón de Descarga */}
            <div className="text-center">
              <button
                onClick={handleDownloadReport}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg flex items-center justify-center gap-3 mx-auto shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Descargar Reporte en Word
              </button>
              <p className="text-sm text-gray-600 mt-3">
                Se descargará un archivo <strong>.docx</strong> que podrás abrir con Microsoft Word
              </p>
            </div>
          </div>
        )}

        {/* Información */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Generación Automática</h3>
              <p className="text-sm text-yellow-800">
                Este generador carga automáticamente todos los productos de la dependencia seleccionada.
                Para <strong>Mantenimiento</strong>, incluye los pasos específicos de cada equipo.
                Para <strong>Adquisiciones</strong>, genera un reporte con fichas técnicas y espacios para fotos.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
