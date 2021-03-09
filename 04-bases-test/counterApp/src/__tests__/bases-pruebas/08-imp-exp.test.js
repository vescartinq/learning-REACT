import { getHeroeById, getHeroesByOwner } from '../../bases-pruebas/08-imp-exp';
import heroes from '../../data/heroes';

describe('Test in heroe functions', () => {
  test('should  return a hero by id', () => {
    const id = 1;
    const hero = getHeroeById(id);

    const heroData = heroes.find((h) => h.id === id);

    expect(hero).toEqual(heroData);
  });

  test('should  return undefined if hero doee not exist', () => {
    const id = 10;
    const hero = getHeroeById(id);

    expect(hero).toBe(undefined);
  });

  test('should  return an array with DC heroes', () => {
    const owner = 'DC';
    const heroes = getHeroesByOwner(owner);

    const dcHeroes = heroes.filter((h) => h.owner === owner);

    expect(heroes).toEqual(dcHeroes);
  });

  test('should  return an array with Marvel heroes, have to be 2 heroes', () => {
    const owner = 'Marvel';
    const heroes = getHeroesByOwner(owner);

    const marvelHeroes = heroes.filter((h) => h.owner === owner);

    expect(heroes.length).toBe(2);
  });
});
