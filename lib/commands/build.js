"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _command = _interopRequireDefault(require("../command"));

var _tapable = require("tapable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var BuildCommand =
/*#__PURE__*/
function (_Command) {
  _inheritsLoose(BuildCommand, _Command);

  function BuildCommand(rawArgv) {
    var _this;

    _this = _Command.call(this, rawArgv) || this;
    _this.hooks = {
      init: new _tapable.SyncWaterfallHook(['config']),
      config: new _tapable.SyncWaterfallHook(['config']),
      // compiler: new SyncWaterfallHook(['config']),
      compile: new _tapable.AsyncSeriesWaterfallHook(['compiler']) // 初始化，添加开发套件

    };

    _this.hooks.init.tap('BuildCommand', function () {
      var _this$getTechnicalEco = _this.getTechnicalEcology(),
          Suite = _this$getTechnicalEco.Suite,
          abc = _this$getTechnicalEco.abc;

      new Suite().apply(_assertThisInitialized(_assertThisInitialized(_this)));
      return abc;
    }); // 配置


    _this.hooks.config.tap('BuildCommand', function (config) {
      var _require = require("../config/" + _this.command),
          webpackConfig = _require.webpackConfig,
          esConfig = _require.esConfig,
          libConfig = _require.libConfig;

      var _ref = config.output || {},
          umd = _ref.umd,
          es = _ref.es,
          lib = _ref.lib;

      var res = {
        config: config
      };

      if (umd) {
        res.webpackConfig = webpackConfig;
      }

      if (es) {
        res.esConfig = esConfig;
      }

      if (lib) {
        res.libConfig = libConfig;
      }

      return res; // const te = require('../fixtures/technical-ecology').getInstance()
      // const teConfig = te.config
      // const targets = teConfig.output && teConfig.output.targets || {}
      // console.log(targets)
      // const { webpackConfig } = require('./modules/build/config')
      // return {
      //   webpackConfig,
      // }
    }); // this.hooks.compiler.tap('BuildCommand', (config) => {
    //   const webpack = require('webpack')
    //   return webpack(config)
    // })


    _this.hooks.compile.tapPromise('BuildCommand', function (_ref2) {
      var webpackConfig = _ref2.webpackConfig,
          esConfig = _ref2.esConfig,
          libConfig = _ref2.libConfig;
      var res = [];

      if (webpackConfig) {
        var webpack = require('webpack');

        var compiler = webpack(webpackConfig);
        res.push(new Promise(function (resolve, reject) {
          compiler.run(function (err) {
            // console.log(err, stats)
            if (err) {
              reject({
                type: 'umd',
                status: 'failure',
                message: err
              });
            } else {
              resolve({
                type: 'umd',
                status: 'success'
              });
            }
          });
        }));
      } // console.log({ webpackConfig, esConfig, libConfig })


      if (esConfig) {
        process.env.WUX_SUITE_TYPE = 'es';

        var spawn = require('cross-spawn');

        var presets = esConfig.presets || [];
        var args = ['babel', _path.default.join(_this.cwd, 'src'), '-d', _path.default.join(_this.cwd, 'dist/es'), '-v', '--config-file', _path.default.join(_this.ctx, 'babel.config.js')];

        if (presets.length > 0) {
          args = args.concat(['--presets', presets.join(',')]);
        }

        spawn('npx', args, {
          stdio: 'inherit',
          cwd: _this.ctx
        });
        res.push(new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              type: 'es',
              status: 'success'
            });
          }, 1000);
        }));
      }

      if (libConfig) {
        process.env.WUX_SUITE_TYPE = 'commonjs';

        var _spawn = require('cross-spawn');

        var _presets = libConfig.presets || [];

        var _args = ['babel', _path.default.join(_this.cwd, 'src'), '-d', _path.default.join(_this.cwd, 'dist/lib'), '-v', '--config-file', _path.default.join(_this.ctx, 'babel.config.js')];

        if (_presets.length > 0) {
          _args = _args.concat(['--presets', _presets.join(',')]);
        }

        _spawn('npx', _args, {
          stdio: 'inherit',
          cwd: _this.ctx
        });

        res.push(new Promise(function (resolve) {
          setTimeout(function () {
            resolve({
              type: 'lib',
              status: 'success'
            });
          }, 1000);
        }));
      }

      return Promise.all(res);
    });

    return _this;
  }

  var _proto = BuildCommand.prototype;

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var abc, config, result;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abc = this.hooks.init.call({});
              config = this.hooks.config.call(abc); // const compiler = this.hooks.compiler.call(webpackConfig)

              _context.next = 4;
              return this.hooks.compile.promise(config);

            case 4:
              result = _context.sent;
              console.log(result); // if (result) {
              //   console.log('完成构建')
              // }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function run() {
      return _run.apply(this, arguments);
    };
  }();

  _createClass(BuildCommand, [{
    key: "description",
    get: function get() {
      return '构建（包含编译、打包等，生成打包文件）';
    }
  }]);

  return BuildCommand;
}(_command.default);

exports.default = BuildCommand;
module.exports = exports.default;