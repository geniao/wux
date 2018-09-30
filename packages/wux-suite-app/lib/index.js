"use strict";

exports.__esModule = true;
exports.default = void 0;

var _tapable = require("tapable");

var WuxSuiteApp =
/*#__PURE__*/
function () {
  function WuxSuiteApp() {
    this.hooks = {
      // 获取命令列表
      init: new _tapable.SyncWaterfallHook(['config']),
      // 获取命令配置
      config: new _tapable.SyncWaterfallHook(['config']),
      // 执行命令
      run: new _tapable.SyncWaterfallHook(['config'])
    };
  }

  var _proto = WuxSuiteApp.prototype;

  _proto.apply = function apply() {};

  return WuxSuiteApp;
}();

exports.default = WuxSuiteApp;
module.exports = exports.default;