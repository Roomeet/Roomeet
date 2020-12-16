module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals:{
  "React":'readonly'},
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "linebreak-style": ["error", "windows"],
    "func-names": ["error", "never"],
    "react/jsx-filename-extension": 0,
    "react/jsx-fragments": 0,
    "no-underscore-dangle": 0,
    "react/jsx-no-target-blank": 0,
    "react/require-default-props": 0,
    "react/destructuring-assignment": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "linebreak-style": 0,
    "max-classes-per-file": 0,
    "react/forbid-prop-types": 0,
    "react/button-has-type": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/prop-types": 0,
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "react/jsx-props-no-spreading": 0,
    "no-unused-expressions": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "react/no-deprecated": 0,
    "no-param-reassign": 0,
    "class-methods-use-this": 0,
    "no-debugger": 0,
    "import/prefer-default-export": 0,
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "react/no-unescaped-entities": "off"
   },
};
