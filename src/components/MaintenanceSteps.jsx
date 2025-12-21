"use client";

export default function MaintenanceSteps({ steps, onChange, onAddStep }) {
  const handleStepChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    onChange(newSteps);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-orange-700">
        Pasos del Mantenimiento
      </h3>

      {steps.map((step, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción del Paso {index + 1}
              </label>
              <input
                type="text"
                placeholder="Ej: Estado inicial del producto"
                value={step.descripcion}
                onChange={(e) =>
                  handleStepChange(index, "descripcion", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              />
            </div>

            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fotos
              </label>
              <select
                value={step.fotos}
                onChange={(e) =>
                  handleStepChange(index, "fotos", parseInt(e.target.value))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} foto{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <svg
              className="w-4 h-4"
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
            Requiere {step.fotos} foto{step.fotos > 1 ? "s" : ""}
          </p>
        </div>
      ))}

      <button
        onClick={onAddStep}
        className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Agregar Paso
      </button>
    </div>
  );
}
