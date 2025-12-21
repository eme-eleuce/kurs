"use client";

import { useState } from "react";
import MaintenanceSteps from "./MaintenanceSteps";
import { searchMaintenanceTemplates } from "@/data/maintenanceTemplates";

export default function ProductForm({ product, onChange, onAddToReport }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (field, value) => {
    onChange({ ...product, [field]: value });
  };

  const handleNameChange = (value) => {
    onChange({ ...product, nombre: value });

    // Buscar plantillas de mantenimiento
    if (value.trim().length >= 3) {
      const results = searchMaintenanceTemplates(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectTemplate = (template) => {
    onChange({
      ...product,
      nombre: template.nombre,
      tipoMantenimiento: template.tipo,
      pasos: template.pasos.map(p => ({ ...p })), // Clonar pasos
    });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleStepsChange = (newSteps) => {
    onChange({ ...product, pasos: newSteps });
  };

  const handleAddStep = () => {
    const newSteps = [
      ...product.pasos,
      { descripcion: "", fotos: 1 },
    ];
    onChange({ ...product, pasos: newSteps });
  };

  const totalFotos = product.pasos.reduce((sum, paso) => sum + paso.fotos, 0);
  const totalFotosReporte = totalFotos * product.cantidad;

  return (
    <div className="bg-orange-50 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-orange-800 mb-4">
        2. Agregar Tipo de Producto
      </h2>

      <div className="space-y-4 mb-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Bomba Jockey, Detector de Humo, Hidrantes..."
            value={product.nombre}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => {
              if (product.nombre.trim().length >= 3) {
                const results = searchMaintenanceTemplates(product.nombre);
                setSuggestions(results);
                setShowSuggestions(results.length > 0);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              <div className="p-2 bg-blue-50 border-b border-blue-200">
                <p className="text-xs text-blue-800 font-semibold">
                  💡 Plantillas de Mantenimiento Disponibles
                </p>
              </div>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectTemplate(item.template)}
                  className="px-4 py-3 hover:bg-orange-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.template.nombre}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.template.tipo} • {item.template.pasos.length} pasos predefinidos
                      </p>
                    </div>
                    <div className="ml-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.template.tipo === 'PREVENTIVO' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.template.tipo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de mantenimiento
          </label>
          <select
            value={product.tipoMantenimiento || ""}
            onChange={(e) => handleChange("tipoMantenimiento", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          >
            <option value="">(Selecciona)</option>
            <option value="PREVENTIVO">PREVENTIVO</option>
            <option value="CORRECTIVO">CORRECTIVO</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca
          </label>
          <input
            type="text"
            placeholder="Ej: Amerex, Kidde, Honeywell"
            value={product.marca}
            onChange={(e) => handleChange("marca", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo
          </label>
          <input
            type="text"
            placeholder="Ej: ABC-2000"
            value={product.modelo}
            onChange={(e) => handleChange("modelo", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código
          </label>
          <input
            type="text"
            placeholder="Ej: EXT-001, DH-2024-05"
            value={product.codigo}
            onChange={(e) => handleChange("codigo", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cantidad de este producto
          </label>
          <input
            type="number"
            min="1"
            value={product.cantidad}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || value === "0") {
                handleChange("cantidad", 1);
              } else {
                handleChange("cantidad", parseInt(value));
              }
            }}
            onBlur={(e) => {
              if (!e.target.value || parseInt(e.target.value) < 1) {
                handleChange("cantidad", 1);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          />
        </div>
      </div>

      <MaintenanceSteps
        steps={product.pasos}
        onChange={handleStepsChange}
        onAddStep={handleAddStep}
      />

      <div className="mt-6 flex gap-4">
        <button
          onClick={onAddToReport}
          disabled={!product.nombre}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          Agregar este Producto al Reporte
        </button>
      </div>

      {totalFotos > 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Este tipo de producto tendrá <strong>{totalFotos} fotos</strong> por
            unidad × <strong>{product.cantidad} unidades</strong> ={" "}
            <strong>{totalFotosReporte} fotos totales</strong>
          </p>
        </div>
      )}
    </div>
  );
}
