# Documentación de Datos de Adquisiciones (JSX/JavaScript)

## 📁 Estructura de Archivos

```
kurs/
├── data/
│   ├── adquisiciones-totales.json          # 25 productos, 571 unidades
│   ├── adquisiciones-por-mes.json          # Dividido por mes 1, 2, 3
│   ├── adquisiciones-por-dependencia.json  # 36 dependencias con detalle
│   └── metadata.json                       # Información general
└── lib/
    └── adquisiciones.js                    # Funciones helper (JavaScript)
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

## 🔧 Uso en la Aplicación JSX

### 1. Importar funciones helper

```javascript
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
} from './lib/adquisiciones';
```

### 2. Ejemplos de uso

#### Obtener todos los productos
```javascript
const totales = getAdquisicionesTotales();
console.log(totales.metadata.total_unidades); // 571
console.log(totales.productos); // Array de 25 productos
```

#### Obtener productos de un mes específico
```javascript
const productosMes1 = getProductosPorMes(1);
// Retorna array de productos del mes 1
```

#### Buscar una dependencia
```javascript
const palacio = getDependencia('PALACIO MUNICIPAL');
console.log(palacio?.mes); // 1
console.log(palacio?.total_unidades); // Total de unidades en esa dependencia
console.log(palacio?.productos); // Array de productos
```

#### Obtener todas las dependencias de un mes
```javascript
const dependenciasMes2 = getDependenciasPorMes(2);
// Retorna array de dependencias del mes 2
```

#### Buscar productos por nombre
```javascript
const mangueras = buscarProductos('manguera');
// Retorna todos los productos que contengan "manguera"
```

#### Obtener top 10 productos
```javascript
const top10 = getTopProductos(10);
// Retorna los 10 productos con mayor cantidad
```

#### Obtener estadísticas generales
```javascript
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

## 🎨 Ejemplos de Componentes React/JSX

### Tabla de productos totales
```jsx
import { getAdquisicionesTotales } from './lib/adquisiciones';

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

### Selector de mes con useState
```jsx
import { getAdquisicionesPorMes } from './lib/adquisiciones';
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
```jsx
import { getDependencia } from './lib/adquisiciones';

export function TarjetaDependencia({ nombre }) {
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
            <small className="block text-gray-500">{p.accion}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Dashboard con estadísticas
```jsx
import { getEstadisticas } from './lib/adquisiciones';

export function Dashboard() {
  const stats = getEstadisticas();
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="stat-card">
        <h3>Total Productos</h3>
        <p className="text-3xl">{stats.totalProductos}</p>
      </div>
      
      <div className="stat-card">
        <h3>Total Unidades</h3>
        <p className="text-3xl">{stats.totalUnidades}</p>
      </div>
      
      <div className="stat-card">
        <h3>Dependencias</h3>
        <p className="text-3xl">{stats.totalDependencias}</p>
      </div>
      
      <div className="col-span-3">
        <h3>Distribución por Mes</h3>
        {stats.distribucionPorMes.map(m => (
          <div key={m.mes} className="flex items-center gap-2">
            <span>Mes {m.mes}:</span>
            <div className="flex-1 bg-gray-200 rounded">
              <div 
                className="bg-blue-500 h-6 rounded"
                style={{ width: `${m.porcentaje}%` }}
              />
            </div>
            <span>{m.unidades} ({m.porcentaje}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Lista de dependencias filtrable
```jsx
import { getDependenciasPorMes } from './lib/adquisiciones';
import { useState } from 'react';

export function ListaDependencias() {
  const [mesSeleccionado, setMesSeleccionado] = useState(1);
  const dependencias = getDependenciasPorMes(mesSeleccionado);
  
  return (
    <div>
      <div className="mb-4">
        <button onClick={() => setMesSeleccionado(1)}>Mes 1</button>
        <button onClick={() => setMesSeleccionado(2)}>Mes 2</button>
        <button onClick={() => setMesSeleccionado(3)}>Mes 3</button>
      </div>
      
      <div className="grid gap-4">
        {dependencias.map((dep, i) => (
          <div key={i} className="border p-4 rounded">
            <h3 className="font-bold">{dep.nombre}</h3>
            <p className="text-sm text-gray-600">
              {dep.total_productos} productos | {dep.total_unidades} unidades
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Buscador de productos
```jsx
import { buscarProductos } from './lib/adquisiciones';
import { useState } from 'react';

export function BuscadorProductos() {
  const [termino, setTermino] = useState('');
  const resultados = termino ? buscarProductos(termino) : [];
  
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      {resultados.length > 0 && (
        <ul className="mt-4">
          {resultados.map((p, i) => (
            <li key={i} className="p-2 border-b">
              {p.nombre} - <strong>{p.cantidad}</strong> unidades
            </li>
          ))}
        </ul>
      )}
      
      {termino && resultados.length === 0 && (
        <p className="mt-4 text-gray-500">No se encontraron productos</p>
      )}
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

## 📝 Configuración Next.js

Para que funcione la importación de JSON en Next.js, asegúrate de tener en tu `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otras configuraciones...
}

module.exports = nextConfig
```

Next.js ya soporta importación de JSON por defecto, no necesitas configuración adicional.

## 📝 Notas

- Los archivos JSON se generan automáticamente desde el Excel `MIMG - KURS.xlsx`
- Los datos incluyen solo las **adquisiciones** (no mantenimientos)
- Los gabinetes están separados en dos categorías:
  - `GABINETE CONTRA INCENDIOS (ESTRUCTURA METÁLICA)`
  - `GABINETE CONTRA INCENDIOS (HACHA, 2 TRAMOS DE MANGUERA...)`
- Todas las cantidades están verificadas y suman exactamente **571 unidades**
- Todas las funciones están documentadas con JSDoc para mejor autocompletado en VSCode
