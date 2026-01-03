const dependenciasData = require('./src/data/dependencias-detalle-completo.json');
const { maintenanceTemplates } = require('./src/data/maintenanceTemplates.js');

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

console.log('=== DEBUG: HIDRANTE ===');
const hidrante = 'HIDRANTE DE 6"';
const hidranteNorm = normalizarNombre(hidrante);
const hidranteSing = toSingular(hidranteNorm);
console.log(`Original: "${hidrante}"`);
console.log(`Normalizado: "${hidranteNorm}"`);
console.log(`Singular: "${hidranteSing}"`);

console.log('\nPlantillas relacionadas:');
Object.values(maintenanceTemplates).forEach(t => {
  if (t.nombre.toLowerCase().includes('hidrante')) {
    const tNorm = normalizarNombre(t.nombre);
    const tSing = toSingular(tNorm);
    console.log(`  "${t.nombre}"`);
    console.log(`    Normalizado: "${tNorm}"`);
    console.log(`    Singular: "${tSing}"`);
    console.log(`    Match singular? ${hidranteSing === tSing}`);
    console.log(`    Match prod singular vs plant normal? ${hidranteSing === tNorm}`);
    console.log(`    Match prod normal vs plant singular? ${hidranteNorm === tSing}`);
  }
});

console.log('\n=== DEBUG: VÁLVULAS DE BASTAGO ===');
const valvula = 'VÁLVULAS DE BASTAGO DE 6 Pulg';
const valvulaNorm = normalizarNombre(valvula);
const valvulaSing = valvulaNorm.replace(/es$/, '').replace(/s$/, '');
console.log(`Original: "${valvula}"`);
console.log(`Normalizado: "${valvulaNorm}"`);
console.log(`Singular: "${valvulaSing}"`);

console.log('\nPlantillas relacionadas:');
Object.values(maintenanceTemplates).forEach(t => {
  if (t.nombre.toLowerCase().includes('vástago') || t.nombre.toLowerCase().includes('vastago')) {
    const tNorm = normalizarNombre(t.nombre);
    const tSing = tNorm.replace(/es$/, '').replace(/s$/, '');
    console.log(`  "${t.nombre}"`);
    console.log(`    Normalizado: "${tNorm}"`);
    console.log(`    Singular: "${tSing}"`);
    console.log(`    Match singular? ${valvulaSing === tSing}`);
  }
});
