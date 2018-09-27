"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

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
      compiler: new _tapable.SyncWaterfallHook(['config']),
      compile: new _tapable.AsyncSeriesWaterfallHook(['compiler']) // 初始化，添加开发套件

    };

    _this.hooks.init.tap('BuildCommand', function () {
      var _this$getTechnicalEco = _this.getTechnicalEcology(),
          Suite = _this$getTechnicalEco.Suite,
          abc = _this$getTechnicalEco.abc;

      new Suite().apply(_assertThisInitialized(_assertThisInitialized(_this)));
      return abc;
    }); // 配置


    _this.hooks.config.tap('BuildCommand', function () {
      var _require = require("../config/" + _this.command),
          webpackConfig = _require.webpackConfig;

      return {
        webpackConfig: webpackConfig // const te = require('../fixtures/technical-ecology').getInstance()
        // const teConfig = te.config
        // const targets = teConfig.output && teConfig.output.targets || {}
        // console.log(targets)
        // const { webpackConfig } = require('./modules/build/config')
        // return {
        //   webpackConfig,
        // }

      };
    });

    _this.hooks.compiler.tap('BuildCommand', function (config) {
      var webpack = require('webpack');

      return webpack(config);
    });

    _this.hooks.compile.tapPromise('BuildCommand', function (compiler) {
      return new Promise(function (resolve, reject) {
        compiler.run(function (err) {
          // console.log(err, stats)
          if (err) {
            reject(false);
          } else {
            resolve(true);
          }
        });
      });
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
      var abc, _this$hooks$config$ca, webpackConfig, compiler, result;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              abc = this.hooks.init.call({});
              _this$hooks$config$ca = this.hooks.config.call(abc), webpackConfig = _this$hooks$config$ca.webpackConfig;
              compiler = this.hooks.compiler.call(webpackConfig);
              _context.next = 5;
              return this.hooks.compile.promise(compiler);

            case 5:
              result = _context.sent;

              if (result) {
                console.log('完成构建');
              }

            case 7:
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