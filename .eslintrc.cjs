module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-var': 'error', // 不允许使用 var
    semi: 'error', // 结尾带分号,
    quotes: [1, 'single'],
    curly: 'off',
    eqeqeq: 'error',
    indent: 'off',
    'no-multiple-empty-lines': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 3 }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-undef': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
