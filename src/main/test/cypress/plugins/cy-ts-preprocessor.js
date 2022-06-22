const wp = require('@cypress/webpack-preprocessor')

module.exports = wp({
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
        }]
    }
})

