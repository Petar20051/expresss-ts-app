import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,

    {
        languageOptions: {
            sourceType: 'module',
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        },
    },

    {
        files: ['**/*.cjs', '**/*.js'],
        languageOptions: {
            sourceType: 'commonjs'
        },
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-require-imports': 'off',
        },
    }
);
