const nombre = 'Victor';
const apellido = 'Escartin';

// const nombreCompleto = nombre + ' ' + apellido;
const nombreCompleto = `${nombre} ${apellido}`;

export function getSaludo(nombre = 'Carlos') {
  return 'Hola ' + nombre;
}

// console.log(`Este es un texto: ${getSaludo(nombre)}  `);
