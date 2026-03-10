import { defineConfig } from 'eslint/config';
import globals from 'globals';
import obsidianmd from 'eslint-plugin-obsidianmd';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

export default defineConfig([
  // Only lint TypeScript files
  {
    ignores: ['**', '!main.ts'],
  },

  // Obsidian recommended rules (includes JS recommended, TS type-checked,
  // obsidianmd/*, @microsoft/sdl/*, import/*, depend/*)
  ...obsidianmd.configs.recommended,

  // Browser globals and TypeScript parser options
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Project-specific overrides for TypeScript
  {
    files: ['**/*.ts'],
    rules: {
      // Keep varsIgnorePattern for underscore-prefixed variables
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { args: 'none', varsIgnorePattern: '^_' },
      ],
      // Plugin injects dynamic CSS via style elements — core functionality, not a static-style issue
      'obsidianmd/no-forbidden-elements': 'off',
    },
  },

  // Block eslint-disable for obsidianmd/* rules (bot strips all directives)
  comments.recommended,
  {
    rules: {
      '@eslint-community/eslint-comments/no-restricted-disable': [
        'error',
        'obsidianmd/*',
        '@eslint-community/eslint-comments/*',
      ],
    },
  },
]);
