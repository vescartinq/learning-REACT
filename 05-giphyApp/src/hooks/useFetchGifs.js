// CustomHooks
import { useState, useEffect } from 'react';
import { getGifs } from '../actions/gifActions';

export const useFetchGifs = (category) => {
  // Estado inicial CARGANDO
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    getGifs(category).then((images) => {
      setState({
        data: images,
        loading: false,
      });
    });
  }, [category]);

  return state; // Estado inicial: { data:[], loading: true };
};
