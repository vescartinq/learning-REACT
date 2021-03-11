import React from 'react';
// import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import { GifGridItem } from './../components/GifGridItem';

describe('GiftGridItem', () => {
  let wrapper;

  beforeEach(() => {
    let category = ['Avengers'];
    wrapper = shallow(<GifGridItem category={category} />);
  });

  test('should show GiftGridItem component working ', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
