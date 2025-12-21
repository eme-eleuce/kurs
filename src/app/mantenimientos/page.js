"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import MantenimientosList from "@/components/MantenimientosList";
import { maintenanceTemplates } from "@/data/maintenanceTemplates";

export default function MantenimientosPage() {
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Convertir las plantillas de mantenimiento a formato de lista
    const mantenimientosData = Object.entries(maintenanceTemplates).map(([key, template]) => {
      // Generar una descripción basada en los pasos
      const descripcion = template.pasos.length > 0 
        ? template.pasos.slice(0, 2).map(p => p.descripcion).join(". ") + "..."
        : "Mantenimiento completo del equipo";

      return {
        nombre: template.nombre,
        tipo: template.tipo,
        dependencia: "Múltiples Dependencias", // Puedes personalizar esto según necesites
        fecha: "2024-12", // Puedes personalizar esto según necesites
        descripcion: descripcion,
        pasos: template.pasos,
        key: key
      };
    });

    setMantenimientos(mantenimientosData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
             Mantenimientos
          </h1>
          <p className="text-gray-600">
            Consulta y filtra todos los mantenimientos realizados en las dependencias
          </p>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <MantenimientosList mantenimientos={mantenimientos} />
        )}
      </div>
    </div>
  );
}
