import { createOvermind, IConfig, Action, AsyncAction } from 'overmind';
import { createHook } from 'overmind-react';
type State = {
  message: string;
  auth: {
    isLoggedIn: boolean;
    isPending: boolean;
    error?: Error;
    username?: string;
  };
};

const state: State = {
  get message() {
    return this.auth.isLoggedIn
      ? `Hello ${this.auth.username}`
      : 'Hello Stranger!';
  },
  auth: {
    isLoggedIn: false,
    isPending: false,
    error: undefined,
    username: undefined,
  },
};

const resetAuth: Action = ({ state }) => {
  state.auth.isLoggedIn = false;
  state.auth.error = undefined;
  state.auth.isPending = false;
  state.auth.username = undefined;
};

const logIn: AsyncAction<{
  username: string;
  password: string;
}> = async ({ state, effects, actions }, { username, password }) => {
  actions.resetAuth();
  state.auth.isPending = true;
  try {
    state.auth.isLoggedIn = await effects.authenticate(username, password);
    state.auth.username = state.auth.isLoggedIn ? username : undefined;
  } catch (error) {
    state.auth.error = error;
  } finally {
    state.auth.isPending = false;
  }
};

const logOut: Action = ({ actions }) => {
  actions.resetAuth();
};

const authenticate = (username: string, password: string) =>
  new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      if (username === 'zamotany' && password === 'password') {
        resolve(true);
      } else if (username === 'zamotany') {
        resolve(false);
      } else {
        reject(new Error('no such user'));
      }
    }, 2000);
  });

const config = {
  state,
  actions: {
    logIn,
    logOut,
    resetAuth,
  },
  effects: {
    authenticate,
  },
};

export const overmind = createOvermind(config);

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
