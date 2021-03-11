import React from 'react';
// import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { GifGridItem } from '../../components/GifGridItem';

describe('GiftGridItem', () => {
  let wrapper;

  const title = 'Avengers';
  const url = 'https://localhost/algo.jpg';

  beforeEach(() => {
    //   Title y URL son required en PropTypes

    wrapper = shallow(<GifGridItem title={title} url={url} />);
  });

  test('should show GiftGridItem component working ', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should use title received by props and show on paragraph', () => {
    const p = wrapper.find('p');

    expect(p.text().trim()).toBe(title);
  });

  test('should use image received by props url and alt and show on img', () => {
    const img = wrapper.find('img');
    console.log(img.html()); //  <img src="https://localhost/algo.jpg" alt="Avengers"/>

    expect(img.props().src).toBe(url); //img recibe por props src y alt
    expect(img.props().alt).toBe(title); //img recibe por props src y alt
  });

  test('should have animate__fadeIn', () => {
    const div = wrapper.find('div');
    // console.log(div.props());
    //  {
    //   className: 'card animate__animated animate__fadeIn',
    //   children: [
    //     {
    //       '$$typeof': Symbol(react.element),
    //       type: 'img',
    //       key: null,
    //       ref: null,
    //       props: [Object],
    //       _owner: null,
    //       _store: {}
    //     },
    //     {
    //       '$$typeof': Symbol(react.element),
    //       type: 'p',
    //       key: null,
    //       ref: null,
    //       props: [Object],
    //       _owner: null,
    //       _store: {}
    //     }
    //   ]
    // }

    expect(div.hasClass('animate__fadeIn')).toBeTruthy();
  });
});
