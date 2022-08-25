module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'prettier', 'react-hooks', 'react', 'cypress'],
    extends: [
        'airbnb',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react/recommended',
        'plugin:cypress/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.d.ts', '.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                alwaysTryTypes: true,
                //  "project" configs defaults to <root>/tsconfig.json
            },
        },
    },
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn'],
        'arrow-body-style': ['warn', 'as-needed'],
        'arrow-parens': 'warn',
        'comma-dangle': 0,
        'dot-notation': 'off',
        'import/extensions': 0,
        'import/no-cycle': 0,
        'import/prefer-default-export': 'off',
        // 'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'max-len': ['warn', { code: 140, ignorePattern: '^import .*' }],
        'no-console': process.env.NODE_ENV === 'prod' ? 1 : 0,
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'object-curly-newline': 'off',
        'prettier/prettier': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react/jsx-curly-newline': 'off',
        'react/jsx-filename-extension': [0],
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-uses-react': 'off',
        'react/jsx-wrap-multilines': 0,
        'react/function-component-definition': [
            1,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        'react/jsx-no-useless-fragment': 0,
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
        'react/require-default-props': 'off',
        indent: ['off', 4],
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: ['state'],
            },
        ],
    },
};
