import '@testing-library/jest-dom';

import { getSaludo } from '../../bases-pruebas/02-template-string';

describe('Tests of 02.template-string.js', () => {
  test('getSaludo should return hola Victor ', () => {
    const name = 'Victor';

    const greeting = getSaludo(name);

    expect(greeting).toBe(`Hola ${name}`);
  });

  test('getSaludo should return Hola Carlos if does not exist any name argument ', () => {
    const greeting = getSaludo();

    expect(greeting).toBe(`Hola Carlos`);
  });
});
