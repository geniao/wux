"use strict";

exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _command = _interopRequireDefault(require("./command"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var EntryCommand =
/*#__PURE__*/
function (_Command) {
  _inheritsLoose(EntryCommand, _Command);

  function EntryCommand(rawArgv) {
    return _Command.call(this, rawArgv) || this; // this.usage = `用法: \n  ${this.chalk.green('$0 <command>')} [options]`
    // this.load(path.join(__dirname, 'commands'))
    // this.add('dev', path.join(__dirname, '..', 'packages', 'wux-suite-app', 'lib/commands/dev.js'))
    // this.config = this.getConfig()
    // this.getCommands()
  }

  _createClass(EntryCommand, [{
    key: "description",
    get: function get() {
      return '工程化链路';
    }
  }]);

  return EntryCommand;
}(_command.default);

exports.default = EntryCommand;
module.exports = exports.default;