module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'airbnb',
		'plugin:prettier/recommended',
		'prettier/react',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		tsconfigRootDir: './',
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			rules: {
				'@typescript-eslint/no-floating-promises': 0,
				'@typescript-eslint/no-unsafe-call': 0,
				'@typescript-eslint/no-unsafe-assignment': 0,
				'@typescript-eslint/no-unsafe-member-access': 0,
			},
			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
	],
	plugins: ['react', '@typescript-eslint', 'simple-import-sort', 'import'],
	rules: {
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
		'no-tabs': 0,
		'import/prefer-default-export': 0,
		'import/extensions': 0,
		'object-curly-spacing': ['error', 'never'],
		'react/no-array-index-key': 0,
		'react/jsx-indent': [
			'error',
			'tab',
			{
				indentLogicalExpressions: true,
			},
		],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'react/jsx-indent-props': 0,
		'react/function-component-definition': [
			'error',
			{
				namedComponents: 'arrow-function',
				unnamedComponents: 'arrow-function',
			},
		],
		'react/jsx-props-no-spreading': 0,
		'react/jsx-max-props-per-line': 0,
		'react/require-default-props': 0,
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'arrow-body-style': 0,
		'no-param-reassign': 0,
		'jsx-a11y/media-has-caption': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'consistent-return': 0,
		'no-nested-ternary': 0,
	},
	settings: {
		'import/resolver': {
			typescript: {},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
};
