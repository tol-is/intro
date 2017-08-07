import { normalize, join } from 'path';

const ROOT = normalize(join(__dirname, '../'));

export const PATHS = Object.freeze({
  ROOT: ROOT,
  NODE_MODULES: join(ROOT, 'node_modules'),
  WEBPACK: join(ROOT, 'webpack'),
  CLIENT: join(ROOT, 'src', 'client'),
  BROWSER: join(ROOT, 'src', 'browser'),
  COMMON: join(ROOT, 'src', 'common'),
  SERVER: join(ROOT, 'src', 'server'),
  PUBLIC: join(ROOT, 'public',)
});

export default {
  PATHS
};
