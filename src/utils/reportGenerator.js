/**
 * Genera el contenido del reporte en formato de texto para Word
 */
export function generateReportText(generalInfo, products) {
  let text = "";

  // Encabezado
  text += "REPORTE DE MANTENIMIENTO\n";
  text += "=".repeat(80) + "\n\n";

  // Información General
  text += "INFORMACIÓN GENERAL\n";
  text += "-".repeat(80) + "\n";
  text += `Dependencia/Edificio: ${generalInfo.dependencia}\n`;
  text += `Fecha: ${formatDate(generalInfo.fecha)}\n`;
  text += `Hora: ${generalInfo.hora}\n\n`;

  // Productos
  products.forEach((product, productIndex) => {
    text += `${product.nombre.toUpperCase()}\n`;
    if (product.tipoMantenimiento) {
      text += `Tipo de mantenimiento: ${product.tipoMantenimiento}\n`;
    }
    if (product.marca) {
      text += `Marca: ${product.marca}\n`;
    }
    if (product.modelo) {
      text += `Modelo: ${product.modelo}\n`;
    }
    if (product.codigo) {
      text += `Código: ${product.codigo}\n`;
    }
    text += `Cantidad de unidades: ${product.cantidad}\n\n`;

    // Generar para cada unidad (numeración relativa al producto)
    for (let i = 0; i < product.cantidad; i++) {
      text += "-".repeat(80) + "\n";
      text += `UNIDAD #${i + 1} - ${product.nombre}\n`;
      text += "-".repeat(80) + "\n";
      if (product.tipoMantenimiento) {
        text += `Tipo de mantenimiento: ${product.tipoMantenimiento}\n`;
      }
      if (product.marca) {
        text += `Marca: ${product.marca}\n`;
      }
      if (product.modelo) {
        text += `Modelo: ${product.modelo}\n`;
      }
      if (product.codigo) {
        text += `Código: ${product.codigo}\n`;
      }
      text += "\n";

      // Pasos de mantenimiento
      product.pasos.forEach((paso, pasoIndex) => {
        text += `  PASO ${pasoIndex + 1}: ${paso.descripcion || "[COMPLETAR DESCRIPCIÓN]"}\n`;
        
        for (let f = 1; f <= paso.fotos; f++) {
          text += `    Foto ${f}\n`;
        }
        text += "\n";
      });
    }

    text += "\n";
  });

  // Pie de página
  text += "=".repeat(80) + "\n";
  text += "FIN DEL REPORTE\n";
  text += "=".repeat(80) + "\n\n";
  text += `Generado el: ${new Date().toLocaleString("es-ES")}\n`;

  return text;
}

/**
 * Formatea una fecha en formato legible
 */
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Descarga el reporte como archivo de texto
 */
export function downloadReport(generalInfo, products) {
  const text = generateReportText(generalInfo, products);
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  const fileName = `Reporte_Mantenimiento_${generalInfo.dependencia.replace(/\s+/g, "_")}_${generalInfo.fecha}.txt`;
  
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
