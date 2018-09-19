"use strict";

exports.__esModule = true;
exports.extractExecArgv = exports.unparseArgv = exports.callFn = exports.npmInstall = exports.spawn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _child_process = _interopRequireDefault(require("child_process"));

var _debug2 = _interopRequireDefault(require("debug"));

var _dargs = _interopRequireDefault(require("dargs"));

var _isTypeOf = _interopRequireDefault(require("is-type-of"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('wux-command:helper'); // only hook once and only when ever start any child.

var childs = new Set();
var hadHook = false;

function gracefull(proc) {
  // save child ref
  childs.add(proc); // only hook once

  /* istanbul ignore else */

  if (!hadHook) {
    hadHook = true;
    var signal;
    ['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(function (event) {
      process.once(event, function () {
        signal = event;
        process.exit(0);
      });
    });
    process.once('exit', function () {
      // had test at my-helper.test.js, but coffee can't collect coverage info.
      for (var _iterator = childs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var child = _ref;
        debug('kill child %s with %s', child.pid, signal);
        child.kill(signal);
      }
    });
  }
}
/**
 * fork child process, wrap with promise and gracefull exit
 * @method helper#forkNode
 * @param {String} modulePath - bin path
 * @param {Array} [args] - arguments
 * @param {Object} [options] - options
 * @return {Promise} err or undefined
 * @see https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
 */


exports.forkNode = function (modulePath, args, options) {
  if (args === void 0) {
    args = [];
  }

  if (options === void 0) {
    options = {};
  }

  options.stdio = options.stdio || 'inherit';
  debug('Run fork `%s %s %s`', process.execPath, modulePath, args.join(' '));

  var proc = _child_process.default.fork(modulePath, args, options);

  gracefull(proc);
  return new Promise(function (resolve, reject) {
    proc.once('exit', function (code) {
      childs.delete(proc);

      if (code !== 0) {
        var err = new Error(modulePath + ' ' + args + ' exit with code ' + code);
        err.code = code;
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
/**
 * spawn a new process, wrap with promise and gracefull exit
 * @method helper#forkNode
 * @param {String} cmd - command
 * @param {Array} [args] - arguments
 * @param {Object} [options] - options
 * @return {Promise} err or undefined
 * @see https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
 */


var spawn = function spawn(cmd, args, options) {
  if (args === void 0) {
    args = [];
  }

  if (options === void 0) {
    options = {};
  }

  options.stdio = options.stdio || 'inherit';
  debug('Run spawn `%s %s`', cmd, args.join(' '));
  return new Promise(function (resolve, reject) {
    var proc = _child_process.default.spawn(cmd, args, options);

    gracefull(proc);
    proc.once('error', function (err) {
      /* istanbul ignore next */
      reject(err);
    });
    proc.once('exit', function (code) {
      childs.delete(proc);

      if (code !== 0) {
        return reject(new Error("spawn " + cmd + " " + args.join(' ') + " fail, exit code: " + code));
      }

      resolve();
    });
  });
};
/**
 * exec npm install
 * @method helper#npmInstall
 * @param {String} npmCli - npm cli, such as `npm` / `cnpm` / `npminstall`
 * @param {String} name - node module name
 * @param {String} cwd - target directory
 * @return {Promise} err or undefined
 */


exports.spawn = spawn;

var npmInstall = function npmInstall(npmCli, name, cwd) {
  var options = {
    stdio: 'inherit',
    env: process.env,
    cwd: cwd
  };
  var args = ['i', name];
  console.log('[common-bin] `%s %s` to %s ...', npmCli, args.join(' '), options.cwd);
  return exports.spawn(npmCli, args, options);
};
/**
 * call fn
 * @method helper#callFn
 * @param {Function} fn - support gernerator / async / normal function return promise
 * @param {Array} [args] - fn args
 * @param {Object} [thisArg] - this
 * @return {Object} result
 */


exports.npmInstall = npmInstall;

var callFn =
/*#__PURE__*/
_regenerator.default.mark(function callFn(fn, args, thisArg) {
  var r;
  return _regenerator.default.wrap(function callFn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (args === void 0) {
            args = [];
          }

          if (_isTypeOf.default.function(fn)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          if (!_isTypeOf.default.generatorFunction(fn)) {
            _context.next = 7;
            break;
          }

          _context.next = 6;
          return fn.apply(thisArg, args);

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
          r = fn.apply(thisArg, args);

          if (!_isTypeOf.default.promise(r)) {
            _context.next = 12;
            break;
          }

          _context.next = 11;
          return r;

        case 11:
          return _context.abrupt("return", _context.sent);

        case 12:
          return _context.abrupt("return", r);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, callFn, this);
});
/**
 * unparse argv and change it to array style
 * @method helper#unparseArgv
 * @param {Object} argv - yargs style
 * @param {Object} [options] - options, see more at https://github.com/sindresorhus/dargs
 * @param {Array} [options.includes] - keys or regex of keys to include
 * @param {Array} [options.excludes] - keys or regex of keys to exclude
 * @return {Array} [ '--debug=7000', '--debug-brk' ]
 */


exports.callFn = callFn;

var unparseArgv = function unparseArgv(argv, options) {
  if (options === void 0) {
    options = {};
  }

  // revert argv object to array
  // yargs will paser `debug-brk` to `debug-brk` and `debugBrk`, so we need to filter
  return new Set((0, _dargs.default)(argv, options)).concat();
};
/**
 * extract execArgv from argv
 * @method helper#extractExecArgv
 * @param {Object} argv - yargs style
 * @return {Object} { debugPort, debugOptions: {}, execArgvObj: {} }
 */


exports.unparseArgv = unparseArgv;

var extractExecArgv = function extractExecArgv(argv) {
  var debugOptions = {};
  var execArgvObj = {};
  var debugPort;

  var _arr = Object.keys(argv);

  for (var _i2 = 0; _i2 < _arr.length; _i2++) {
    var key = _arr[_i2];
    var value = argv[key]; // skip undefined set uppon (camel etc.)

    if (value === undefined) continue; // debug / debug-brk / debug-port / inspect / inspect-brk / inspect-port

    if (['debug', 'debug-brk', 'debug-port', 'inspect', 'inspect-brk', 'inspect-port'].includes(key)) {
      if (typeof value === 'number') debugPort = value;
      debugOptions[key] = argv[key];
      execArgvObj[key] = argv[key];
    } else if (match(key, ['es_staging', 'expose_debug_as', /^harmony.*/])) {
      execArgvObj[key] = argv[key];
    }
  }

  return {
    debugPort: debugPort,
    debugOptions: debugOptions,
    execArgvObj: execArgvObj
  };
};

exports.extractExecArgv = extractExecArgv;

function match(key, arr) {
  return arr.some(function (x) {
    return x instanceof RegExp ? x.test(key) : x === key;
  }); // eslint-disable-line no-confusing-arrow
}