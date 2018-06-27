var path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: './scripts/salesSimulator.js'
  },
  module: {
    rules: [
      {
        test: /scripts\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'salesSimBundle.js'
  }
};