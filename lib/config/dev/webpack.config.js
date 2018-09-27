"use strict";

exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _browser = _interopRequireDefault(require("./browser.config"));

var _pkgDir = _interopRequireDefault(require("pkg-dir"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require(_path.default.resolve('package.json'));

var dist = _path.default.resolve('dist');

var context = _pkgDir.default.sync(__dirname);

var webpackConfig = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: [require.resolve('webpack-dev-server/client') + "?" + _browser.default.url, _path.default.resolve('src/index')],
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', _path.default.join(context, 'node_modules')]
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader' // options: {
      //   // extends: require.resolve(path.join(context, '.babelrc')),
      //   presets: [
      //     require.resolve('@babel/preset-env'),
      //   ],
      //   plugins: [
      //     [require.resolve('@babel/plugin-proposal-decorators'), {
      //       legacy: true
      //     }],
      //     require.resolve('@babel/plugin-proposal-object-rest-spread'),
      //     [require.resolve('@babel/plugin-proposal-class-properties'), {
      //       loose: true
      //     }],
      //   ]
      //   // cacheDirectory: path.join(context, 'node_modules', '.cache', 'babel')
      // }

    }, {
      test: /\.(gif|png|webp)$/,
      loader: 'url-loader'
    }, {
      test: /\.svg?$/,
      loader: 'url-loader'
    }, {
      test: /\.jpe?g$/,
      loader: 'url-loader'
    }, {
      test: /\.(eot|otf|ttf|woff|woff2)?$/,
      loader: 'url-loader'
    }, {
      test: /\.(mp4|ogg|webm)$/,
      loader: 'url-loader'
    }, {
      test: /\.(wav|mp3|m4a|aac|oga)$/,
      loader: 'url-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          config: {
            path: _path.default.resolve(_path.default.join(__dirname, '..', 'postcss.config.js'))
          }
        }
      }]
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          config: {
            path: _path.default.resolve(_path.default.join(__dirname, '..', 'postcss.config.js'))
          }
        }
      }, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true
        }
      }]
    }, {
      test: /\.(scss|sass)$/,
      use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader',
        options: {
          config: {
            path: _path.default.resolve(_path.default.join(__dirname, 'postcss.config.js'))
          }
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  plugins: [new _htmlWebpackPlugin.default({
    mountId: 'demo',
    template: _path.default.resolve('public/index.html'),
    inject: true,
    title: pkg.name + " " + pkg.version + " Demo"
  }), new _miniCssExtractPlugin.default({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })],
  resolveLoader: {
    modules: ['node_modules', _path.default.join(context, 'node_modules')]
  }
};
var _default = webpackConfig;
exports.default = _default;
module.exports = exports.default;