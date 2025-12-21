"use client";

import { useState } from "react";

const DEPENDENCIAS = [
  "TUNELES CERRO DEL CARMEN Y SANTA ANA",
  "PALACIO MUNICIPAL",
  "EDIFICIO CRILLON MARTIN AVILES",
  "BIBLIOTECA MUNICIPAL",
  "MUSEO MUNICIPAL",
  "CENTRO DE HABILIDADES VALIENTES",
  "MERCADO CENTRAL",
  "MERCADO ESTE",
  "MERCADO ARTESANAL MACHALA",
  "MERCADO JOSE MASCOTE",
  "MERCADO GOMEZ RENDON",
  "HOSPITAL DEL DÍA ISABEL ESTRADA DE JURADO POSORJA",
  "TUNEL SAN EDUARDO",
  "CENTRO TÉCNICO MUNICIPAL CTM",
  "PLANTA MUNICIPAL DE ASFALTO PDVSA",
  "MUELLE DE LA CARAGUAY",
  "MERCADO GUASMO SUR",
  "MERCADO SAN GREGORIO",
  "MERCADO DE LAS ESCLUSAS",
  "MERCADO SANTA TERESITA",
  "MERCADO ENRIQUE GRAW RUIZ",
  "MERCADO BATALLON DEL SUBURBIO",
  "CENTRO MEDICO CISNE II",
  "CENTRO DE SALUD FERTIZA",
  "HOSPITAL DEL DIA JACOBO Y MARIA ELENA RATINOFF",
  "HOSPITAL DEL DIA TRINITARIA",
  "MERCADO TERMINAL DE TRANSFERENCIA DE VIVERES",
  "COMPLEJO ZUMAR",
  "CONCHA ACUSTICA",
  "POLIFUCIONAL CASA GUAYACA",
  "CENTRO DE BIENESTAR ANIMAL",
  "CENTRO DE TRATAMIENTO PRIMARIO DE DESINTOXICACION",
  "MERCADO FLORIDA NORTE",
  "MERCADO DE SAUCES IX",
  "MERCADO MUNICIPAL MARTHA DE ROLDOS",
  "MERCADO MUNICIPAL VERGELES",
  "MERCADO MINORISTA DE LA CASUARINA FORTÍN",
  "MERCADO SAN JACINTO",
  "HOSPITAL DEL DIA SAMUEL RATINOFF",
  "HOSPITAL ANGEL FELICISIMO ROJAS",
];

export default function GeneralInfo({ data, onChange }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredDependencias, setFilteredDependencias] = useState([]);

  const handleDependenciaChange = (value) => {
    onChange({ ...data, dependencia: value });

    if (value.trim() === "") {
      setFilteredDependencias([]);
      setShowSuggestions(false);
    } else {
      const filtered = DEPENDENCIAS.filter((dep) =>
        dep.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDependencias(filtered);
      setShowSuggestions(true);
    }
  };

  const selectDependencia = (dep) => {
    onChange({ ...data, dependencia: dep });
    setShowSuggestions(false);
    setFilteredDependencias([]);
  };

  return (
    <div className="bg-red-50 rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold text-red-800 mb-4">
        1. Información General del Reporte
      </h2>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dependencia/Edificio
          </label>
          <input
            type="text"
            placeholder="Escribe para buscar o selecciona una dependencia..."
            value={data.dependencia}
            onChange={(e) => handleDependenciaChange(e.target.value)}
            onFocus={() => {
              if (data.dependencia.trim() !== "") {
                const filtered = DEPENDENCIAS.filter((dep) =>
                  dep.toLowerCase().includes(data.dependencia.toLowerCase())
                );
                setFilteredDependencias(filtered);
                setShowSuggestions(true);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
          />
          
          {showSuggestions && filteredDependencias.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredDependencias.map((dep, index) => (
                <div
                  key={index}
                  onClick={() => selectDependencia(dep)}
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer text-black text-sm"
                >
                  {dep}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={data.fecha}
            onChange={(e) => onChange({ ...data, fecha: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hora
          </label>
          <input
            type="time"
            value={data.hora}
            onChange={(e) => onChange({ ...data, hora: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-black"
          />
        </div>
      </div>
    </div>
  );
}
