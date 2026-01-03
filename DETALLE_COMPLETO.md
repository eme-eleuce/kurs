# JSON Detalle Completo por Dependencia

## 📄 Archivo: `dependencias-detalle-completo.json`

Este archivo contiene **TODOS** los productos de cada dependencia, no solo adquisiciones. Incluye:
- ✅ Adquisiciones
- ✅ Mantenimientos preventivos
- ✅ Mantenimientos correctivos
- ✅ Otros productos

## 📊 Estadísticas del archivo:

- **Total de dependencias:** 40
- **Total de productos:** 443
- **Adquisiciones:** 138
- **Mantenimientos preventivos:** 256
- **Mantenimientos correctivos:** 49

## 📋 Estructura del JSON

```json
{
  "metadata": {
    "generado": "2025-12-30T...",
    "fuente": "MIMG - KURS.xlsx - Hoja: Esp. por Dependencia",
    "total_dependencias": 40,
    "total_productos": 443,
    "descripcion": "Detalle completo de todos los productos...",
    "por_tipo": {
      "adquisicion": 138,
      "mantenimiento_preventivo": 256,
      "mantenimiento_correctivo": 49,
      "mantenimiento": 0,
      "otro": 0
    }
  },
  "dependencias": [
    {
      "nombre": "CENTRO TÉCNICO MUNICIPAL",
      "mes": 2,
      "total_productos": 73,
      "productos": [
        {
          "cantidad": 2,
          "item": "PITONES CON EDUCTORES DE EPSUMA...",
          "unidad": "u",
          "estado": "BUENO",
          "observacion": "",
          "accion": "Adquisición de...",
          "tipo": "adquisicion"
        },
        {
          "cantidad": 35,
          "item": "VÁLVULA DE ÁNGULO PARA PROTECCIÓN...",
          "unidad": "u",
          "estado": "REGULAR",
          "observacion": "Falta de válvulas",
          "accion": "Mantenimiento Preventivo",
          "tipo": "mantenimiento_preventivo"
        }
      ]
    }
  ]
}
```

## 🔧 Funciones disponibles en `lib/adquisiciones.js`

### 1. Obtener todas las dependencias con detalle completo
```javascript
import { getDependenciasDetalleCompleto } from './lib/adquisiciones';

const detalle = getDependenciasDetalleCompleto();
console.log(detalle.metadata.total_productos); // 443
console.log(detalle.dependencias); // Array de 40 dependencias
```

### 2. Obtener una dependencia específica con todos sus productos
```javascript
import { getDependenciaDetalleCompleto } from './lib/adquisiciones';

const ctm = getDependenciaDetalleCompleto('CENTRO TÉCNICO MUNICIPAL');
console.log(ctm.nombre);
console.log(ctm.mes); // 2
console.log(ctm.total_productos); // 73
console.log(ctm.productos); // Array de todos los productos
```

### 3. Filtrar productos por tipo
```javascript
import { getProductosPorTipo } from './lib/adquisiciones';

// Obtener solo adquisiciones
const adquisiciones = getProductosPorTipo('PALACIO MUNICIPAL', 'adquisicion');

// Obtener solo mantenimientos preventivos
const preventivos = getProductosPorTipo('PALACIO MUNICIPAL', 'mantenimiento_preventivo');

// Obtener solo mantenimientos correctivos
const correctivos = getProductosPorTipo('PALACIO MUNICIPAL', 'mantenimiento_correctivo');
```

### 4. Obtener solo adquisiciones de una dependencia
```javascript
import { getAdquisicionesDependencia } from './lib/adquisiciones';

const adquisiciones = getAdquisicionesDependencia('MERCADO CENTRAL');
// Retorna solo los productos de tipo 'adquisicion'
```

### 5. Obtener mantenimientos de una dependencia
```javascript
import { getMantenimientosDependencia } from './lib/adquisiciones';

// Todos los mantenimientos
const todos = getMantenimientosDependencia('PALACIO MUNICIPAL');

// Solo preventivos
const preventivos = getMantenimientosDependencia('PALACIO MUNICIPAL', 'preventivo');

// Solo correctivos
const correctivos = getMantenimientosDependencia('PALACIO MUNICIPAL', 'correctivo');
```

### 6. Obtener estadísticas de una dependencia
```javascript
import { getEstadisticasDependencia } from './lib/adquisiciones';

const stats = getEstadisticasDependencia('CENTRO TÉCNICO MUNICIPAL');
console.log(stats);
// {
//   nombre: "CENTRO TÉCNICO MUNICIPAL",
//   mes: 2,
//   totalProductos: 73,
//   porTipo: {
//     adquisicion: 10,
//     mantenimiento_preventivo: 60,
//     mantenimiento_correctivo: 3,
//     mantenimiento: 0,
//     otro: 0
//   }
// }
```

## 🎨 Ejemplos de Componentes React

### Tabla completa de productos de una dependencia
```jsx
import { getDependenciaDetalleCompleto } from './lib/adquisiciones';

export function TablaProductosDependencia({ nombre }) {
  const dep = getDependenciaDetalleCompleto(nombre);
  
  if (!dep) return <div>Dependencia no encontrada</div>;
  
  return (
    <div>
      <h2>{dep.nombre}</h2>
      <p>Mes: {dep.mes} | Total productos: {dep.total_productos}</p>
      
      <table>
        <thead>
          <tr>
            <th>Cant.</th>
            <th>Producto</th>
            <th>Unidad</th>
            <th>Estado</th>
            <th>Tipo</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {dep.productos.map((p, i) => (
            <tr key={i}>
              <td>{p.cantidad}</td>
              <td>{p.item}</td>
              <td>{p.unidad}</td>
              <td>{p.estado}</td>
              <td>
                <span className={`badge ${p.tipo}`}>
                  {p.tipo.replace('_', ' ')}
                </span>
              </td>
              <td className="text-sm">{p.accion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Filtro por tipo de producto
```jsx
import { getDependenciaDetalleCompleto } from './lib/adquisiciones';
import { useState } from 'react';

export function FiltroProductos({ nombreDependencia }) {
  const [tipoFiltro, setTipoFiltro] = useState('todos');
  const dep = getDependenciaDetalleCompleto(nombreDependencia);
  
  if (!dep) return null;
  
  const productosFiltrados = tipoFiltro === 'todos' 
    ? dep.productos 
    : dep.productos.filter(p => p.tipo === tipoFiltro);
  
  return (
    <div>
      <div className="mb-4">
        <select 
          value={tipoFiltro} 
          onChange={(e) => setTipoFiltro(e.target.value)}
        >
          <option value="todos">Todos ({dep.total_productos})</option>
          <option value="adquisicion">
            Adquisiciones ({dep.productos.filter(p => p.tipo === 'adquisicion').length})
          </option>
          <option value="mantenimiento_preventivo">
            Mant. Preventivos ({dep.productos.filter(p => p.tipo === 'mantenimiento_preventivo').length})
          </option>
          <option value="mantenimiento_correctivo">
            Mant. Correctivos ({dep.productos.filter(p => p.tipo === 'mantenimiento_correctivo').length})
          </option>
        </select>
      </div>
      
      <div className="grid gap-2">
        {productosFiltrados.map((p, i) => (
          <div key={i} className="border p-3 rounded">
            <div className="flex justify-between">
              <strong>{p.item}</strong>
              <span className="text-gray-600">x{p.cantidad}</span>
            </div>
            <p className="text-sm text-gray-500">{p.accion}</p>
            {p.observacion && (
              <p className="text-sm text-orange-600">⚠️ {p.observacion}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Dashboard de estadísticas por dependencia
```jsx
import { getEstadisticasDependencia } from './lib/adquisiciones';

export function DashboardDependencia({ nombre }) {
  const stats = getEstadisticasDependencia(nombre);
  
  if (!stats) return <div>Dependencia no encontrada</div>;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="stat-card">
        <h4>Total</h4>
        <p className="text-2xl">{stats.totalProductos}</p>
      </div>
      
      <div className="stat-card bg-blue-50">
        <h4>Adquisiciones</h4>
        <p className="text-2xl text-blue-600">{stats.porTipo.adquisicion}</p>
      </div>
      
      <div className="stat-card bg-green-50">
        <h4>Mant. Preventivo</h4>
        <p className="text-2xl text-green-600">{stats.porTipo.mantenimiento_preventivo}</p>
      </div>
      
      <div className="stat-card bg-orange-50">
        <h4>Mant. Correctivo</h4>
        <p className="text-2xl text-orange-600">{stats.porTipo.mantenimiento_correctivo}</p>
      </div>
      
      <div className="stat-card bg-purple-50">
        <h4>Mes</h4>
        <p className="text-2xl text-purple-600">{stats.mes}</p>
      </div>
    </div>
  );
}
```

### Comparador de dependencias
```jsx
import { getDependenciaDetalleCompleto } from './lib/adquisiciones';

export function ComparadorDependencias({ nombres }) {
  const dependencias = nombres.map(n => getDependenciaDetalleCompleto(n)).filter(Boolean);
  
  return (
    <table>
      <thead>
        <tr>
          <th>Dependencia</th>
          <th>Mes</th>
          <th>Total</th>
          <th>Adquisiciones</th>
          <th>Mant. Prev.</th>
          <th>Mant. Corr.</th>
        </tr>
      </thead>
      <tbody>
        {dependencias.map((dep, i) => {
          const adq = dep.productos.filter(p => p.tipo === 'adquisicion').length;
          const prev = dep.productos.filter(p => p.tipo === 'mantenimiento_preventivo').length;
          const corr = dep.productos.filter(p => p.tipo === 'mantenimiento_correctivo').length;
          
          return (
            <tr key={i}>
              <td>{dep.nombre}</td>
              <td>{dep.mes}</td>
              <td>{dep.total_productos}</td>
              <td>{adq}</td>
              <td>{prev}</td>
              <td>{corr}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
```

## 📝 Tipos de productos

- **`adquisicion`**: Productos a adquirir
- **`mantenimiento_preventivo`**: Mantenimientos preventivos
- **`mantenimiento_correctivo`**: Mantenimientos correctivos
- **`mantenimiento`**: Otros mantenimientos
- **`otro`**: Otros tipos

## 🔄 Regenerar el archivo

```bash
cd c:\Users\luism\Documents\Luis Code\baseball\next\plop
python generar_json_detalle_completo.py
```

## 📌 Diferencias con otros archivos JSON

| Archivo | Contenido | Productos |
|---------|-----------|-----------|
| `adquisiciones-totales.json` | Solo adquisiciones consolidadas | 25 únicos |
| `adquisiciones-por-mes.json` | Solo adquisiciones por mes | 138 total |
| `adquisiciones-por-dependencia.json` | Solo adquisiciones por dependencia | 138 total |
| `dependencias-detalle-completo.json` | **TODOS los productos** | **443 total** |

**Usa este archivo cuando necesites:**
- Ver todos los productos de una dependencia (no solo adquisiciones)
- Filtrar por tipo de producto
- Mostrar mantenimientos preventivos y correctivos
- Análisis completo de cada dependencia
