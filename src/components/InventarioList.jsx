"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InventarioList({ productos }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("all");
  const [expandedItems, setExpandedItems] = useState({});
  const [expandedDependencias, setExpandedDependencias] = useState({});

  // Agrupar productos por nombre y tipo
  const groupedProductos = useMemo(() => {
    const groups = {};
    
    productos.forEach(m => {
      const key = `${m.nombre}-${m.tipo}`;
      if (!groups[key]) {
        groups[key] = {
          nombre: m.nombre,
          tipo: m.tipo,
          descripcion: m.descripcion,
          pasos: m.pasos,
          dependencias: []
        };
      }
      groups[key].dependencias.push(m.dependencia);
    });
    
    return Object.values(groups);
  }, [productos]);

  // Función para normalizar texto (quitar acentos y convertir a minúsculas)
  const normalizeText = (text) => {
    if (!text) return '';
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Quitar acentos
  };

  // Filtrar productos agrupados
  const filteredProductos = useMemo(() => {
    let filtered = groupedProductos;

    // Filtrar por tipo
    if (selectedTipo !== "all") {
      filtered = filtered.filter(m => m.tipo.toLowerCase() === selectedTipo.toLowerCase());
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const searchNormalized = normalizeText(searchTerm);
      filtered = filtered.filter(m =>
        normalizeText(m.nombre).includes(searchNormalized) ||
        m.dependencias.some(d => normalizeText(d).includes(searchNormalized)) ||
        (m.descripcion && normalizeText(m.descripcion).includes(searchNormalized)) ||
        (m.marca && normalizeText(m.marca).includes(searchNormalized)) ||
        (m.modelo && normalizeText(m.modelo).includes(searchNormalized)) ||
        normalizeText(m.tipo).includes(searchNormalized)
      );
    }

    return filtered;
  }, [groupedProductos, selectedTipo, searchTerm]);

  return (
    <div className="w-full">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Buscador */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-2">
            Buscar en inventario
          </label>
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Busca por nombre, marca, modelo, dependencia o tipo"
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filtros por tipo */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Filtrar por tipo
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTipo("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTipo === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedTipo("adquisición")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedTipo === "adquisición"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Adquisiciones
            </button>
            <button
              onClick={() => setSelectedTipo("preventivo")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedTipo === "preventivo"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Preventivo
            </button>
            <button
              onClick={() => setSelectedTipo("correctivo")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedTipo === "correctivo"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Correctivo
            </button>
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto, index) => {
            const isExpanded = expandedItems[index] || false;
            const tipoLower = producto.tipo.toLowerCase();
            const isAdquisicion = tipoLower === "adquisición";
            const isPreventivo = tipoLower === "preventivo";
            const borderColor = isAdquisicion ? "border-blue-200" : isPreventivo ? "border-green-200" : "border-orange-200";
            const bgColor = isAdquisicion ? "bg-blue-600" : isPreventivo ? "bg-green-600" : "bg-orange-600";
            const hoverBgColor = isAdquisicion ? "hover:bg-blue-50" : isPreventivo ? "hover:bg-green-50" : "hover:bg-orange-50";
            const iconColor = isAdquisicion ? "text-blue-600" : isPreventivo ? "text-green-600" : "text-orange-600";
            const iconHoverColor = isAdquisicion ? "hover:text-blue-700" : isPreventivo ? "hover:text-green-700" : "hover:text-orange-700";
            
            return (
              <div key={index} className={`border ${borderColor} bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow`}>
                <div 
                  className={`p-4 cursor-pointer ${hoverBgColor} transition-colors`}
                  onClick={() => {
                    const newExpanded = !expandedItems[index];
                    setExpandedItems(prev => ({...prev, [index]: newExpanded}));
                    // Auto-expandir dependencias cuando se abre la card
                    if (newExpanded) {
                      setExpandedDependencias(prev => ({...prev, [index]: true}));
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className={`${bgColor} text-white text-sm font-bold px-3 py-1.5 rounded-lg min-w-[3rem] text-center`}>
                      {isAdquisicion ? (
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      ) : isPreventivo ? (
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{producto.nombre}</h3>
                      <p className="text-sm text-gray-600 mt-1">{producto.tipo}</p>
                      <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {producto.dependencias.length} {producto.dependencias.length === 1 ? 'dependencia' : 'dependencias'}
                      </p>
                    </div>
                    <button className={`${iconColor} ${iconHoverColor} transition-transform`}>
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
                  <div className="px-4 pb-4 space-y-3">
                    {/* Acordeón de dependencias */}
                    <div className="w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedDependencias(prev => ({...prev, [index]: !prev[index]}));
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-lg ${hoverBgColor} transition-colors`}
                      >
                        <span className={`flex items-center gap-2 font-semibold ${iconColor}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Dependencias ({producto.dependencias.length})
                        </span>
                        <svg 
                          className={`w-5 h-5 text-gray-600 transform transition-transform ${expandedDependencias[index] ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedDependencias[index] && (
                        <div className="px-4 pb-4">
                          <div className="flex flex-wrap gap-2">
                            {producto.dependencias.map((dep, dIdx) => (
                              <button
                                key={dIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/dependencias/${encodeURIComponent(dep)}`);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {dep}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Pasos del mantenimiento (solo para mantenimientos) */}
                    {!isAdquisicion && producto.pasos && producto.pasos.length > 0 ? (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded w-full">
                        <p className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          Pasos a Seguir:
                        </p>
                        <ol className="space-y-2.5 ml-1">
                          {producto.pasos.map((paso, pIdx) => (
                            <li key={pIdx} className="text-sm text-gray-800 leading-relaxed">
                              <span className="font-bold text-blue-700 mr-2">{pIdx + 1}.</span>
                              {paso.descripcion}
                            </li>
                          ))}
                        </ol>
                      </div>
                    ) : (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded w-full">
                        <p className="text-sm text-yellow-700 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          No hay pasos específicos definidos para este mantenimiento.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-md">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">
              No se encontraron productos
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
