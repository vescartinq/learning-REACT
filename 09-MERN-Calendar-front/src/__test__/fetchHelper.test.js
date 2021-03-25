import { fetchConToken, fetchSinToken } from '../helpers/fetch';

describe('Testing Fetch file on Helpers folder', () => {
  let token = '';

  test('should do fetchSinToken ', async () => {
    const resp = await fetchSinToken(
      'auth',
      { email: 'victor@gmail.com', password: '123456' },
      'POST'
    );

    // Confirmar que la response sea de tipo Response
    expect(resp instanceof Response).toBe(true);

    const body = await resp.json();
    expect(body.ok).toBe(true);

    // console.log('TOKEN= ', body.token);
    token = body.token;
  });

  test('should do fetchConToken', async () => {
    //   Grabamos el token para poder realizar pruebas
    localStorage.setItem('token', token);

    const resp = await fetchConToken(
      'events/5ee25d21c25cce32af01a3f3',
      {},
      'DELETE'
    );
    const body = await resp.json();

    expect(body.msg).toBe('Evento no existe por ese id');
  });
});
