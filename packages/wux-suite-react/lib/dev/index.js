"use strict";

exports.__esModule = true;
exports.default = void 0;

var _webpack = _interopRequireWildcard(require("./webpack.config"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var WuxSuiteReact =
/*#__PURE__*/
function () {
  function WuxSuiteReact() {}

  var _proto = WuxSuiteReact.prototype;

  _proto.apply = function apply(command) {
    command.hooks.config.tap('WuxSuiteReact', function (_ref) {
      var webpackConfig = _ref.webpackConfig,
          rest = _objectWithoutPropertiesLoose(_ref, ["webpackConfig"]);

      return _extends({
        webpackConfig: (0, _webpack.merge)(webpackConfig, _webpack.default)
      }, rest);
    }); // command.hooks.server.tap('WuxSuiteReact', (config) => {
    // })
  };

  return WuxSuiteReact;
}();

exports.default = WuxSuiteReact;
module.exports = exports.default;