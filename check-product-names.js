const dependenciasData = require('./src/data/dependencias-detalle-completo.json');
const { maintenanceTemplates } = require('./src/data/maintenanceTemplates.js');

// Extraer todos los nombres únicos de productos de mantenimiento
const productosUnicos = new Set();
dependenciasData.dependencias.forEach(dep => {
  dep.productos.forEach(prod => {
    if (prod.tipo === 'mantenimiento_preventivo' || prod.tipo === 'mantenimiento_correctivo') {
      productosUnicos.add(prod.item);
    }
  });
});

// Extraer todos los nombres de plantillas
const plantillasNombres = new Set();
Object.values(maintenanceTemplates).forEach(template => {
  plantillasNombres.add(template.nombre);
});

console.log('=== ANÁLISIS DE COINCIDENCIAS ===\n');

// Productos sin plantilla exacta
const productosSinPlantilla = [];
productosUnicos.forEach(producto => {
  if (!plantillasNombres.has(producto)) {
    productosSinPlantilla.push(producto);
  }
});

console.log(`Total de productos únicos: ${productosUnicos.size}`);
console.log(`Total de plantillas únicas: ${plantillasNombres.size}\n`);

// Función de normalización mejorada
const normalizarNombre = (nombre) => {
  return nombre
    .toLowerCase()
    .trim()
    .replace(/\bde\b/g, '')
    .replace(/["""']/g, '')
    .replace(/bastago/g, 'vastago')
    .replace(/vástago/g, 'vastago')
    .replace(/válvula/g, 'valvula')
    .replace(/válvulas/g, 'valvulas')
    .replace(/\s+/g, ' ')
    .trim();
};

if (productosSinPlantilla.length > 0) {
  console.log('❌ PRODUCTOS SIN PLANTILLA EXACTA:');
  console.log('='.repeat(50));

  productosSinPlantilla.forEach(prod => {
    console.log(`- ${prod}`);
    
    // Buscar similares con lógica mejorada
    const similares = [];
    const prodNorm = normalizarNombre(prod);
    
    const toSingular = (text) => {
      return text.split(' ').map(word => {
        if (word.endsWith('es')) {
          return word.slice(0, -2);
        } else if (word.endsWith('s')) {
          return word.slice(0, -1);
        }
        return word;
      }).join(' ');
    };
    
    const prodSingular = toSingular(prodNorm);
    
    plantillasNombres.forEach(plantilla => {
      const plantNorm = normalizarNombre(plantilla);
      const plantSingular = toSingular(plantNorm);
      
      // Match exacto normalizado
      if (prodNorm === plantNorm) {
        similares.push(plantilla);
        return;
      }
      
      // Match singular/plural
      if (prodSingular === plantSingular) {
        similares.push(plantilla);
        return;
      }
      if (prodSingular === plantNorm || prodNorm === plantSingular) {
        similares.push(plantilla);
        return;
      }
    });
    
    if (similares.length > 0) {
      console.log(`  ✓ Match flexible encontrado: ${similares.join(', ')}`);
    } else {
      console.log(`  ⚠️  NO HAY MATCH (ni exacto ni flexible)`);
    }
  });
} else {
  console.log('✅ Todos los productos tienen plantilla exacta');
}

console.log('\n' + '='.repeat(50));
console.log('RESUMEN:');

const toSingular = (text) => {
  return text.split(' ').map(word => {
    if (word.endsWith('es')) {
      return word.slice(0, -2);
    } else if (word.endsWith('s')) {
      return word.slice(0, -1);
    }
    return word;
  }).join(' ');
};

const conMatchFlexible = productosSinPlantilla.filter(prod => {
  const prodNorm = normalizarNombre(prod);
  const prodSingular = toSingular(prodNorm);
  
  let hasMatch = false;
  plantillasNombres.forEach(plantilla => {
    const plantNorm = normalizarNombre(plantilla);
    const plantSingular = toSingular(plantNorm);
    
    if (prodNorm === plantNorm || 
        prodSingular === plantSingular ||
        prodSingular === plantNorm || prodNorm === plantSingular) {
      hasMatch = true;
    }
  });
  return hasMatch;
});

console.log(`- Productos con match exacto: ${productosUnicos.size - productosSinPlantilla.length}`);
console.log(`- Productos con match flexible: ${conMatchFlexible.length}`);
console.log(`- Productos SIN match: ${productosSinPlantilla.length - conMatchFlexible.length}`);
