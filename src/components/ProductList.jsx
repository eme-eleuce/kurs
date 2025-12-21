"use client";

export default function ProductList({ products, onRemove }) {
  if (products.length === 0) return null;

  const totalFotos = products.reduce((sum, product) => {
    const fotosPorUnidad = product.pasos.reduce(
      (s, paso) => s + paso.fotos,
      0
    );
    return sum + fotosPorUnidad * product.cantidad;
  }, 0);

  return (
    <div className="bg-blue-50 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-blue-800 mb-4">
        Productos Agregados al Reporte
      </h2>

      <div className="space-y-4">
        {products.map((product, index) => {
          const fotosPorUnidad = product.pasos.reduce(
            (sum, paso) => sum + paso.fotos,
            0
          );
          const fotosProducto = fotosPorUnidad * product.cantidad;

          return (
            <div
              key={index}
              className="bg-white border border-blue-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.nombre}
                  </h3>
                  {product.tipoMantenimiento && (
                    <p className="text-sm text-gray-600">
                      Tipo de mantenimiento: {product.tipoMantenimiento}
                    </p>
                  )}
                  {product.marca && (
                    <p className="text-sm text-gray-600">
                      Marca: {product.marca}
                    </p>
                  )}
                  {product.modelo && (
                    <p className="text-sm text-gray-600">
                      Modelo: {product.modelo}
                    </p>
                  )}
                  {product.codigo && (
                    <p className="text-sm text-gray-600">
                      Código: {product.codigo}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-500 hover:text-red-700 p-2"
                  title="Eliminar producto"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <p className="text-sm font-medium text-gray-700">
                  Cantidad: {product.cantidad} unidad
                  {product.cantidad > 1 ? "es" : ""}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  Pasos de mantenimiento: {product.pasos.length}
                </p>
                <div className="text-sm text-gray-600">
                  {product.pasos.map((paso, i) => (
                    <div key={i} className="ml-4">
                      • Paso {i + 1}: {paso.descripcion || "(sin descripción)"}{" "}
                      - {paso.fotos} foto{paso.fotos > 1 ? "s" : ""}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded">
                <p className="text-sm text-blue-800">
                  <strong>{fotosPorUnidad} fotos</strong> por unidad ×{" "}
                  <strong>{product.cantidad}</strong> ={" "}
                  <strong>{fotosProducto} fotos totales</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-lg font-semibold text-green-800">
          Total de fotos requeridas para el reporte: {totalFotos}
        </p>
      </div>
    </div>
  );
}
