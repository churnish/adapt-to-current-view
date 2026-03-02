import js from '@eslint/js';
import obsidianmd from 'eslint-plugin-obsidianmd';

export default [
  js.configs.recommended,
  {
    plugins: { obsidianmd },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        app: 'readonly',
        module: 'readonly',
        require: 'readonly',
        console: 'readonly',
        process: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        document: 'readonly',
        window: 'readonly',
        createDiv: 'readonly',
        getComputedStyle: 'readonly',
        Event: 'readonly',
      },
    },
    rules: {
      ...obsidianmd.configs.recommended,
      // These rules require TypeScript type information — not available in plain JS plugins
      'obsidianmd/no-plugin-as-component': 'off',
      'obsidianmd/no-view-references-in-plugin': 'off',
      'obsidianmd/prefer-file-manager-trash-file': 'off',
      // Plugin injects dynamic CSS via style elements — core functionality, not a static-style issue
      'obsidianmd/no-forbidden-elements': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    ignores: ['node_modules/', '*.mjs'],
  },
];
