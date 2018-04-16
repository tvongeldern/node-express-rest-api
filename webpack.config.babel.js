export default {
    entry: `${__dirname}/index.js`,
    output: {
        path: `${__dirname}/dist`,
        filename: 'server.js',
    },
    mode: 'development', // To preserve stack traces for error messages
    target: 'node',
    resolve: {
        modules: [
            'lib',
            'node_modules',
        ],
        extensions: [ '.json', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
            },
        ],
    },
};
