const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'examples', 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'examples', 'build'),
        filename: 'store.js'
    },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map'
};
