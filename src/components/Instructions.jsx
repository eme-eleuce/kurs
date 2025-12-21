"use client";

export default function Instructions() {
  return (
    <div className="bg-blue-100 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3">
        <svg
          className="w-6 h-6 text-blue-600 shrink-0 mt-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Cómo usar:
          </h3>
          <ol className="space-y-2 text-sm text-blue-900">
            <li>1. Completa la información general (dependencia, fecha)</li>
            <li>
              2. Agrega cada TIPO de producto (Extintores, Detectores, etc.) con
              sus pasos específicos
            </li>
            <li>3. Indica cuántas unidades hay de cada tipo</li>
            <li>4. Genera la estructura cuando hayas agregado todos los tipos</li>
            <li>5. Completa los números de serie individuales</li>
            <li>6. Descarga el reporte unificado</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
