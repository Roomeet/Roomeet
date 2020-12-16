module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ['airbnb-base'],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'linebreak-style': ['error', 'windows'],
    eqeqeq: ['error', 'always'],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  }
};
