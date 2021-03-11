import React from 'react';
// import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { getGifs } from '../../actions/gifActions';

describe('getGifs', () => {
  test('should return 20 elements', async () => {
    const gifs = await getGifs('Avengers');

    expect(gifs.length).toBe(20);
  });

  test('should send 0 results without category', async () => {
    const gifs = await getGifs('');

    expect(gifs.length).toBe(0);
  });
});
