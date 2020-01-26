import { Action } from 'overmind';

export const resetAuth: Action = ({ state }) => {
  state.auth.isLoggedIn = false;
  state.auth.error = undefined;
  state.auth.isPending = false;
  state.auth.username = undefined;
};

export const logIn: Action<
  {
    username: string;
    password: string;
  },
  Promise<void>
> = async ({ state, effects, actions }, { username, password }) => {
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
