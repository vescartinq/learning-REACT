import React from 'react';
import { mount } from 'enzyme';
import { UserContext } from '../../../components/09-useContext/UserContext';
import { LoginScreen } from '../../../components/09-useContext/LoginScreen';

describe('Tests in <LoginScreen />', () => {
  const setUser = jest.fn();

  const wrapper = mount(
    <UserContext.Provider
      value={{
        setUser,
      }}
    >
      <LoginScreen />
    </UserContext.Provider>
  );

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should execute setUser with the expected argument', () => {
    // Simular onClick del Button
    wrapper.find('button').prop('onClick')();

    expect(setUser).toHaveBeenCalledWith({
      id: 123,
      name: 'Victor',
    });
  });
});
