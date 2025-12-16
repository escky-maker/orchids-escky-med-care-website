import { FlatCompat } from '@eslint/eslintrc'
 
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    plugins: ['import'],
  }),
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },
  {
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-absolute-path': 'error',
      'import/no-dynamic-require': 'off',
      'import/no-self-import': 'error',
      'import/no-cycle': 'error',
      'import/no-useless-path-segments': 'error',
      '@next/next/no-assign-module-variable': 'off',
    },
  },
]
 
export default eslintConfig