module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      '@vue/typescript/recommended'
    ],
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      ecmaVersion: 2020
    },
    rules: {
      'vue/define-props': 'off',
      'vue/define-emits': 'off',
      'no-undef': 'off',
      'vue/require-default-prop': 'off'
    }
};