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
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@': path.join(__dirname, 'src'),
        }
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