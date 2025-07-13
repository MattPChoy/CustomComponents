import vue from 'eslint-plugin-vue'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist/**'],
    languageOptions: {
      globals: {
        node: true,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      vue,
      prettier,
    },
    rules: {
      'vue/no-unused-vars': 'error',
      'prettier/prettier': 'error',
    },
  },
]
