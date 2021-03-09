import React from 'react';
import { render } from '@testing-library/react';

import PrimeraApp from '../PrimeraApp';

describe('PrimeraApp', () => {
  test('should show message "Hola, soy Goku', () => {
    const greeting = 'Hola, soy Goku';

    const wrapper = render(<PrimeraApp saludo={greeting} />);

    expect(wrapper.getByText(greeting)).toBeInTheDocument();
  });
});
