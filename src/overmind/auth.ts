import { Action, AsyncAction } from 'overmind';
import { statecharts, Statechart } from 'overmind/config';

export type AuthState = {
  message: string;
  isLoggedIn: boolean;
  isPending: boolean;
  error?: string;
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

// {"username":"zamotany","password":"password"}
const logIn: AsyncAction<{
  username: string;
  password: string;
}> = async ({ state, effects, actions }, { username, password }) => {
  state.auth.isPending = true;
  try {
    if (await effects.authenticate(username, password)) {
      actions.saveUser({ username });
    } else {
      actions.setError({ error: 'User not found' });
    }
  } catch (error) {
    actions.setError({ error: error.message });
  } finally {
    state.auth.isPending = false;
  }
};

const saveUser: Action<{ username: string }> = ({ state }, { username }) => {
  state.auth.isLoggedIn = true;
  state.auth.username = username;
};

const setError: Action<{ error: string }> = ({ state }, { error }) => {
  state.auth.error = error;
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
    saveUser,
    setError,
    resetAuth,
  },
  effects: {
    authenticate,
  },
};

const chart: Statechart<
  typeof config,
  {
    LOGGED_OUT: void;
    PENDING: void;
    LOGGED_IN: void;
    ERROR: void;
  }
> = {
  initial: 'LOGGED_OUT',
  states: {
    LOGGED_OUT: {
      on: {
        logIn: 'PENDING',
      },
    },
    PENDING: {
      on: {
        saveUser: 'LOGGED_IN',
        setError: 'ERROR',
      },
    },
    LOGGED_IN: {
      on: {
        logOut: 'LOGGED_OUT',
        resetAuth: null,
      },
    },
    ERROR: {
      on: {
        resetAuth: 'LOGGED_OUT',
      },
    },
  },
};

export default statecharts(config, {
  auth: chart,
});
