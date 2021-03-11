import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { useFetchGifs } from '../../hooks/useFetchGifs';
import { renderHook } from '@testing-library/react-hooks';

describe('useFetchGifs customHook', () => {
  test('should return initialState', () => {
    // const { data: images, loading } = useFetchGifs('Avengers');
    // console.log(data, loading);

    // Renderizamos el Hook
    const { result } = renderHook(() => useFetchGifs('Avengers'));
    // desestructuramos el resultado actual del hook para recibir los datos y el loading
    const { data, loading } = result.current;

    // Esperamos el estado inicial
    expect(data).toEqual([]);
    expect(loading).toBe(true);
  });
});
