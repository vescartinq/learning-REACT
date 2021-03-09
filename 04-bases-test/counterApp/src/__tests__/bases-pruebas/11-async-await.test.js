import { getImagen } from '../../bases-pruebas/11-async-await';

describe('Test async-await promises', () => {
  test('getImagen should return image url with a string typeof', async () => {
    const url = await getImagen();

    expect(typeof url).toBe('string');
  });
});
