import React from 'react';
import { useOvermind } from './overmind/overmind';

export function App() {
  const {
    state: { message },
  } = useOvermind();

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
