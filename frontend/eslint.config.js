import tseslint from 'typescript-eslint'

const browserGlobals = Object.fromEntries(
  ['window', 'document', 'localStorage', 'fetch', 'FormData', 'URL', 'Blob', 'EventSource', 'setTimeout', 'clearTimeout', 'console', 'structuredClone', 'Math', 'Number', 'String', 'Array', 'Map', 'Error', 'JSON', 'Promise', 'Date', 'Object', 'RegExp'].map((name) => [name, 'readonly']),
)

export default tseslint.config(
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: browserGlobals },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  { ignores: ['dist/**', 'node_modules/**'] },
)
