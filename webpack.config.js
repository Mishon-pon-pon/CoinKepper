const path = require('path');

module.exports = {
    entry: "./webpack/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "public")
    }
}