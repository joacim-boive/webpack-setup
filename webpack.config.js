const path = require('path');

module.exports = (env = {}) => {
    return {
        entry: ['./src/js/index.js', './src/css/sass/all.scss'],
        output: {
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.[name].[hash:8].js',
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'bunde.[name].[hash:8].css',
                            }
                        },
                        {
                            loader: 'extract-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }
            ]
        }
    }
};