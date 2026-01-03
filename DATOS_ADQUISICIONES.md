# Documentación de Datos de Adquisiciones

## 📁 Estructura de Archivos

```
kurs/
├── data/
│   ├── adquisiciones-totales.json          # 25 productos, 571 unidades
│   ├── adquisiciones-por-mes.json          # Dividido por mes 1, 2, 3
│   ├── adquisiciones-por-dependencia.json  # 36 dependencias con detalle
│   └── metadata.json                       # Información general
├── types/
│   └── adquisiciones.ts                    # Tipos TypeScript
└── lib/
    └── adquisiciones.ts                    # Funciones helper
```

## 📊 Resumen de Datos

- **Total de productos únicos:** 25
- **Total de unidades:** 571
- **Total de dependencias:** 36
- **Meses de ejecución:** 3

### Distribución por Mes:
- **Mes 1:** 181 unidades (31.7%)
- **Mes 2:** 210 unidades (36.8%)
- **Mes 3:** 180 unidades (31.5%)

## 🔧 Uso en la Aplicación

### 1. Importar funciones helper

```typescript
import {
  getAdquisicionesTotales,
  getAdquisicionesPorMes,
  getAdquisicionesPorDependencia,
  getMetadata,
  getProductosPorMes,
  getDependencia,
  getDependenciasPorMes,
  buscarProductos,
  getTopProductos,
  getEstadisticas
} from '@/lib/adquisiciones';
```

### 2. Ejemplos de uso

#### Obtener todos los productos
```typescript
const totales = getAdquisicionesTotales();
console.log(totales.metadata.total_unidades); // 571
console.log(totales.productos); // Array de 25 productos
```

#### Obtener productos de un mes específico
```typescript
const productosMes1 = getProductosPorMes(1);
// Retorna array de productos del mes 1
```

#### Buscar una dependencia
```typescript
const palacio = getDependencia('PALACIO MUNICIPAL');
console.log(palacio?.mes); // 1
console.log(palacio?.total_unidades); // Total de unidades en esa dependencia
console.log(palacio?.productos); // Array de productos
```

#### Obtener todas las dependencias de un mes
```typescript
const dependenciasMes2 = getDependenciasPorMes(2);
// Retorna array de dependencias del mes 2
```

#### Buscar productos por nombre
```typescript
const mangueras = buscarProductos('manguera');
// Retorna todos los productos que contengan "manguera"
```

#### Obtener top 10 productos
```typescript
const top10 = getTopProductos(10);
// Retorna los 10 productos con mayor cantidad
```

#### Obtener estadísticas generales
```typescript
const stats = getEstadisticas();
console.log(stats);
// {
//   totalProductos: 25,
//   totalUnidades: 571,
//   totalDependencias: 36,
//   promedioUnidadesPorMes: 190,
//   distribucionPorMes: [...]
// }
```

## 📋 Estructura de los JSON

### adquisiciones-totales.json
```json
{
  "metadata": {
    "generado": "2024-12-30T...",
    "total_productos": 25,
    "total_unidades": 571
  },
  "productos": [
    {
      "nombre": "MANGUERAS DOBLE CHAQUETA DE 1 ½ DE 15 METROS",
      "cantidad": 175
    },
    ...
  ]
}
```

### adquisiciones-por-mes.json
```json
{
  "metadata": {
    "generado": "2024-12-30T...",
    "total_meses": 3
  },
  "meses": [
    {
      "mes": 1,
      "total_productos": 13,
      "total_unidades": 181,
      "productos": [...]
    },
    ...
  ]
}
```

### adquisiciones-por-dependencia.json
```json
{
  "metadata": {
    "generado": "2024-12-30T...",
    "total_dependencias": 36
  },
  "dependencias": [
    {
      "nombre": "CENTRO TÉCNICO MUNICIPAL",
      "mes": 2,
      "total_productos": 10,
      "total_unidades": 73,
      "productos": [
        {
          "nombre": "MANGUERAS DOBLE CHAQUETA...",
          "cantidad": 26,
          "accion": "Adquisición de..."
        },
        ...
      ]
    },
    ...
  ]
}
```

### metadata.json
```json
{
  "proyecto": "MIMG - KURS",
  "descripcion": "Análisis de adquisiciones para sistema contra incendios",
  "generado": "2024-12-30T...",
  "resumen": {
    "total_productos_unicos": 25,
    "total_unidades": 571,
    "total_dependencias": 36,
    "total_meses": 3
  },
  "por_mes": [...]
}
```

## 🎨 Ejemplos de Componentes React

### Tabla de productos totales
```tsx
import { getAdquisicionesTotales } from '@/lib/adquisiciones';

export function TablaProductos() {
  const { productos } = getAdquisicionesTotales();
  
  return (
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p, i) => (
          <tr key={i}>
            <td>{p.nombre}</td>
            <td>{p.cantidad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Selector de mes
```tsx
import { getAdquisicionesPorMes } from '@/lib/adquisiciones';
import { useState } from 'react';

export function SelectorMes() {
  const [mesSeleccionado, setMesSeleccionado] = useState(1);
  const { meses } = getAdquisicionesPorMes();
  const mesData = meses.find(m => m.mes === mesSeleccionado);
  
  return (
    <div>
      <select onChange={(e) => setMesSeleccionado(Number(e.target.value))}>
        {meses.map(m => (
          <option key={m.mes} value={m.mes}>
            Mes {m.mes} ({m.total_unidades} unidades)
          </option>
        ))}
      </select>
      
      <div>
        <h3>Productos del Mes {mesSeleccionado}</h3>
        <ul>
          {mesData?.productos.map((p, i) => (
            <li key={i}>{p.nombre}: {p.cantidad}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Tarjeta de dependencia
```tsx
import { getDependencia } from '@/lib/adquisiciones';

export function TarjetaDependencia({ nombre }: { nombre: string }) {
  const dep = getDependencia(nombre);
  
  if (!dep) return <div>Dependencia no encontrada</div>;
  
  return (
    <div className="card">
      <h2>{dep.nombre}</h2>
      <p>Mes: {dep.mes}</p>
      <p>Total productos: {dep.total_productos}</p>
      <p>Total unidades: {dep.total_unidades}</p>
      
      <h3>Productos:</h3>
      <ul>
        {dep.productos.map((p, i) => (
          <li key={i}>
            {p.nombre} - {p.cantidad} unidades
            <small>{p.accion}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔄 Regenerar los datos

Si necesitas regenerar los archivos JSON desde el Excel original:

```bash
cd c:\Users\luism\Documents\Luis Code\baseball\next\plop
python generar_json_para_web.py
```

Esto actualizará todos los archivos JSON en `kurs/data/` con los datos más recientes.

## 📝 Notas

- Los archivos JSON se generan automáticamente desde el Excel `MIMG - KURS.xlsx`
- Los datos incluyen solo las **adquisiciones** (no mantenimientos)
- Los gabinetes están separados en dos categorías:
  - `GABINETE CONTRA INCENDIOS (ESTRUCTURA METÁLICA)`
  - `GABINETE CONTRA INCENDIOS (HACHA, 2 TRAMOS DE MANGUERA...)`
- Todas las cantidades están verificadas y suman exactamente **571 unidades**
