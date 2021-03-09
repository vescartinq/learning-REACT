import '@testing-library/jest-dom';

import { getUser, getUsuarioActivo } from '../../bases-pruebas/05-funciones';

describe('testing 05-funciones', () => {
  test('getUser should return an object', () => {
    const userTest = {
      uid: 'ABC123',
      username: 'El_Papi1502',
    };

    const user = getUser();

    // expect(user).toEqual(userTest); //--> No pasa porque son 2 objetos vacios pero apuntan a memorias diferentes
    expect(user).toEqual(userTest);
  });

  test('getUsuarioActivo should return an object', () => {
    const nombre = 'Victor';
    const userTest = {
      uid: 'ABC567',
      username: nombre,
    };

    const user = getUsuarioActivo(nombre);

    expect(user).toEqual(userTest);
  });
});
