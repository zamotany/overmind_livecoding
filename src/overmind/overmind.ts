import { createOvermind, IConfig } from 'overmind';
import { merge } from 'overmind/config';
import { createHook } from 'overmind-react';
import authModule from './auth';

const config = merge(authModule, {});

export const overmind = createOvermind(config);

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
