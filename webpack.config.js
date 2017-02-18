const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const SRC = path.resolve(__dirname, 'src');
const NODE_MODULES = path.resolve(__dirname, 'node_modules');

/* babel */
const babelSettings = JSON.parse(fs.readFileSync('.babelrc'));

const config = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        'screw_ie8': true
      }
    })
  );
  babelSettings.plugins.push('transform-react-inline-elements');
  babelSettings.plugins.push('transform-react-constant-elements');
}

module.exports = config;