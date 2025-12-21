import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo/Título principal */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            MiMG - KURS
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Descripción */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          Genera reportes detallados, explora tipos de mantenimientos, consulta el directorio 
          de dependencias para buscar fotos realizadas y visualiza ubicaciones en el mapa interactivo.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/generador"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            📝 Generar Reporte
          </Link>
          <Link
            href="/mantenimientos"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            🔧 Mantenimientos
          </Link>
          <Link
            href="/dependencias"
            className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold text-lg hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            📁 Ver Directorio
          </Link>
          <Link
            href="/mapa"
            className="w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-lg font-semibold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            🗺️ Explorar Mapa
          </Link>
        </div>
      </div>
    </div>
  );
}
