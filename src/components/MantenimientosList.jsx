"use client";

import { useState, useMemo, useEffect } from "react";

export default function MantenimientosList({ mantenimientos }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("all");
  const [selectedMantenimiento, setSelectedMantenimiento] = useState(null);

  // Filtrar mantenimientos
  const filteredMantenimientos = useMemo(() => {
    let filtered = mantenimientos;

    // Filtrar por tipo
    if (selectedTipo !== "all") {
      filtered = filtered.filter(m => m.tipo.toLowerCase() === selectedTipo.toLowerCase());
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(m =>
        m.nombre.toLowerCase().includes(searchLower) ||
        m.dependencia.toLowerCase().includes(searchLower) ||
        m.descripcion.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [mantenimientos, selectedTipo, searchTerm]);

  return (
    <div className="w-full">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {/* Buscador */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-semibold text-gray-800 mb-2">
            Buscar mantenimiento
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
              placeholder="Busca por nombre"
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
              Todos ({mantenimientos.length})
            </button>
            <button
              onClick={() => setSelectedTipo("preventivo")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTipo === "preventivo"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Preventivo ({mantenimientos.filter(m => m.tipo.toLowerCase() === "preventivo").length})
            </button>
            <button
              onClick={() => setSelectedTipo("correctivo")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTipo === "correctivo"
                  ? "bg-orange-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Correctivo ({mantenimientos.filter(m => m.tipo.toLowerCase() === "correctivo").length})
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {filteredMantenimientos.length} de {mantenimientos.length} mantenimientos
        </div>
      </div>

      {/* Lista de mantenimientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[400px]">
        {filteredMantenimientos.length > 0 ? (
          filteredMantenimientos.map((mantenimiento, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border-l-4"
              style={{
                borderLeftColor: mantenimiento.tipo.toLowerCase() === "preventivo" ? "#16a34a" : "#ea580c"
              }}
            >
              {/* Tipo badge */}
              <div className="mb-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    mantenimiento.tipo.toLowerCase() === "preventivo" ? "bg-green-600" : "bg-orange-600"
                  }`}
                >
                  {mantenimiento.tipo}
                </span>
              </div>

              {/* Nombre */}
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                {mantenimiento.nombre}
              </h3>

              {/* Descripción */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {mantenimiento.descripcion}
              </p>

              {/* Botón ver detalles */}
              <button 
                onClick={() => setSelectedMantenimiento(mantenimiento)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-lg font-medium">
              No se encontraron mantenimientos
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Intenta con otros términos de búsqueda o filtros
            </p>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {selectedMantenimiento && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMantenimiento(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    selectedMantenimiento.tipo.toLowerCase() === "preventivo" ? "bg-green-600" : "bg-orange-600"
                  }`}
                >
                  {selectedMantenimiento.tipo}
                </span>
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedMantenimiento.nombre}
                </h2>
              </div>
              <button
                onClick={() => setSelectedMantenimiento(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="px-6 py-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Pasos del Mantenimiento
              </h3>
              <ol className="space-y-4">
                {selectedMantenimiento.pasos.map((paso, pasoIndex) => (
                  <li key={pasoIndex} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {pasoIndex + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-700">{paso.descripcion}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Footer del modal */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
              <button
                onClick={() => setSelectedMantenimiento(null)}
                className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
