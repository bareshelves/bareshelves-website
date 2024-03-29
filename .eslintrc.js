module.exports = {
  root: true,

  env: {
    node: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
    allowImportExportEverywhere: false,
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'never'],
    "indent": ["error", 2, {
      SwitchCase: 1,
    }],
    'array-bracket-newline': ['off', 'consistent'],
    'array-element-newline': ['off', {
      multiline: true,
      minItems: 3, 
    }],
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'eol-last': ['error', 'always'],
    'function-call-argument-newline': ['off', 'consistent'],
    'func-call-spacing': ['error', 'never'],
    'newline-before-return': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': ['error'],
    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxBOF: 0,
      maxEOF: 0, 
    }],
    'no-spaced-func': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', {
      ObjectExpression: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
      ObjectPattern: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
      ImportDeclaration: "always",
      ExportDeclaration: {
        minProperties: 2,
        multiline: true,
        consistent: true,
      },
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'template-tag-spacing': ['error', 'always'],
  },

  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "indent": "off",
        "vue/script-indent": ["error", 2, { baseIndent: 0 }],
        "vue/html-indent": ["error", 2, { baseIndent: 0 }],
      },
      extends: [
        "plugin:vue/essential",
      ],
    },
    {
      files: ['**.ts'],

      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],

      rules: {
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: "none",
            requireLast: true,
          },
          singleline: {
            delimiter: "comma",
            requireLast: false,
          },
        }],
      },
    },
  ],
}
