// import React from 'react';
import '@testing-library/jest-dom';
// import { shallow } from 'enzyme';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import { renderHook } from '@testing-library/react-hooks';

describe('useFetchGifs customHook', () => {
  test('should return initialState', async () => {
    // const { data: images, loading } = useFetchGifs('Avengers');
    // console.log(data, loading);

    // Renderizamos el Hook
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('Avengers')
    );
    // desestructuramos el resultado actual del hook para recibir los datos y el loading
    const { data, loading } = result.current;

    // esperamos la resolución de la promesa por ser una función asíncrona
    await waitForNextUpdate();

    // Esperamos el estado inicial
    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });

  test('should return an images array and loading in false', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs('Avengers')
    );

    await waitForNextUpdate();

    const { data, loading } = result.current;

    expect(data.length).toBe(20);
    expect(loading).toBe(false);
  });
});
