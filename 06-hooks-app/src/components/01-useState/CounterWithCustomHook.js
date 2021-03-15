import React from 'react';
import { useCounter } from '../../hooks/useCounter';

import './counter.css';

export const CounterWithCustomHook = () => {
  const { counter: initialState, increment, decrement, reset } = useCounter(
    100
  );

  const incrNumber = 2;

  return (
    <>
      <h1>Counter with Hook: {initialState} </h1>
      <hr />

      <button
        onClick={() => increment(incrNumber)}
        className="btn btn-primary mr-1"
      >
        {' '}
        + {incrNumber}
      </button>
      <button onClick={reset} className="btn btn-secondary mr-1">
        {' '}
        Reset{' '}
      </button>
      <button
        onClick={() => decrement(incrNumber)}
        className="btn btn-primary mr-1"
      >
        {' '}
        - {incrNumber}
      </button>
    </>
  );
};
