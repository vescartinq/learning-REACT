import React from 'react';
// import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import PrimeraApp from '../PrimeraApp';

describe.skip('PrimeraApp', () => {
  // ------------JEST-----------
  // test('should show message "Hola, soy Goku', () => {
  //   const greeting = 'Hola, soy Goku';

  //   const wrapper = render(<PrimeraApp saludo={greeting} />);

  //   expect(wrapper.getByText(greeting)).toBeInTheDocument();
  // });

  // -----------ENZYME----------
  test('should show PrimeraApp component correctly', () => {
    const greeting = 'Hola, soy Goku';
    const wrapper = shallow(<PrimeraApp saludo={greeting} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should show the subtitle sent by props', () => {
    const greeting = 'Hola, soy Goku';
    const subtitle = 'Soy el subtitulo';
    const wrapper = shallow(
      <PrimeraApp saludo={greeting} subtitulo={subtitle} />
    );

    const textoParrafo = wrapper.find('p').text();
    // console.log(textoParrafo);

    expect(textoParrafo).toBe(subtitle);
  });
});
