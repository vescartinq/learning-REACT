import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import CounterApp from './../CounterApp';

describe('CounterApp', () => {
  let wrapper; //declaramos un contenedor en el scope general, pero que pueda ser variable
  // inicializado como undefined
  beforeEach(() => {
    wrapper = shallow(<CounterApp />); //inicializa el componente antes de cada test
  });

  test('should show CounterApp component working', () => {
    // const wrapper = shallow(<CounterApp />);
    expect(wrapper).toMatchSnapshot();
  });

  test('should show 100 by default', () => {
    const wrapper = shallow(<CounterApp value={100} />);

    const counterText = wrapper.find('h2').text().trim();

    expect(counterText).toBe('100');
  });

  test('should increment by 1 when click the plus button', () => {
    // const wrapper = shallow(<CounterApp />);

    // const btn1 = wrapper.find('button').at(0);
    // console.log(btn1.html()); //<button>+1</button>

    // ----EJECUTA EL CLICK-----
    // const btn1 = wrapper.find('#plus').at(0).simulate('click'); //at(0)-> Primer Botón
    const btn1 = wrapper.find('#plus').simulate('click');
    console.log(btn1.html());

    // ----LEE EL RESULTADO-----
    const counterText = wrapper.find('h2').text().trim();

    // ---CONFIRMA EL RESULTADO
    expect(counterText).toBe('11'); //10(valor inicial)+1
  });

  test('should decrease 1 when click the less button', () => {
    // const wrapper = shallow(<CounterApp />);

    const btn3 = wrapper.find('#less').simulate('click');
    console.log(btn3.html());

    const counterText = wrapper.find('h2').text().trim();

    expect(counterText).toBe('9'); //10(valor inicial)-1
  });

  test('should return to default value when click the reset button', () => {
    // const wrapper = shallow(<CounterApp />);

    wrapper.find('#plus').simulate('click'); //11
    wrapper.find('#plus').simulate('click'); //12

    const btn2 = wrapper.find('#reset').simulate('click'); //10
    console.log(btn2.html());

    const counterText = wrapper.find('h2').text().trim();

    expect(counterText).toBe('10'); //valor default
  });
});
