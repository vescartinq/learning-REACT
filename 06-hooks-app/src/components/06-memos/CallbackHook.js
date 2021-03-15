import React, { useState, useCallback, useEffect } from 'react';
import { ShowIncrement } from './ShowIncrement';

import '../02-useEffect/effects.css';

export const CallbackHook = () => {
  const [newCounter, setNewCounter] = useState(10);

  // const increment = () => {
  //     setNewCounter( newCounter + 1 );
  // }

  const increment = useCallback(
    (num) => {
      setNewCounter((c) => c + num);
    },
    [setNewCounter]
  );

  useEffect(() => {
    // ???
  }, [increment]);

  return (
    <div>
      <h1>useCallback Hook: {newCounter} </h1>
      <hr />

      <ShowIncrement increment={increment} />
    </div>
  );
};
