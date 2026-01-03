"use client";

import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import dependenciasData from "@/data/dependencias-detalle-completo.json";
import adquisicionesPorMes from "@/data/adquisiciones-por-mes.json";
import dependenciasListas from "@/data/dependencias-listas.json";

export default function DashboardPage() {
  const [expandedMonths, setExpandedMonths] = useState([]); // Todos colapsados por defecto

  // Calcular estadísticas generales
  const stats = useMemo(() => {
    const totalDependencias = dependenciasData.dependencias.length;
    
    // Calcular total de adquisiciones
    const totalAdquisiciones = adquisicionesPorMes.meses.reduce(
      (sum, mes) => sum + mes.total_unidades,
      0
    );

    // Calcular dependencias con adquisiciones completadas
    const dependenciasConAdquisiciones = dependenciasData.dependencias.filter(dep => {
      return dep.productos.some(p => p.tipo === 'adquisicion');
    }).length;

    // Calcular dependencias con mantenimientos programados
    const dependenciasConMantenimientos = dependenciasData.dependencias.filter(dep => {
      return dep.productos.some(p => 
        p.tipo === 'mantenimiento_preventivo' || p.tipo === 'mantenimiento_correctivo'
      );
    }).length;

    return {
      totalDependencias,
      totalAdquisiciones,
      dependenciasConAdquisiciones,
      dependenciasConMantenimientos,
      porcentajeAdquisiciones: ((dependenciasConAdquisiciones / totalDependencias) * 100).toFixed(1),
      porcentajeMantenimientos: ((dependenciasConMantenimientos / totalDependencias) * 100).toFixed(1),
    };
  }, []);

  // Obtener nombres de meses
  const getMesNombre = (mesNum) => {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return meses[mesNum - 1] || `Mes ${mesNum}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 Dashboard 
          </h1>
          <p className="text-gray-600">
            Vista general de adquisiciones y dependencias
          </p>
        </div>

        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Dependencias */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Total Dependencias</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalDependencias}</p>
              </div>
              <div className="text-4xl">🏢</div>
            </div>
          </div>

          {/* Total Adquisiciones */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Total Adquisiciones</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalAdquisiciones}</p>
                <p className="text-xs text-gray-500 mt-1">unidades</p>
              </div>
              <div className="text-4xl">📦</div>
            </div>
          </div>
        </div>

        {/* Adquisiciones por Mes */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📅 Adquisiciones por Mes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adquisicionesPorMes.meses.map((mes) => {
              const isExpanded = expandedMonths.includes(mes.mes);
              
              return (
                <div
                  key={mes.mes}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{getMesNombre(mes.mes)}</h3>
                    <button
                      onClick={() => {
                        if (isExpanded) {
                          setExpandedMonths(expandedMonths.filter(m => m !== mes.mes));
                        } else {
                          setExpandedMonths([...expandedMonths, mes.mes]);
                        }
                      }}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {isExpanded ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Productos:</span>
                      <span className="font-bold text-gray-800">{mes.total_productos}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total Unidades:</span>
                      <span className="font-bold text-green-600 text-lg">{mes.total_unidades}</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2 font-semibold">Todos los Productos:</p>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {mes.productos.map((producto, idx) => (
                          <div key={idx} className="flex justify-between text-xs">
                            <span className="text-gray-700 truncate flex-1 mr-2">
                              {idx + 1}. {producto.nombre}
                            </span>
                            <span className="font-semibold text-gray-800">{producto.cantidad}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dependencias Listas (Mes 1) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">✅ Dependencias Listas </h2>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold">
              {dependenciasListas.metadata.total_dependencias} Completadas
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependenciasListas.dependencias.map((dep, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border-2 border-green-400 bg-green-50 hover:bg-green-100 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-800 text-sm leading-tight flex-1">
                    {dep.nombre}
                  </h3>
                  <span className="text-green-600 text-2xl ml-2">✓</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Total Productos:</span>
                    <span className="font-semibold text-gray-800">{dep.total_productos}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Adquisiciones:</span>
                    <span className="font-semibold text-green-600">{dep.total_adquisiciones}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Mantenimientos:</span>
                    <span className="font-semibold text-orange-600">{dep.total_mantenimientos}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
