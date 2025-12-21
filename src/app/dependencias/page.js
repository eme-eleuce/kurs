"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import DependenciasList from "@/components/DependenciasList";

export default function DependenciasPage() {
  const [driveLinks, setDriveLinks] = useState({});
  const [kmlData, setKmlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar links de Drive
        const linksResponse = await fetch("/data/driveLinks.json");
        if (!linksResponse.ok) {
          throw new Error("No se pudo cargar driveLinks.json");
        }
        const links = await linksResponse.json();

        // Cargar KML para obtener categorías
        const kmlResponse = await fetch("/data/mapa.kml");
        if (!kmlResponse.ok) {
          throw new Error("No se pudo cargar el archivo KML");
        }
        const kmlText = await kmlResponse.text();

        setDriveLinks(links);
        setKmlData(kmlText);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando dependencias...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error al cargar datos</h2>
            <p className="text-gray-600 text-center">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Directorio de Dependencias
          </h1>
          <p className="text-gray-600">
            Busca y accede rápidamente a las carpetas de Drive de cada dependencia
          </p>
        </div>

        <DependenciasList driveLinks={driveLinks} kmlData={kmlData} />
      </div>
    </div>
  );
}
