"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { kml } from "@tmcw/togeojson";
import { getDependenciasDetalleCompleto, getDependenciaDetalleCompleto } from "../../lib/adquisiciones.js";

const STYLE_TO_CATEGORY = {
  "icon-1502-9C27B0": { name: "Mes 1", color: "#9C27B0" },
  "icon-1502-FFEA00": { name: "Mes 2", color: "#FFEA00" },
  "icon-1502-0F9D58": { name: "Mes 3", color: "#0F9D58" },
};

export default function DependenciasList({ driveLinks, kmlData }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dependencias, setDependencias] = useState([]);
  const [detalleCompleto, setDetalleCompleto] = useState(null);

  useEffect(() => {
    // Cargar datos de detalle completo
    try {
      const detalle = getDependenciasDetalleCompleto();
      setDetalleCompleto(detalle);
    } catch (error) {
      console.error("Error al cargar detalle completo:", error);
    }
  }, []);

  useEffect(() => {
    if (!kmlData || !driveLinks) return;

    try {
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlData, "text/xml");
      const geoJson = kml(kmlDoc);

      const extractedDependencias = [];

      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === "Point") {
          const name = feature.properties.name || "Sin nombre";
          const styleUrl = feature.properties.styleUrl || "";
          const styleId = styleUrl.replace("#", "").replace("-nodesc", "").replace("-labelson", "");

          if (styleId.includes("000000")) {
            return;
          }

          let category = STYLE_TO_CATEGORY[styleId];

          if (!category) {
            const matchingKey = Object.keys(STYLE_TO_CATEGORY).find(key => styleId.includes(key));
            if (matchingKey) {
              category = STYLE_TO_CATEGORY[matchingKey];
            }
          }

          if (!category) {
            return;
          }

          let driveLink = "";
          if (driveLinks[name]) {
            driveLink = driveLinks[name];
          } else {
            const normalizedName = name.trim().replace(/\.$/, '').toUpperCase();
            const matchingKey = Object.keys(driveLinks).find(key => {
              const normalizedKey = key.trim().replace(/\.$/, '').toUpperCase();
              return normalizedKey === normalizedName;
            });
            if (matchingKey) {
              driveLink = driveLinks[matchingKey];
            }
          }

          extractedDependencias.push({
            name,
            category: category.name,
            color: category.color,
            driveLink: driveLink,
          });
        }
      });

      extractedDependencias.sort((a, b) => a.name.localeCompare(b.name));
      setDependencias(extractedDependencias);
    } catch (error) {
      console.error("Error al parsear KML:", error);
    }
  }, [kmlData, driveLinks]);

  const filteredDependencias = useMemo(() => {
    let filtered = dependencias;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(dep => dep.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(dep =>
        dep.name.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [dependencias, selectedCategory, searchTerm]);

  const categories = ["Mes 1", "Mes 2", "Mes 3"];
  const categoryColors = {
    "Mes 1": "#9C27B0",
    "Mes 2": "#FFEA00",
    "Mes 3": "#0F9D58",
  };

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Buscador */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Buscar dependencia
          </label>
          <div className="relative">
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Escribe el nombre de la dependencia..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
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

        {/* Filtros por categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filtrar por mes
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas ({dependencias.length})
            </button>
            {categories.map((category) => {
              const count = dependencias.filter(dep => dep.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? categoryColors[category] : undefined,
                  }}
                >
                  {category} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-semibold">{filteredDependencias.length}</span> de{" "}
          <span className="font-semibold">{dependencias.length}</span> dependencias
        </div>
      </div>

      {/* Lista de dependencias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
        {filteredDependencias.length > 0 ? (
          filteredDependencias.map((dep, index) => {
            const detalleData = detalleCompleto ? getDependenciaDetalleCompleto(dep.name) : null;
            const tieneDetalle = detalleData !== null && detalleData !== undefined;
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 flex flex-col max-w-sm w-full mx-auto self-start h-[200px]"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-800 text-base leading-tight flex-1">
                    {dep.name}
                  </h3>
                  <span
                    className="ml-2 px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap"
                    style={{ backgroundColor: dep.color }}
                  >
                    {dep.category}
                  </span>
                </div>

                {tieneDetalle && (
                  <div className="mb-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📊 {detalleData.total_productos} productos</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-auto">
                  {tieneDetalle && (
                    <button
                      onClick={() => router.push(`/dependencias/${encodeURIComponent(dep.name)}`)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                    >
                      Ver detalle
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-lg">No se encontraron dependencias</p>
            <p className="text-gray-500 text-sm mt-2">
              Intenta con otro término de búsqueda o filtro
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
