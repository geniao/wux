"use strict";

exports.__esModule = true;
exports.merge = merge;
exports.default = void 0;

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import pkgDir from 'pkg-dir'
var _default = {
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  //   'prop-types': 'PropTypes'
  // },
  // resolve: {
  //   alias: {
  //     'react': pkgDir.sync(require.resolve('react')),
  //     'react-dom': pkgDir.sync(require.resolve('react-dom')),
  //     'prop-types': pkgDir.sync(require.resolve('prop-types')),
  //   },
  // },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [require.resolve('@babel/preset-react')]
      }
    }]
  }
};
exports.default = _default;

function merge() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _webpackMerge.default)({
    customizeArray: function customizeArray(a, b, key) {
      if (key === 'module.rules') {
        return (a.concat(b) || []).reduce(function (previousValue, currentValue, currentIndex) {
          if (typeof previousValue[currentValue.test.source] !== 'undefined') {
            if (/\.jsx?$/.source === currentValue.test.source && currentValue.loader === 'babel-loader') {
              previousValue.value.splice(previousValue[currentValue.test.source], 1, merge(previousValue.value[previousValue[currentValue.test.source]], currentValue));
            } else {
              previousValue.value.splice(previousValue[currentValue.test.source], 1, currentValue);
            }
          } else {
            previousValue.value.push(currentValue);
            previousValue[currentValue.test.source] = currentIndex;
          }

          return previousValue;
        }, {
          value: []
        }).value;
      }

      if (key === 'options.presets' || key === 'options.plugins') {
        return a.concat(b);
      }

      return undefined;
    }
  })(args);
}