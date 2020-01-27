import { createOvermind, IConfig } from 'overmind';
import { merge } from 'overmind/config';
import { createHook } from 'overmind-react';
import { config as authConfig } from './auth';

const config = merge(authConfig, {});

export const overmind = createOvermind(config);

declare module 'overmind' {
  interface Config extends IConfig<typeof config> {}
}

export const useOvermind = createHook<typeof config>();
