# Estructura del Proyecto - Generador de Reportes de Mantenimiento

## 📂 Arquitectura de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                      page.js (Main)                      │
│  - Gestión de estado global                             │
│  - Lógica de negocio principal                          │
│  - Coordinación de componentes                          │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Instructions │   │ GeneralInfo  │   │ ProductForm  │
│              │   │              │   │              │
│ - Guía de    │   │ - Dependencia│   │ - Nombre     │
│   uso        │   │ - Fecha      │   │ - Modelo     │
│              │   │ - Hora       │   │ - Tipo       │
│              │   │              │   │ - Cantidad   │
└──────────────┘   └──────────────┘   └──────┬───────┘
                                              │
                                              ▼
                                   ┌──────────────────┐
                                   │MaintenanceSteps  │
                                   │                  │
                                   │ - Descripción    │
                                   │ - Fotos          │
                                   │ - Agregar paso   │
                                   └──────────────────┘
        ┌───────────────────────────────────┐
        │                                   │
        ▼                                   ▼
┌──────────────┐                   ┌──────────────────┐
│ ProductList  │                   │ ReportGenerator  │
│              │                   │                  │
│ - Lista de   │                   │ - Resumen        │
│   productos  │                   │ - Generar        │
│ - Eliminar   │                   │ - Descargar      │
└──────────────┘                   └──────────────────┘
                                            │
                                            ▼
                                   ┌──────────────────┐
                                   │ reportGenerator  │
                                   │     (Utils)      │
                                   │                  │
                                   │ - Formatear      │
                                   │ - Generar texto  │
                                   │ - Descargar      │
                                   └──────────────────┘
```

## 🔄 Flujo de Datos

### 1. Estado Global (page.js)
```javascript
generalInfo = {
  dependencia: string,
  fecha: string,
  hora: string
}

currentProduct = {
  nombre: string,
  modelo: string,
  tipoMantenimiento: string,
  cantidad: number,
  pasos: [
    { descripcion: string, fotos: number }
  ]
}

products = [currentProduct, ...]
reportGenerated = boolean
```

### 2. Flujo de Acciones

```
Usuario completa GeneralInfo
        ↓
Estado: generalInfo actualizado
        ↓
Usuario llena ProductForm
        ↓
Usuario agrega MaintenanceSteps
        ↓
Usuario hace clic en "Agregar Producto"
        ↓
Estado: currentProduct → products[]
        ↓
ProductList muestra productos agregados
        ↓
Usuario hace clic en "Generar Reporte"
        ↓
ReportGenerator valida datos
        ↓
reportGenerator.js genera texto
        ↓
Descarga archivo .txt
        ↓
Estado: reportGenerated = true
```

## 🎨 Esquema de Colores por Sección

| Componente | Color Base | Uso |
|------------|------------|-----|
| GeneralInfo | Rojo (`red-50`, `red-800`) | Información básica |
| ProductForm | Naranja (`orange-50`, `orange-800`) | Formulario de productos |
| MaintenanceSteps | Naranja (`orange-500`) | Pasos de mantenimiento |
| ProductList | Azul (`blue-50`, `blue-800`) | Lista de productos |
| Instructions | Azul claro (`blue-100`) | Instrucciones |
| ReportGenerator | Púrpura (`purple-50`, `purple-800`) | Generación final |
| Success Message | Verde (`green-50`, `green-800`) | Confirmación |

## 📋 Responsabilidades de Componentes

### GeneralInfo.jsx
- **Props**: `data`, `onChange`
- **Responsabilidad**: Capturar información general del reporte
- **Estado**: Ninguno (controlado por padre)

### ProductForm.jsx
- **Props**: `product`, `onChange`, `onAddToReport`
- **Responsabilidad**: Formulario completo para un producto
- **Componentes hijos**: MaintenanceSteps
- **Lógica**: Validación de campos requeridos

### MaintenanceSteps.jsx
- **Props**: `steps`, `onChange`, `onAddStep`
- **Responsabilidad**: Gestionar lista de pasos de mantenimiento
- **Estado**: Ninguno (controlado por ProductForm)

### ProductList.jsx
- **Props**: `products`, `onRemove`
- **Responsabilidad**: Mostrar productos agregados con resumen
- **Cálculos**: Total de fotos por producto

### Instructions.jsx
- **Props**: Ninguno
- **Responsabilidad**: Mostrar guía de uso
- **Estado**: Ninguno (componente estático)

### ReportGenerator.jsx
- **Props**: `generalInfo`, `products`, `onGenerate`
- **Responsabilidad**: Validar y generar reporte
- **Cálculos**: Totales generales (productos, unidades, fotos)

## 🛠️ Utilidades

### reportGenerator.js

#### `generateReportText(generalInfo, products)`
- Genera el contenido del reporte en formato texto
- Estructura jerárquica: Reporte → Productos → Unidades → Pasos
- Incluye espacios para completar números de serie y fotos

#### `formatDate(dateString)`
- Convierte fecha ISO a formato legible español
- Ejemplo: "2025-03-12" → "12/03/2025"

#### `downloadReport(generalInfo, products)`
- Crea un Blob con el texto del reporte
- Genera nombre de archivo dinámico
- Inicia descarga automática

## 🔐 Validaciones

### Nivel 1: Campos Requeridos
- ✅ Nombre del producto
- ✅ Modelo del producto
- ⚠️ Tipo de mantenimiento (opcional)

### Nivel 2: Generación de Reporte
- ✅ Información general completa (dependencia, fecha, hora)
- ✅ Al menos un producto agregado

### Nivel 3: UX
- Botones deshabilitados cuando faltan datos
- Mensajes de error claros
- Confirmación antes de reiniciar

## 📊 Cálculos Automáticos

### Por Producto
```
fotosPorUnidad = Σ(paso.fotos)
fotosProducto = fotosPorUnidad × cantidad
```

### Total del Reporte
```
totalProductos = Σ(producto.cantidad)
totalFotos = Σ(producto.fotosProducto)
```

## 🎯 Casos de Uso Principales

### Caso 1: Mantenimiento Preventivo de Extintores
- 5 extintores
- 3 pasos cada uno
- 1 foto por paso
- Total: 15 fotos

### Caso 2: Instalación de Detectores
- 10 detectores
- 4 pasos cada uno
- 1-2 fotos por paso
- Total: 50-60 fotos

### Caso 3: Reporte Mixto
- 5 extintores (15 fotos)
- 3 detectores (12 fotos)
- 2 luces de emergencia (10 fotos)
- Total: 37 fotos

## 🚀 Extensibilidad

### Agregar Nuevos Campos
1. Actualizar estado en `page.js`
2. Crear/modificar componente de formulario
3. Actualizar `reportGenerator.js` para incluir en el reporte

### Agregar Plantillas
1. Definir en `productTemplates.js`
2. Crear selector en `ProductForm.jsx`
3. Cargar plantilla al seleccionar

### Cambiar Formato de Salida
1. Modificar `generateReportText()` en `reportGenerator.js`
2. Opcionalmente: crear nuevas funciones para otros formatos (PDF, DOCX)
