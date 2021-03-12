import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    // console.log(e.target.value);

    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return [values, handleInputChange];
};
