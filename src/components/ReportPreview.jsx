"use client";

import { generateReportText } from "@/utils/reportGenerator";

export default function ReportPreview({ generalInfo, products, onClose }) {
  const reportText = generateReportText(generalInfo, products);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Vista Previa del Reporte
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Revisa cómo se verá tu reporte antes de descargarlo
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2"
            title="Cerrar"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 leading-relaxed">
              {reportText}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>
                Este es el formato que se descargará como archivo de texto (.txt)
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cerrar Vista Previa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
