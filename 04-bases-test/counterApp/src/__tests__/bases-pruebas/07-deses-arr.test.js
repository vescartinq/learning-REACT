import { retornaArreglo } from '../../bases-pruebas/07-deses-arr';

describe('Test in destructuring', () => {
  test('should have a string and a number with toEqual ', () => {
    const arr = retornaArreglo();

    expect(arr).toEqual(['ABC', 123]);
  });

  test('should have a string with toBe', () => {
    const [letras, numeros] = retornaArreglo();

    expect(letras).toBe('ABC');
  });

  test('should have a string typeof with toBe', () => {
    const [letras, numeros] = retornaArreglo();

    expect(typeof letras).toBe('string');
  });

  test('should have a number with toBe', () => {
    const [letras, numeros] = retornaArreglo();

    expect(numeros).toBe(123);
  });

  test('should have a number typeof with toBe', () => {
    const [letras, numeros] = retornaArreglo();

    expect(typeof numeros).toBe('number');
  });
});
