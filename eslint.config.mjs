import pluginJs from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['node_modules/', 'dist/'] },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      'require-await': 'error',
      'no-unreachable': 'error',
      'no-fallthrough': 'error',
      'consistent-return': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'object-shorthand': ['error', 'always'],
      'no-control-regex': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error'
    }
  }
]
