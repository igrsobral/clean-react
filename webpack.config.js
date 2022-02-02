const path = require('path');
const { CleanWebpackPlugin } = require('webpack-cleanup-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main/index.tsx',
    output: {
        path: path.join(__dirane, 'public/js'),
        publicPath: '/public/js',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'scss', 'css'],
        alias: {
            '@': path.join(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(s?)css$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    },
                }, {
                    loader: 'sass-loader',
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },

        ],
    },

    devServer: {
        contentBase: 'public',
        writeToDisk: true,
        historyApiFallback: true
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}