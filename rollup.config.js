import babel from 'rollup-plugin-babel'

export default {
  input: 'main.js',
  plugins: [ babel() ],
  output: {
    format: 'cjs',
    file: 'index.js'
  }
};