const path = require("path");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	mode: "development",
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
	},
	module: {
		rules: [
			{
				// test for .ts and .tsx
				test: /\.tsx?$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
						},
					},
					"ts-loader",
				],
			},
			{
				// test for image files
				test: /\.(png|jpe?g|gif)$/i,
				type: "asset/resource",
			},
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		historyApiFallback: true,
		compress: true,
		port: 3000,
	},
	plugins: [],
};
