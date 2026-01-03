"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import InventarioList from "@/components/InventarioList";
import { maintenanceTemplates } from "@/data/maintenanceTemplates";
import dependenciasData from "@/data/dependencias-detalle-completo.json";

export default function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extraer TODOS los productos de todas las dependencias
    const productosData = [];
    
    dependenciasData.dependencias.forEach(dependencia => {
      dependencia.productos.forEach(producto => {
        // Incluir todos los tipos de productos
        if (producto.tipo === 'adquisicion' || producto.tipo === 'mantenimiento_preventivo' || producto.tipo === 'mantenimiento_correctivo') {
          // Buscar la plantilla correspondiente de manera más flexible
          const itemNormalizado = producto.item.toLowerCase().trim();
          // Convertir tipo del producto a formato de plantilla (PREVENTIVO/CORRECTIVO)
          const tipoParaPlantilla = producto.tipo === 'mantenimiento_preventivo' ? 'preventivo' : 'correctivo';
          
          const templateKey = Object.keys(maintenanceTemplates).find(key => {
            const template = maintenanceTemplates[key];
            const templateNombre = template.nombre.toLowerCase().trim();
            const templateTipo = template.tipo.toLowerCase();
            
            // Comparar nombre y tipo
            return templateNombre === itemNormalizado && templateTipo === tipoParaPlantilla;
          });
          
          const template = templateKey ? maintenanceTemplates[templateKey] : null;
          
          productosData.push({
            nombre: producto.item,
            tipo: producto.tipo === 'adquisicion' ? 'Adquisición' :
                  producto.tipo === 'mantenimiento_preventivo' ? 'Preventivo' : 'Correctivo',
            dependencia: dependencia.nombre,
            descripcion: producto.tipo === 'adquisicion' ? 
              `Adquisición de ${producto.item.toLowerCase()}` :
              (template ? 
                (template.pasos.length > 0 ? template.pasos.slice(0, 2).map(p => p.descripcion).join(". ") + "..." : "Mantenimiento completo del equipo") :
                "Mantenimiento del equipo"),
            pasos: template ? template.pasos : [],
            cantidad: producto.cantidad,
            marca: producto.marca,
            modelo: producto.modelo
          });
        }
      });
    });

    setProductos(productosData);
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 Inventario General
          </h1>
          <p className="text-gray-600">
            Explora y busca todos los productos, adquisiciones y mantenimientos del sistema
          </p>
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <InventarioList productos={productos} />
        )}
      </div>
    </div>
  );
}
