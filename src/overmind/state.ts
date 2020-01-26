export type State = {
  message: string;
  auth: {
    isLoggedIn: boolean;
    isPending: boolean;
    error?: Error;
    username?: string;
  };
};

export const state: State = {
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
