const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const devMode = false;

module.exports = {
    mode: "development",
    entry: ["./src/js/index.js", "./src/scss/index.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/index.js",
    },
    devServer: {
        contentBase: "./dist",
    },
    plugins: [
        // khi thay render lại sẽ k xoá file html
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        // Xuất kết quả với CSS - sau khi qua loader MiniCssExtractPlugin.loader
        new MiniCssExtractPlugin({
            filename: "css/site.min.css",
        }),
    ],
    module: {
        rules: [
            {
                // Thiết lập build scss
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        // Interprets CSS
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    {
                        // minify CSS và thêm autoprefix
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",

                            // Đặt chế độ tối ưu
                            plugins: [
                                postcssPresetEnv({
                                    browsers: [">1%"],
                                }),
                                require("cssnano")(),
                            ],
                        },
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                // Thiết lập lưu các ảnh sử dụng bởi CSS
                // lưu dưới đường dẫn images cùng file site.css
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            // Image sử dụng bởi CSS lưu tại
                            publicPath: "../images",
                            emitFile: false,
                        },
                    },
                ],
            },
        ],
    },
};
