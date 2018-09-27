"use strict";

exports.__esModule = true;
exports.default = void 0;
var serverConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  historyApiFallback: true,
  // hot: true,
  overlay: true,
  publicPath: '/',
  // quiet: true,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: {
    colors: true
  },
  compress: true
};
var _default = serverConfig;
exports.default = _default;
module.exports = exports.default;