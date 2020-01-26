import { createOvermind, IConfig } from 'overmind';
import { createHook } from 'overmind-react';
import { state } from './state';
import { resetAuth, logIn } from './actions';
import * as effects from './effects';

export const overmind = createOvermind({
  state,
  actions: {
    logIn,
    resetAuth,
  },
  effects,
});

declare module 'overmind' {
  interface Config extends IConfig<typeof overmind> {}
}

export const useOvermind = createHook<typeof overmind>();
