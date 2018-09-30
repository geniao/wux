"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _wuxCommand = _interopRequireDefault(require("wux-command"));

var _dargs = _interopRequireDefault(require("dargs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var DevCommand =
/*#__PURE__*/
function (_Command) {
  _inheritsLoose(DevCommand, _Command);

  function DevCommand() {
    return _Command.apply(this, arguments) || this;
  }

  var _proto = DevCommand.prototype;

  _proto.run =
  /*#__PURE__*/
  function () {
    var _run = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(_ref) {
      var argv, spawn;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              argv = _ref.argv;
              spawn = require('cross-spawn');
              spawn('npx', ['egg-bin', 'dev'].concat((0, _dargs.default)(argv, {
                excludes: ['$0'],
                useEquals: false
              })), {
                stdio: 'inherit',
                cwd: this.ctx
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function run(_x) {
      return _run.apply(this, arguments);
    };
  }();

  _createClass(DevCommand, [{
    key: "description",
    get: function get() {
      return '开发服务器';
    }
  }]);

  return DevCommand;
}(_wuxCommand.default);

exports.default = DevCommand;
module.exports = exports.default;