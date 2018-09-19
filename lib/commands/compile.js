"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _crossSpawn = _interopRequireDefault(require("cross-spawn"));

var _command = _interopRequireDefault(require("../command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CompileCommand =
/*#__PURE__*/
function (_Command) {
  _inheritsLoose(CompileCommand, _Command);

  function CompileCommand(rawArgv) {
    var _this;

    _this = _Command.call(this, rawArgv) || this;
    _this.configFile = _path.default.resolve('..', '..', 'babel.config.js');
    return _this;
  }

  var _proto = CompileCommand.prototype;

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
              (0, _crossSpawn.default)('npx', ['babel', _path.default.join(this.cwd, 'src'), '-d', _path.default.join(this.cwd, 'lib'), '-w', '-v', '--config-file', this.configFile], {
                stdio: 'inherit',
                cwd: this.ctx
              });

            case 1:
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

  _createClass(CompileCommand, [{
    key: "description",
    get: function get() {
      return '编译';
    }
  }]);

  return CompileCommand;
}(_command.default);

exports.default = CompileCommand;
module.exports = exports.default;