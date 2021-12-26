const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (env) => {
	return merge(common(env), {
		mode: 'production',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].bundle.js',
			assetModuleFilename: 'assets/[hash][ext][query]',
			clean: true,
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].[contenthash].css',
			}),
		],
		module: {
			rules: [
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader,
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
		optimization: {
			minimizer: [
				new ImageMinimizerPlugin({
					test: /\.(jpe?g|png|gif|svg)$/i,
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							plugins: [
								[
									'imagemin-mozjpeg',
									{
										quality: 80,
									},
								],
								['imagemin-pngquant', { optimizationLevel: 5 }],
							],
						},
					},
				}),
			],
			splitChunks: {
				chunks: 'all',
			},
		},
	});
};
