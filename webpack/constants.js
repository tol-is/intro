const { normalize, join } = require('path');

const ROOT = normalize(join(__dirname, '../'));

const PATHS = Object.freeze({
  ROOT: ROOT,
  NODE_MODULES: join(ROOT, 'node_modules'),
  WEBPACK: join(ROOT, 'webpack'),
  CLIENT: join(ROOT, 'src', 'client'),
  BROWSER: join(ROOT, 'src', 'browser'),
  COMMON: join(ROOT, 'src', 'common'),
  SERVER: join(ROOT, 'src', 'server'),
  PUBLIC: join(ROOT, 'public',)
});

module.exports.PATHS = PATHS

module.exports = {
  PATHS
}
