"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _dargs = _interopRequireDefault(require("dargs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _wuxCommand = _interopRequireDefault(require("../packages/wux-command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Command =
/*#__PURE__*/
function (_WuxCommand) {
  _inheritsLoose(Command, _WuxCommand);

  function Command(rawArgv) {
    var _this;

    _this = _WuxCommand.call(this, rawArgv) || this;
    _this.usage = "\u7528\u6CD5: \n  " + _chalk.default.green('$0', _this.command) + " [options]";
    _this.ctx = _path.default.resolve(__dirname, '..');
    _this.cwd = process.cwd();
    _this.chalk = _chalk.default;
    _this.dargs = _dargs.default;

    _this.yargs.epilogue("\u7248\u6743\u6240\u6709 \xA9" + _this.getYears() + " WUX").example('$0 dev', '打开本地服务器');

    _this.config = _this.getConfig();

    _this.load(_path.default.join(__dirname, 'commands'));

    _this.addCommands();

    return _this;
  }

  var _proto = Command.prototype;

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.showHelp();
              return _context.abrupt("return", 'must override the implementation');

            case 2:
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

  _proto.getTechnicalEcology = function getTechnicalEcology() {
    var abc = this.config;
    return {
      Suite: require("../packages/wux-suite-" + abc.type + "/lib/" + this.command),
      abc: abc
    };
  };

  _proto.getConfig = function getConfig() {
    var yaml = require('js-yaml');

    var config;

    var abc = _path.default.resolve('config', 'abc.yml');

    if (_fs.default.existsSync(abc)) {
      try {
        config = yaml.safeLoad(_fs.default.readFileSync(abc, 'utf8'));
      } catch (e) {
        console.log(e);
      }
    }

    return config;
  };

  _proto.addCommands = function addCommands() {
    if (!this.config || !this.config.type) {
      return;
    }

    var commands = _path.default.join(__dirname, "../packages/wux-suite-" + this.config.type + "/lib/commands");

    this.load(commands);
  };

  _proto.getYears = function getYears() {
    var startupYear = 2018;
    var currentYear = new Date().getFullYear();
    return startupYear !== currentYear && [startupYear, currentYear].join('-') || startupYear;
  };

  _createClass(Command, [{
    key: "description",
    get: function get() {
      return 'must override the implementation';
    }
  }, {
    key: "command",
    get: function get() {
      var _command = this.constructor.name.split(/command/i)[0].toLowerCase();

      if (!_command || _command === 'entry') {
        return '<command>';
      } else {
        return _command;
      }
    }
  }]);

  return Command;
}(_wuxCommand.default);

exports.default = Command;
module.exports = exports.default;