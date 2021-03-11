import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { GifGrid } from '../../components/GifGrid';

import { useFetchGifs } from '../../hooks/useFetchGifs';
jest.mock('./../../hooks/useFetchGifs.js'); //simulamos la llamada a la API y controlamos la información

describe('GifGrid', () => {
  let wrapper;
  const category = 'Avengers';

  beforeEach(() => {
    jest.clearAllMocks(); //reseteamos los mocks

    useFetchGifs.mockReturnValue({
      data: [],
      loading: true,
    }); // estado inicial de la llamada a la API

    wrapper = shallow(<GifGrid category={category} />); //reseteamos el componente
  });

  test('should render GifGrid component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should not show loading when upload images with useFetchGifs', () => {
    // simulamos la respuesta de la API
    const gifs = [
      {
        id: 'ABC',
        url: 'https://localhost/algo.jpg',
        title: 'Algo',
      },
      {
        id: '123',
        url: 'https://localhost/algo.jpg',
        title: 'Algo',
      },
    ];

    // ejecutamos customHook que actua en el componente
    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    // renderizamos de nuevo el componente por el UseEffect
    wrapper = shallow(<GifGrid category={category} />);

    //Buscamos el div del loading
    const p = wrapper.find('p');

    // Esperamos que el loading no exista
    expect(p.exists()).toBe(false);
    // Esperamos que el componente ejecute tantos items como gifs hemos recibido de la API (mediante nuestro Snapshot)
    expect(wrapper.find('GifGridItem').length).toBe(gifs.length);
  });
});
