const webpack = require("webpack");
const PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    /* Output bundle name : entry point */
    entry:  {
        "./dist/clockbundle" : "./src/index.tsx"
    },
    output: {
        filename: PROD ? '[name].min.js' : '[name].js',
        libraryTarget: 'this' // outputs module.exports to 'this', ie. the window.
    },
    devtool: 'source-map', // so we get .map.js.
    resolve: {
        modules: [".", "node_modules"], // specifies that all our modules are relative to the project root (rather than the default node_modules)
        // modulesDirectories: ['node_modules']
        extensions: [".webpack.js", ".web.js", ".js", ".d.ts", ".ts", ".tsx"] // empty-string extension no longer supported after 2.1.0-beta.22
    },
    module: {
        loaders: [
            // CAUTION: rename any MPEG-TS files to '.tsv' to prevent loading error due to name clash!
            {
                test: /\.tsx?$/,
                // exclude: /^(Prompt|Init).ts$/,
                loader: "ts-loader"
            } // gets ts-loader to load all .ts or .tsx files.
        ]
    },

    plugins:
        PROD ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            })
        ] : []
};