import { getHeroeByIdAsync } from '../../bases-pruebas/09-promesas';
import heroes from '../../data/heroes';

describe('Test with Promises', () => {
  // en un test async, debemos especificar done en la función para informar que el test no finaliza hasta que se resuelve la Promesa
  test('getHeroByIdAsync should return an async hero', (done) => {
    const id = 1;

    getHeroeByIdAsync(id).then((hero) => {
      expect(hero).toBe(heroes[0]);
      done();
    });
  });

  test('getHeroByIdAsync should return error message when hero does not exist', (done) => {
    const id = 10;

    getHeroeByIdAsync(id).catch((error) => {
      expect(error).toBe('No se pudo encontrar el héroe');
      done();
    });
  });
});
