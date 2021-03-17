import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../HookApp';

describe('Testing <HookApp />', () => {
  test('should show HookApp', () => {
    const wrapper = shallow(<HookApp />);
    expect(wrapper).toMatchSnapshot();
  });
});
