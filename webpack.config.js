// https://florianbrinkmann.com/en/4240/sass-webpack/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env = {}) => {
    return {
        entry: ['./src/js/index.js', './src/css/sass/all.scss'],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'js/bundle.[name].[hash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    // If you are having trouble with urls not resolving add this setting.
                                    // See https://github.com/webpack-contrib/css-loader#url
                                    url: true,
                                    minimize: true,
                                    sourceMap: true
                                }
                            },
                            {
                                loader: require.resolve('postcss-loader'),
                                options: {
                                    // Necessary for external CSS imports to work
                                    // https://github.com/facebookincubator/create-react-app/issues/2677
                                    ident: 'postcss',
                                    sourceMap: true,
                                    plugins: () => [
                                        require('postcss-flexbugs-fixes'),
                                    ],
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin('css/bundle.style.[hash:8].css', {
                allChunks: true
            }),
            new HtmlWebpackPlugin({
                inject: true,
                template: 'src/index.ejs',
            }),
        ]
    }
};