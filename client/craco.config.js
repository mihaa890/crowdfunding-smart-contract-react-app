const webpack = require("webpack");

module.exports = {

    webpack: {
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    zlib: require.resolve("browserify-zlib"),
                    stream: require.resolve("stream-browserify"),
                    util: require.resolve("util"),
                    buffer: require.resolve("buffer"),
                    asset: require.resolve("assert"),
                    "crypto" : false,
                    "assert" : false,
                    "http" : false,
                    "url" : false,
                    "https" : false,

                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                }),
            ]
        }
    }
}