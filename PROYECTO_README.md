# Generador de Reportes de Mantenimiento

Una aplicación web moderna para generar reportes estructurados de mantenimiento correctivo, preventivo y adquisiciones.

## 🎯 Características

- **Información General**: Captura dependencia/edificio, fecha y hora
- **Gestión de Productos**: Agrega múltiples tipos de productos con sus modelos
- **Pasos de Mantenimiento**: Define pasos específicos para cada tipo de producto
- **Cantidad Variable**: Especifica cuántas unidades de cada tipo de producto
- **Cálculo de Fotos**: Calcula automáticamente el total de fotos requeridas
- **Generación de Reporte**: Descarga un archivo de texto estructurado listo para Word
- **Interfaz Moderna**: UI limpia y responsive con Tailwind CSS

## 📁 Estructura del Proyecto

```
src/
├── app/
│   └── page.js                    # Página principal con lógica de estado
├── components/
│   ├── GeneralInfo.jsx            # Formulario de información general
│   ├── ProductForm.jsx            # Formulario para agregar productos
│   ├── MaintenanceSteps.jsx       # Gestión de pasos de mantenimiento
│   ├── ProductList.jsx            # Lista de productos agregados
│   ├── Instructions.jsx           # Instrucciones de uso
│   └── ReportGenerator.jsx        # Botón y resumen para generar reporte
└── utils/
    └── reportGenerator.js         # Lógica para generar y descargar reportes
```

## 🚀 Uso

1. **Completa la Información General**
   - Dependencia/Edificio
   - Fecha
   - Hora

2. **Agrega Tipos de Productos**
   - Nombre del producto (ej: Extintor PQS, Detector de humo)
   - Modelo
   - Tipo de mantenimiento (Preventivo, Correctivo, Instalación)
   - Cantidad de unidades

3. **Define Pasos de Mantenimiento**
   - Descripción de cada paso
   - Número de fotos requeridas por paso
   - Agrega más pasos según necesites

4. **Genera el Reporte**
   - Revisa el resumen de productos y fotos
   - Haz clic en "Generar Estructura del Reporte"
   - Se descargará un archivo .txt

5. **Completa el Reporte**
   - Abre el archivo en Word
   - Completa los números de serie individuales
   - Inserta las fotos en los espacios indicados
   - Agrega observaciones y estado final

## 💡 Ejemplo de Flujo

### Escenario: Mantenimiento de Extintores y Detectores

1. **Información General**
   - Dependencia: Edificio Central
   - Fecha: 12/03/2025
   - Hora: 08:03 PM

2. **Producto 1: Extintor PQS**
   - Modelo: ABC-2000
   - Tipo: Preventivo
   - Cantidad: 5 unidades
   - Pasos:
     - Paso 1: Estado inicial (1 foto)
     - Paso 2: Revisión de presión (1 foto)
     - Paso 3: Estado final (1 foto)
   - Total: 3 fotos × 5 unidades = 15 fotos

3. **Producto 2: Detector de Humo**
   - Modelo: DH-500
   - Tipo: Preventivo
   - Cantidad: 3 unidades
   - Pasos:
     - Paso 1: Estado inicial (1 foto)
     - Paso 2: Prueba de funcionamiento (2 fotos)
   - Total: 3 fotos × 3 unidades = 9 fotos

**Total del Reporte: 24 fotos requeridas**

## 🎨 Componentes Modulares

### GeneralInfo
Captura la información básica del reporte (dependencia, fecha, hora).

### ProductForm
Formulario completo para agregar un tipo de producto con sus pasos de mantenimiento.

### MaintenanceSteps
Gestiona la lista de pasos para cada producto, permitiendo agregar más pasos dinámicamente.

### ProductList
Muestra todos los productos agregados con opción de eliminar.

### ReportGenerator
Muestra el resumen y permite generar el reporte final.

### Instructions
Guía paso a paso para usar la aplicación.

## 📝 Formato del Reporte Generado

El reporte generado incluye:
- Encabezado con título
- Información general
- Resumen (tipos de productos, unidades totales, fotos totales)
- Para cada tipo de producto:
  - Información del producto
  - Para cada unidad:
    - Número de serie (para completar)
    - Pasos de mantenimiento con espacios para fotos
    - Observaciones
    - Estado final
- Pie de página con fecha de generación

## 🛠️ Tecnologías

- **Next.js 16** - Framework React
- **React 19** - Biblioteca UI
- **Tailwind CSS** - Estilos
- **JavaScript ES6+** - Lógica de negocio

## 🔧 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en el navegador
http://localhost:3000
```

## 📦 Características Futuras Potenciales

- [ ] Exportar a formato Word (.docx) directamente
- [ ] Guardar borradores en localStorage
- [ ] Plantillas predefinidas de productos comunes
- [ ] Importar/exportar configuraciones
- [ ] Modo oscuro
- [ ] Impresión directa
- [ ] Generación de códigos QR para productos
- [ ] Historial de reportes generados

## 📄 Licencia

Proyecto de uso interno para documentación de mantenimiento.
