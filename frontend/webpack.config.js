const path = require('path');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	mode: isProduction ? 'production' : 'development',
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	devtool: 'source-map',
	devServer: {
		static: [
			{
				directory: path.join(__dirname, 'static'),
				publicPath: '/static',
			},
		],
		client: {
			progress: true,
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(css|scss)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
		plugins: [new TsconfigPathsPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './static/index.html',
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'static',
					to: 'static',
				},
			],
		}),
		new CompressionPlugin({
			algorithm: 'gzip',
			test: /\.js$|\.jsx$|\.ts$|\.tsx$|\.scss$|\.html$/,
		}),
	],
};
