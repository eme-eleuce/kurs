"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { kml } from "@tmcw/togeojson";
import "leaflet/dist/leaflet.css";

// Fix para los iconos de Leaflet en Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Mapeo de colores del KML a nombres de mes/categoría
const STYLE_TO_CATEGORY = {
  "icon-1502-9C27B0": { name: "Mes 1", color: "#9C27B0" }, // Morado
  "icon-1502-FFEA00": { name: "Mes 2", color: "#FFEA00" }, // Amarillo
  "icon-1502-0F9D58": { name: "Mes 3", color: "#0F9D58" }, // Verde
  // Los marcadores negros se ignoran (no se incluyen en el mapa)
};

// Colores únicos para filtros
const UNIQUE_CATEGORIES = {
  "Mes 1": "#9C27B0",
  "Mes 2": "#FFEA00",
  "Mes 3": "#0F9D58",
};

function createColoredIcon(color) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
}

function FitBounds({ markers }) {
  const map = useMap();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (markers.length > 0 && !hasInitialized.current) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
      hasInitialized.current = true;
    }
  }, [markers, map]);

  return null;
}

function CenterMap({ marker }) {
  const map = useMap();

  useEffect(() => {
    if (marker) {
      map.setView([marker.lat, marker.lng], 16);
    }
  }, [marker, map]);

  return null;
}

function OpenSelectedPopup({ selectedMarker }) {
  const map = useMap();

  useEffect(() => {
    if (selectedMarker) {
      setTimeout(() => {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            const latlng = layer.getLatLng();
            if (latlng.lat === selectedMarker.lat && latlng.lng === selectedMarker.lng) {
              layer.openPopup();
            }
          }
        });
      }, 1200);
    }
  }, [selectedMarker, map]);

  return null;
}

function MarkerWithAutoPopup({ marker, isSelected, router }) {
  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={createColoredIcon(marker.color)}
    >
      <Popup maxWidth={300}>
        <div className="p-2">
          <h3 className="font-bold text-lg text-gray-800 mb-3">{marker.name}</h3>
          
          <div className="mb-3">
            <span className="inline-block px-2 py-1 rounded text-xs font-medium text-white" style={{ backgroundColor: marker.color }}>
              {marker.category}
            </span>
          </div>

          <button
            onClick={() => router.push(`/dependencias/${encodeURIComponent(marker.name)}`)}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg font-semibold text-sm shadow-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Ver en detalle</span>
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapComponent({ kmlData, driveLinks, selectedDependencia }) {
  const router = useRouter();
  const [markers, setMarkers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  useEffect(() => {
    if (!kmlData) return;

    try {
      // Parsear KML a GeoJSON
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlData, "text/xml");
      const geoJson = kml(kmlDoc);

      // Extraer marcadores
      const extractedMarkers = [];
      
      geoJson.features.forEach((feature) => {
        if (feature.geometry.type === "Point") {
          const [lng, lat] = feature.geometry.coordinates;
          const name = feature.properties.name || "Sin nombre";
          
          // Manejar descripción que puede ser un objeto o string
          let description = "";
          if (feature.properties.description) {
            if (typeof feature.properties.description === "string") {
              description = feature.properties.description;
            } else if (feature.properties.description.value) {
              description = feature.properties.description.value;
            }
          }
          
          // Extraer el styleUrl para determinar la categoría/mes
          const styleUrl = feature.properties.styleUrl || "";
          const styleId = styleUrl.replace("#", "").replace("-nodesc", "").replace("-labelson", "");
          
          // Ignorar marcadores negros (no tienen categoría válida)
          if (styleId.includes("000000")) {
            return; // Saltar este marcador
          }
          
          // Buscar la categoría basada en el estilo
          let category = STYLE_TO_CATEGORY[styleId];
          
          // Si no se encuentra exactamente, buscar por prefijo
          if (!category) {
            const matchingKey = Object.keys(STYLE_TO_CATEGORY).find(key => styleId.includes(key));
            if (matchingKey) {
              category = STYLE_TO_CATEGORY[matchingKey];
            }
          }
          
          // Si aún no hay categoría válida, ignorar este marcador
          if (!category) {
            return;
          }

          // Buscar el link de Drive de forma flexible
          let driveLink = "";
          
          // Primero intentar búsqueda exacta
          if (driveLinks[name]) {
            driveLink = driveLinks[name];
          } else {
            // Normalizar el nombre (quitar espacios extras, puntos finales, etc.)
            const normalizedName = name.trim().replace(/\.$/, '').toUpperCase();
            
            // Buscar en driveLinks con nombres normalizados
            const matchingKey = Object.keys(driveLinks).find(key => {
              const normalizedKey = key.trim().replace(/\.$/, '').toUpperCase();
              return normalizedKey === normalizedName;
            });
            
            if (matchingKey) {
              driveLink = driveLinks[matchingKey];
            }
          }

          extractedMarkers.push({
            lat,
            lng,
            name,
            description,
            category: category.name,
            color: category.color,
            driveLink: driveLink,
          });
        }
      });

      setMarkers(extractedMarkers);
      setFilteredMarkers(extractedMarkers);
    } catch (error) {
      console.error("Error al parsear KML:", error);
    }
  }, [kmlData, driveLinks]);

  useEffect(() => {
    let filtered = markers;

    // Filtrar por categoría
    if (selectedMonth !== "all") {
      filtered = filtered.filter(m => m.category === selectedMonth);
    }

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchLower)
      );
    }

    setFilteredMarkers(filtered);
  }, [selectedMonth, searchTerm, markers]);

  // Efecto para seleccionar dependencia cuando se pasa como parámetro
  useEffect(() => {
    if (selectedDependencia && markers.length > 0) {
      const marker = markers.find(m => 
        m.name.toLowerCase() === selectedDependencia.toLowerCase()
      );
      if (marker) {
        setSelectedMarker(marker);
        // No establecer searchTerm para evitar conflictos con el filtro
        // El mapa se centrará automáticamente con CenterMap
      }
    }
  }, [selectedDependencia, markers]);


  // Calcular sugerencias
  const suggestions = searchTerm.trim() 
    ? markers
        .filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.trim().length > 0);
  };

  const handleSuggestionClick = (marker) => {
    setSearchTerm(marker.name);
    setShowSuggestions(false);
    setSelectedMarker(marker);
  };

  const handleSearchClear = () => {
    setSearchTerm("");
    setShowSuggestions(false);
    setSelectedMarker(null);
  };

  // Obtener categorías únicas
  const uniqueCategories = [...new Set(markers.map(m => m.category))];

  // Centro por defecto (Guayaquil, Ecuador)
  const defaultCenter = [-2.1894, -79.8890];
  const defaultZoom = 12;

  return (
    <div className="relative h-full">
      {/* Leyenda de colores */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-3 text-sm">Leyenda</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: UNIQUE_CATEGORIES["Mes 1"] }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">Mes 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: UNIQUE_CATEGORIES["Mes 2"] }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">Mes 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: UNIQUE_CATEGORIES["Mes 3"] }}
            ></div>
            <span className="text-sm text-gray-700 font-medium">Mes 3</span>
          </div>
        </div>
      </div>

      {/* Botón para abrir/cerrar panel */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-3 hover:bg-gray-50 transition-colors"
          aria-label="Abrir panel de búsqueda"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}

      {/* Filtros y búsqueda */}
      {isPanelOpen && (
        <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
          {/* Botón cerrar */}
          <button
            onClick={() => setIsPanelOpen(false)}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Cerrar panel"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/* Buscador */}
        <div className="mb-4">
          <label htmlFor="map-search" className="block text-sm font-semibold text-gray-800 mb-2">
            Buscar dependencia
          </label>
          <div className="relative">
            <input
              id="map-search"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
              placeholder="Escribe el nombre..."
              className="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {/* Sugerencias de autocompletado */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                {suggestions.map((marker, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(marker)}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: marker.color }}
                      ></div>
                      <span className="text-sm text-gray-800 font-medium">{marker.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filtro por categoría */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Filtrar por categoría</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMonth("all")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMonth === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todos
            </button>
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedMonth(category)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors`}
                style={{
                  backgroundColor: selectedMonth === category ? UNIQUE_CATEGORIES[category] : "#e5e7eb",
                  color: selectedMonth === category ? "white" : "#374151",
                  border: selectedMonth === category ? "2px solid white" : "none",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-3 text-sm text-gray-600">
          Mostrando {filteredMarkers.length} de {markers.length} dependencias
        </div>
        </div>
      )}

      {/* Mapa */}
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />
        
        {selectedMarker ? <CenterMap marker={selectedMarker} /> : <FitBounds markers={filteredMarkers} />}

        {filteredMarkers.map((marker, index) => {
          const isSelected = selectedMarker && selectedMarker.name === marker.name;
          return (
            <MarkerWithAutoPopup
              key={index}
              marker={marker}
              isSelected={isSelected}
              router={router}
            />
          );
        })}
      </MapContainer>
    </div>
  );
}
