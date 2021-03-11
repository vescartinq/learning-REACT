import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { GifGrid } from './../components/GifGrid';

import { useFetchGifs } from '../hooks/useFetchGifs';
jest.mock('../hooks/useFetchGifs'); //simulamos la llamada a la API y controlamos la información

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
    //devolvemos el valor que queramos como respuesta de la API, en este caso los valores default

    expect(wrapper).toMatchSnapshot();
  });

  test('should show items when upload images with useFetchGifs', () => {
    const gifs = [
      {
        id: 'ABC',
        url: 'https://localhost/algo.jpg',
        title: 'Algo',
      },
    ];

    useFetchGifs.mockReturnValue({
      data: gifs,
      loading: false,
    });

    wrapper = shallow(<GifGrid category={category} />);

    expect(wrapper).toMatchSnapshot();
  });
});
