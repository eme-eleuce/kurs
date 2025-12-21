"use client";

export default function ReportGenerator({ generalInfo, products, onGenerate, onPreview }) {
  const totalProductos = products.reduce(
    (sum, product) => sum + product.cantidad,
    0
  );

  const totalFotos = products.reduce((sum, product) => {
    const fotosPorUnidad = product.pasos.reduce(
      (s, paso) => s + paso.fotos,
      0
    );
    return sum + fotosPorUnidad * product.cantidad;
  }, 0);

  const canGenerate =
    generalInfo.dependencia &&
    generalInfo.fecha &&
    generalInfo.hora &&
    products.length > 0;

  return (
    <div className="bg-purple-50 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-purple-800 mb-4">
        3. Generar Estructura del Reporte
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-gray-700">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>
            <strong>{products.length}</strong> tipo
            {products.length !== 1 ? "s" : ""} de producto
            {products.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <span>
            <strong>{totalProductos}</strong> unidad
            {totalProductos !== 1 ? "es" : ""} totales
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            <strong>{totalFotos}</strong> foto
            {totalFotos !== 1 ? "s" : ""} requeridas
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPreview}
          disabled={!canGenerate}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Ver Vista Previa
        </button>

        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg font-semibold"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Descargar Reporte
        </button>
      </div>

      {!canGenerate && (
        <p className="mt-3 text-sm text-red-600 text-center">
          {!generalInfo.dependencia || !generalInfo.fecha || !generalInfo.hora
            ? "Completa la información general"
            : "Agrega al menos un producto"}
        </p>
      )}
    </div>
  );
}
