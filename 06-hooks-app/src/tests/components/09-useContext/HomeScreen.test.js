import React from 'react';
import { mount } from 'enzyme';
import { HomeScreen } from '../../../components/09-useContext/HomeScreen';
import { UserContext } from '../../../components/09-useContext/UserContext';

describe('Tests in <HomeScreen />', () => {
  const user = {
    name: 'Victor',
    email: 'victor@gmail.com',
  };

  // SHALLOW solo renderiza componente principal, MOUNT renderiza todos los componentes, padres e hijos
  const wrapper = mount(
    <UserContext.Provider
      value={{
        user,
      }}
    >
      <HomeScreen />
    </UserContext.Provider>
  );

  test('should render component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
