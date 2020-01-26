import React from 'react';
import cx from 'classnames';
import * as tw from './styles/tailwind';
import { useOvermind } from './overmind/overmind';

export function App() {
  const {
    state: { message },
  } = useOvermind();

  return (
    <div
      className={cx(
        tw.w_full,
        tw.h_full,
        tw.flex,
        tw.justify_center,
        tw.items_center,
        tw.bg_gray_200
      )}
    >
      <h1>{message}</h1>
    </div>
  );
}
