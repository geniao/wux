"use strict";

var _crypto = _interopRequireDefault(require("crypto"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _core = require("@babel/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import type {Path, ProjectConfig} from 'types/Config';
// import type {
//   CacheKeyOptions,
//   Transformer,
//   TransformOptions,
//   TransformedSource,
// } from 'types/Transform';
// import jestPreset from 'babel-preset-jest';
// import babelIstanbulPlugin from 'babel-plugin-istanbul'
var BABELRC_FILENAME = '.babelrc';
var BABELRC_JS_FILENAME = '.babelrc.js';
var BABEL_CONFIG_JS_FILENAME = 'babel.config.js';
var BABEL_CONFIG_KEY = 'babel';
var PACKAGE_JSON = 'package.json';

var THIS_FILE = _fs.default.readFileSync(__filename);

var createTransformer = function createTransformer(options) {
  var cache = Object.create(null);

  var getBabelRC = function getBabelRC(filename) {
    var paths = [];
    var directory = filename;

    while (directory !== (directory = _path.default.dirname(directory))) {
      if (cache[directory]) {
        break;
      }

      paths.push(directory);

      var configFilePath = _path.default.join(directory, BABELRC_FILENAME);

      if (_fs.default.existsSync(configFilePath)) {
        cache[directory] = _fs.default.readFileSync(configFilePath, 'utf8');
        break;
      }

      var configJsFilePath = _path.default.join(directory, BABELRC_JS_FILENAME);

      if (_fs.default.existsSync(configJsFilePath)) {
        // $FlowFixMe
        cache[directory] = JSON.stringify(require(configJsFilePath));
        break;
      }

      configJsFilePath = _path.default.join(directory, BABEL_CONFIG_JS_FILENAME);

      if (_fs.default.existsSync(configJsFilePath)) {
        // $FlowFixMe
        cache[directory] = JSON.stringify(require(configJsFilePath));
        break;
      }

      var resolvedJsonFilePath = _path.default.join(directory, PACKAGE_JSON);

      var packageJsonFilePath = resolvedJsonFilePath === PACKAGE_JSON ? _path.default.resolve(directory, PACKAGE_JSON) : resolvedJsonFilePath;

      if (_fs.default.existsSync(packageJsonFilePath)) {
        // $FlowFixMe
        var packageJsonFileContents = require(packageJsonFilePath);

        if (packageJsonFileContents[BABEL_CONFIG_KEY]) {
          cache[directory] = JSON.stringify(packageJsonFileContents[BABEL_CONFIG_KEY]);
          break;
        }
      }
    }

    paths.forEach(function (directoryPath) {
      return cache[directoryPath] = cache[directory];
    });
    return cache[directory] || '';
  };

  options = Object.assign({}, options, {
    compact: false,
    plugins: options && options.plugins || [],
    presets: options && options.presets || [],
    //.concat([jestPreset]),
    sourceMaps: 'both'
  });
  delete options.cacheDirectory;
  delete options.filename;
  return {
    canInstrument: true,
    getCacheKey: function getCacheKey(fileData, filename, configString, _ref) {
      var instrument = _ref.instrument,
          rootDir = _ref.rootDir;
      return _crypto.default.createHash('md5').update(THIS_FILE).update('\0', 'utf8').update(JSON.stringify(options)).update('\0', 'utf8').update(fileData).update('\0', 'utf8').update(_path.default.relative(rootDir, filename)).update('\0', 'utf8').update(configString).update('\0', 'utf8').update(getBabelRC(filename)).update('\0', 'utf8').update(instrument ? 'instrument' : '').digest('hex');
    },
    process: function process(src, filename, config) // transformOptions,
    {
      var altExts = config.moduleFileExtensions.map(function (extension) {
        return '.' + extension;
      });

      if (_core.util && !_core.util.canCompile(filename, altExts)) {
        return src;
      }

      var babelConfig = config.globals && config.globals['babel7-jest'] || {};
      var theseOptions = Object.assign({
        filename: filename
      }, options, babelConfig); // if (transformOptions && transformOptions.instrument) {
      //   theseOptions.auxiliaryCommentBefore = ' istanbul ignore next '
      //   // Copied from jest-runtime transform.js
      //   theseOptions.plugins = theseOptions.plugins.concat([
      //     [
      //       babelIstanbulPlugin,
      //       {
      //         // files outside `cwd` will not be instrumented
      //         cwd: config.rootDir,
      //         exclude: [],
      //       },
      //     ],
      //   ])
      // }
      // babel v7 might return null in the case when the file has been ignored.

      var transformResult = (0, _core.transformSync)(src, theseOptions);
      return transformResult && transformResult.code || src;
    }
  };
};

module.exports = createTransformer();
exports.createTransformer = createTransformer;