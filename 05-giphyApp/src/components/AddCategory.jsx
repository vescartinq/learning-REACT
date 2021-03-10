import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AddCategory = ({ setCategories }) => {
  const [inputValue, setInputValue] = useState(''); // ''  vs undefined (si no ponemos string vacio)

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Función que se ejecuta al clickar enter (<form onSubmit={handleSubmit}></form>)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim().length > 2) {
      //invertir el spread op para que primero aparezca la nueva categoria, y luego la antigua
      setCategories((otherValues) => [inputValue, ...otherValues]);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
    </form>
  );
};

//  Regla para obligar a utilizar el componente AddCatgory con una función (setCategories)
AddCategory.propTypes = {
  setCategories: PropTypes.func.isRequired,
};
