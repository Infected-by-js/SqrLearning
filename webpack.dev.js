const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = (env) => {
	return merge(common(env), {
		mode: 'development',
		devtool: 'source-map',
		output: {
			path: path.resolve(__dirname, 'public'),
			filename: '[name].js',
			assetModuleFilename: 'assets/[name][ext][query]',
			clean: true,
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],

		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										postcssPresetEnv({
											browsers: 'last 2 versions',
										}),
									],
								},
							},
						},
						'sass-loader',
					],
				},
			],
		},

		devServer: {
			port: 8080,
		},
	});
};
