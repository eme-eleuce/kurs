"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import GeneralInfo from "@/components/GeneralInfo";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";
import Instructions from "@/components/Instructions";
import ReportGenerator from "@/components/ReportGenerator";
import ReportPreview from "@/components/ReportPreview";
import { downloadReport } from "@/utils/reportGenerator";

export default function GeneradorPage() {
  const [generalInfo, setGeneralInfo] = useState({
    dependencia: "",
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toTimeString().slice(0, 5),
  });

  const [currentProduct, setCurrentProduct] = useState({
    nombre: "",
    tipoMantenimiento: "",
    marca: "",
    modelo: "",
    codigo: "",
    cantidad: 1,
    pasos: [{ descripcion: "", fotos: 1 }],
  });

  const [products, setProducts] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddProduct = () => {
    if (!currentProduct.nombre) {
      alert("Por favor completa el nombre del producto");
      return;
    }

    setProducts([...products, { ...currentProduct }]);
    
    setCurrentProduct({
      nombre: "",
      tipoMantenimiento: "",
      marca: "",
      modelo: "",
      codigo: "",
      cantidad: 1,
      pasos: [{ descripcion: "", fotos: 1 }],
    });
  };

  const handleRemoveProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleGenerateReport = () => {
    if (products.length === 0) {
      alert("Agrega al menos un producto antes de generar el reporte");
      return;
    }

    downloadReport(generalInfo, products);
    setReportGenerated(true);
  };

  const handleShowPreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de que quieres reiniciar? Se perderán todos los datos.")) {
      setGeneralInfo({
        dependencia: "",
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toTimeString().slice(0, 5),
      });
      setCurrentProduct({
        nombre: "",
        tipoMantenimiento: "",
        marca: "",
        modelo: "",
        codigo: "",
        cantidad: 1,
        pasos: [{ descripcion: "", fotos: 1 }],
      });
      setProducts([]);
      setReportGenerated(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-700 mb-2">
            Generador de Reportes
          </h1>
          <p className="text-gray-600">
            Crea reportes estructurados para mantenimiento correctivo, preventivo
            y adquisiciones
          </p>
        </div>

        <Instructions />

        <GeneralInfo data={generalInfo} onChange={setGeneralInfo} />

        <ProductForm
          product={currentProduct}
          onChange={setCurrentProduct}
          onAddToReport={handleAddProduct}
        />

        <ProductList products={products} onRemove={handleRemoveProduct} />

        <ReportGenerator
          generalInfo={generalInfo}
          products={products}
          onGenerate={handleGenerateReport}
          onPreview={handleShowPreview}
        />

        {reportGenerated && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-green-800">
                  ¡Reporte generado exitosamente!
                </h3>
                <p className="text-sm text-green-700">
                  El archivo se ha descargado. Ábrelo con Word o cualquier editor
                  de texto para completar los números de serie y agregar las fotos.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reiniciar Todo
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Generador de Reportes de Mantenimiento v1.0</p>
        </div>
      </div>

      {showPreview && (
        <ReportPreview
          generalInfo={generalInfo}
          products={products}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}
