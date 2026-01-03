import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

export async function generateWordReport(reportData) {
  const { titulo, productos, tipo } = reportData;

  // Crear secciones del documento
  const sections = [];

  // Título principal
  sections.push(
    new Paragraph({
      children: [
        new TextRun({
          text: titulo,
          bold: true,
          color: "000000",
          size: 32,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: {
        after: 400,
      },
    })
  );

  // Procesar cada producto
  productos.forEach((producto, idx) => {
    // Nombre del producto
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: producto.item.toUpperCase(),
            bold: true,
            color: "000000",
            size: 28,
          }),
        ],
        spacing: {
          before: 300,
          after: 200,
        },
      })
    );

    // Información del producto - Cantidad
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Cantidad: ",
            bold: true,
            color: "000000",
          }),
          new TextRun({
            text: producto.cantidad.toString(),
            color: "000000",
          }),
        ],
        spacing: {
          after: tipo === "adquisiciones" ? 200 : 100,
        },
      })
    );

    if (tipo === "mantenimiento") {
      // Información adicional para mantenimiento
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Marca / modelo / serie: ",
              bold: true,
              color: "000000",
            }),
            new TextRun({
              text: `${producto.marca || 'N/A'}${producto.modelo ? ` - ${producto.modelo}` : ''}`,
              color: "000000",
            }),
          ],
          spacing: {
            after: 100,
          },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Situación requerida: ",
              bold: true,
              color: "000000",
            }),
            new TextRun({
              text: producto.tipoTexto,
              color: "000000",
            }),
          ],
          spacing: {
            after: 200,
          },
        })
      );

      // Detalle del mantenimiento (pasos)
      if (producto.pasos && producto.pasos.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Detalle del mantenimiento:",
                bold: true,
                color: "000000",
              }),
            ],
            spacing: {
              before: 200,
              after: 100,
            },
          })
        );

        producto.pasos.forEach((paso) => {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${paso.descripcion}`,
                  color: "000000",
                }),
              ],
              spacing: {
                after: 50,
              },
              indent: {
                left: 360,
              },
            })
          );
        });
      }

      // Sección de fotos - Mantenimiento
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "TRABAJOS DURANTE EL MANTENIMIENTO",
              bold: true,
              color: "000000",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            before: 300,
            after: 200,
          },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "[Insertar fotos del mantenimiento aquí]",
              color: "000000",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        })
      );
    } else {
      // Formato para adquisiciones
      
      // Sección 1: FICHA TÉCNICA
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "FICHA TÉCNICA",
              bold: true,
              color: "000000",
              size: 24,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            before: 300,
            after: 200,
          },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "[Insertar fotos de la ficha técnica aquí]",
              color: "000000",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        })
      );

      // Líneas en blanco para espacio de fotos de ficha técnica
      sections.push(
        new Paragraph({
          text: "",
          spacing: {
            after: 400,
          },
        })
      );

      sections.push(
        new Paragraph({
          text: "",
          spacing: {
            after: 400,
          },
        })
      );

      // Sección 2: INSERTAR FOTOS (productos)
      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "INSERTAR FOTOS",
              bold: true,
              color: "000000",
              size: 24,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            before: 300,
            after: 200,
          },
        })
      );

      sections.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "[Insertar fotos de productos aquí]",
              color: "000000",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: {
            after: 400,
          },
        })
      );

      // Líneas en blanco para espacio de fotos de productos
      sections.push(
        new Paragraph({
          text: "",
          spacing: {
            after: 400,
          },
        })
      );

      sections.push(
        new Paragraph({
          text: "",
          spacing: {
            after: 400,
          },
        })
      );
    }

    // Líneas en blanco para espacio
    sections.push(
      new Paragraph({
        text: "",
        spacing: {
          after: 400,
        },
      })
    );

    sections.push(
      new Paragraph({
        text: "",
        spacing: {
          after: 400,
        },
      })
    );

    // Espacio entre productos
    if (idx < productos.length - 1) {
      sections.push(
        new Paragraph({
          text: "",
          spacing: {
            after: 400,
          },
        })
      );
    }
  });

  // Crear el documento
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  // Generar y descargar el archivo
  const blob = await Packer.toBlob(doc);
  const tipoNombre = tipo === "mantenimiento" ? "Mantenimiento" : "Adquisiciones";
  const fileName = `${reportData.dependencia.replace(/\s+/g, '_')}_${tipoNombre}.docx`;
  saveAs(blob, fileName);
}
