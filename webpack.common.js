const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env) => {
	const IS_DEV = !!env.dev;

	return {
		entry: './src/index.js',
		resolve: {
			extensions: ['.js', '.scss', '.css'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@scss': path.resolve(__dirname, 'src/styles/scss'),
				'@assets': path.resolve(__dirname, 'src/assets'),
			},
		},
		plugins: [
			new DefinePlugin({ IS_DEV }),
			new HtmlWebpackPlugin({
				template: './src/index.html',
			}),
		],
		module: {
			rules: [
				{
					test: /\.html$/i,
					loader: 'html-loader',
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.ico$/,
					type: 'asset/resource',
					generator: {
						filename: 'favicon.ico',
					},
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},
	};
};
