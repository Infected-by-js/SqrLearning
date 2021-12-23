const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: './main.js',
	output: {
		filename: 'bundle.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.scss', '.css'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@scss': path.resolve(__dirname, 'src/scss'),
			'@assets': path.resolve(__dirname, 'src/assets'),
		},
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		port: 8080,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'bundle.[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			title: 'ScrLearning',
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [{ loader: 'file-loader' }],
			},
		],
	},
};
