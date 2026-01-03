"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navigation from "@/components/Navigation";

const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
});

function MapaContent() {
  const searchParams = useSearchParams();
  const dependenciaParam = searchParams.get('dependencia');
  const [kmlData, setKmlData] = useState(null);
  const [driveLinks, setDriveLinks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar KML
        const kmlResponse = await fetch("/data/mapa.kml");
        if (!kmlResponse.ok) {
          throw new Error("No se pudo cargar el archivo KML. Asegúrate de colocarlo en public/data/mapa.kml");
        }
        const kmlText = await kmlResponse.text();

        // Cargar links de Drive
        const linksResponse = await fetch("/data/driveLinks.json");
        if (!linksResponse.ok) {
          throw new Error("No se pudo cargar driveLinks.json");
        }
        const links = await linksResponse.json();

        setKmlData(kmlText);
        setDriveLinks(links);
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">Error al cargar datos</h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Instrucciones:</strong>
            </p>
            <ol className="text-sm text-yellow-700 list-decimal list-inside mt-2 space-y-1">
              <li>Coloca tu archivo KML en: <code className="bg-yellow-100 px-1">public/data/mapa.kml</code></li>
              <li>Llena los links de Drive en: <code className="bg-yellow-100 px-1">public/data/driveLinks.json</code></li>
            </ol>
          </div>
          <Link href="/" className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      {/* Mapa */}
      <div className="h-[calc(100vh-64px)]">
        <MapComponent kmlData={kmlData} driveLinks={driveLinks} selectedDependencia={dependenciaParam} />
      </div>
    </div>
  );
}

export default function MapaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    }>
      <MapaContent />
    </Suspense>
  );
}
