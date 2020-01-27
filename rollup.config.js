import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import serve from 'rollup-plugin-serve';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import livereload from 'rollup-plugin-livereload';
import clear from 'rollup-plugin-clear';
import replace from '@rollup/plugin-replace';
import path from 'path';

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];
const PUBLIC_DIR = 'public';
const OUTPUT_DIR = path.join(PUBLIC_DIR, 'dist');
const ENVS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  process: JSON.stringify({}),
};

export default {
  input: 'src/index.tsx',
  output: {
    file: path.join(OUTPUT_DIR, 'main.js'),
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    replace(ENVS),
    resolve({
      extensions: EXTENSIONS,
      browser: true,
    }),
    commonjs({
      namedExports: {
        'react/index.js': [
          'Component',
          'PureComponent',
          'Children',
          'isValidElement',
          'cloneElement',
          'createRef',
          'Fragment',
          'createElement',
          'useState',
          'useEffect',
          'useRef',
          'useCallback',
          'useMemo',
          'useLayoutEffect',
          'useContext',
          'createContext',
          '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
        ],
        'react-dom/index.js': ['findDOMNode', 'createPortal', 'render'],
        'react-is': ['isForwardRef', 'isValidElementType'],
      },
    }),
    babel({
      extensions: EXTENSIONS,
    }),
    postcss({
      minimize: false,
      extract: false,
      inject: true,
      modules: {
        globalModulePaths: [/(.*\.)?global\.css/],
        generateScopedName: '[hash:base64:10]',
      },
    }),
    serve(PUBLIC_DIR),
    livereload(),
    clear({
      targets: [OUTPUT_DIR],
    }),
  ],
};
