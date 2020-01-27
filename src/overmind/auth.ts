import { Action, AsyncAction } from 'overmind';

export type AuthState = {
  message: string;
  isLoggedIn: boolean;
  isPending: boolean;
  error?: Error;
  username?: string;
};

const state: AuthState = {
  get message() {
    return this.isLoggedIn ? `Hello ${this.username}` : 'Hello Stranger!';
  },
  isLoggedIn: false,
  isPending: false,
  error: undefined,
  username: undefined,
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

export const config = {
  state: {
    auth: state,
  },
  actions: {
    logIn,
    logOut,
    resetAuth,
  },
  effects: {
    authenticate,
  },
};
