"use strict";

exports.__esModule = true;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _assert = _interopRequireDefault(require("assert"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _debug2 = _interopRequireDefault(require("debug"));

var _co = _interopRequireDefault(require("co"));

var _yargs = _interopRequireDefault(require("yargs"));

var _yargsParser = _interopRequireDefault(require("yargs-parser"));

var _semver = _interopRequireDefault(require("semver"));

var _chalk = _interopRequireDefault(require("chalk"));

var _changeCase = _interopRequireDefault(require("change-case"));

var helper = _interopRequireWildcard(require("./helper"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DISPATCH = Symbol('Command#dispatch');
var PARSE = Symbol('Command#parse');
var COMMANDS = Symbol('Command#commands');
var VERSION = Symbol('Command#version');
var debug = (0, _debug2.default)('wux-command:index');

var WuxCommand =
/*#__PURE__*/
function () {
  function WuxCommand(rawArgv) {
    /**
     * original argument
     * @type {Array}
     */
    this.rawArgv = rawArgv || process.argv.slice(2);
    debug('[%s] origin argument `%s`', this.constructor.name, this.rawArgv.join(' '));
    /**
     * yargs
     * @type {Object}
     */

    this.yargs = (0, _yargs.default)(this.rawArgv);
    /**
     * parserOptions
     * @type {Object}
     * @property {Boolean} execArgv - whether extract `execArgv` to `context.execArgv`
     * @property {Boolean} removeAlias - whether remove alias key from `argv`
     * @property {Boolean} removeCamelCase - whether remove camel case key from `argv`
     */

    this.parserOptions = {
      execArgv: false,
      removeAlias: false,
      removeCamelCase: false // <commandName, Command>

    };
    this[COMMANDS] = new Map();
  }
  /**
   * command handler, could be generator / async function / normal function which return promise
   * @param {Object} context - context object
   * @param {String} context.cwd - process.cwd()
   * @param {Object} context.argv - argv parse result by yargs, `{ _: [ 'start' ], '$0': '/usr/local/bin/common-bin', baseDir: 'simple'}`
   * @param {Array} context.rawArgv - the raw argv, `[ "--baseDir=simple" ]`
   * @protected
   */


  var _proto = WuxCommand.prototype;

  _proto.run = function run() {
    this.showHelp();
  };
  /**
   * load sub commands
   * @param {String} fullPath - the command directory
   * @example `load(path.join(__dirname, 'command'))`
   */


  _proto.load = function load(fullPath) {
    (0, _assert.default)(_fs.default.existsSync(fullPath) && _fs.default.statSync(fullPath).isDirectory(), fullPath + " should exist and be a directory"); // load entire directory

    var files = _fs.default.readdirSync(fullPath);

    var names = [];

    for (var _iterator = files, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var file = _ref;

      if (_path.default.extname(file) === '.js') {
        var name = _path.default.basename(file).replace(/\.js$/, '');

        names.push(name);
        this.add(name, _path.default.join(fullPath, file));
      }
    }

    debug('[%s] loaded command `%s` from directory `%s`', this.constructor.name, names, fullPath);
  };
  /**
   * add sub command
   * @param {String} name - a command name
   * @param {String|Class} target - special file path (must contains ext) or Command Class
   * @example `add('test', path.join(__dirname, 'test_command.js'))`
   */


  _proto.add = function add(name, target) {
    (0, _assert.default)(name, name + " is required");

    if (!(target.prototype instanceof WuxCommand)) {
      (0, _assert.default)(_fs.default.existsSync(target) && _fs.default.statSync(target).isFile(), target + " is not a file.");
      debug('[%s] add command `%s` from `%s`', this.constructor.name, name, target);
      target = require(target);
      (0, _assert.default)(target.prototype instanceof WuxCommand, 'command class should be sub class of wux-command');
    }

    this[COMMANDS].set(name, target);
  };
  /**
   * alias an existing command
   * @param {String} alias - alias command
   * @param {String} name - exist command
   */


  _proto.alias = function alias(_alias, name) {
    (0, _assert.default)(_alias, 'alias command name is required');
    (0, _assert.default)(this[COMMANDS].has(name), name + " should be added first");
    debug('[%s] set `%s` as alias of `%s`', this.constructor.name, _alias, name);
    this[COMMANDS].set(_alias, this[COMMANDS].get(name));
  };
  /**
   * start point of bin process
   */


  _proto.start = function start() {
    (0, _co.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var index;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // replace `--get-yargs-completions` to our KEY, so yargs will not block our DISPATCH
              index = this.rawArgv.indexOf('--get-yargs-completions');

              if (index !== -1) {
                // bash will request as `--get-yargs-completions my-git remote add`, so need to remove 2
                this.rawArgv.splice(index, 2, "--AUTO_COMPLETIONS=" + this.rawArgv.join(','));
              }

              _context.next = 4;
              return this[DISPATCH]();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }).bind(this)).catch(this.errorHandler.bind(this));
  };
  /**
   * default error hander
   * @param {Error} err - error object
   * @protected
   */


  _proto.errorHandler = function errorHandler(err) {
    console.log(err);
    console.error(_chalk.default.red("\u26A0\uFE0F  " + err.name + ": " + err.message));
    console.error(_chalk.default.red('⚠️  Command Error, enable `DEBUG=wux-command` for detail'));
    debug('args %s', process.argv.slice(3));
    debug(err.stack);
    process.exit(1);
  };
  /**
   * print help message to console
   * @param {String} [level=log] - console level
   */


  _proto.showHelp = function showHelp(level) {
    if (level === void 0) {
      level = 'log';
    }

    this.yargs.showHelp(level);
  };
  /**
   * shortcut for yargs.options
   * @param  {Object} opt - an object set to `yargs.options`
   */


  /**
   * dispatch command, either `subCommand.exec` or `this.run`
   * @param {Object} context - context object
   * @param {String} context.cwd - process.cwd()
   * @param {Object} context.argv - argv parse result by yargs, `{ _: [ 'start' ], '$0': '/usr/local/bin/common-bin', baseDir: 'simple'}`
   * @param {Array} context.rawArgv - the raw argv, `[ "--baseDir=simple" ]`
   * @private
   */
  _proto[DISPATCH] =
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var parsed, commandName, Command, rawArgv, command, _iterator2, _isArray2, _i2, _ref2, _ref3, name, _Command, context;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // define --help and --version by default
            this.yargs // .reset()
            // .completion()
            .help().version() // .wrap(120)
            .alias('h', 'help').alias('v', 'version').group(['help', 'version'], '通用选项:'); // get parsed argument without handling helper and version

            _context2.next = 3;
            return this[PARSE](this.rawArgv);

          case 3:
            parsed = _context2.sent;
            commandName = parsed._[0];

            if (!(parsed.version && this.version)) {
              _context2.next = 8;
              break;
            }

            console.log(this.version);
            return _context2.abrupt("return");

          case 8:
            if (!this[COMMANDS].has(commandName)) {
              _context2.next = 17;
              break;
            }

            Command = this[COMMANDS].get(commandName);
            rawArgv = this.rawArgv.slice();
            rawArgv.splice(rawArgv.indexOf(commandName), 1);
            debug('[%s] dispatch to subcommand `%s` -> `%s` with %j', this.constructor.name, commandName, Command.name, rawArgv);
            command = new Command(rawArgv);
            _context2.next = 16;
            return command[DISPATCH]();

          case 16:
            return _context2.abrupt("return");

          case 17:
            _iterator2 = this[COMMANDS].entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();

          case 18:
            if (!_isArray2) {
              _context2.next = 24;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context2.next = 21;
              break;
            }

            return _context2.abrupt("break", 32);

          case 21:
            _ref2 = _iterator2[_i2++];
            _context2.next = 28;
            break;

          case 24:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context2.next = 27;
              break;
            }

            return _context2.abrupt("break", 32);

          case 27:
            _ref2 = _i2.value;

          case 28:
            _ref3 = _ref2, name = _ref3[0], _Command = _ref3[1];
            this.yargs.command(name, _Command.prototype.description || '');

          case 30:
            _context2.next = 18;
            break;

          case 32:
            debug('[%s] exec run command', this.constructor.name);
            context = this.context; // print completion for bash

            if (!context.argv.AUTO_COMPLETIONS) {
              _context2.next = 38;
              break;
            }

            // slice to remove `--AUTO_COMPLETIONS=` which we append
            this.yargs.getCompletion(this.rawArgv.slice(1), function (completions) {
              // console.log('%s', completions)
              completions.forEach(function (x) {
                return console.log(x);
              });
            });
            _context2.next = 40;
            break;

          case 38:
            _context2.next = 40;
            return this.helper.callFn(this.run, [context], this);

          case 40:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  });
  /**
   * getter of context, default behavior is remove `help` / `h` / `version`
   * @return {Object} context - { cwd, env, argv, rawArgv }
   * @protected
   */

  _proto[PARSE] = function (rawArgv) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _this.yargs.parse(rawArgv, function (err, argv) {
        /* istanbul ignore next */
        if (err) return reject(err);
        resolve(argv);
      });
    });
  };

  _createClass(WuxCommand, [{
    key: "options",
    set: function set(opt) {
      this.yargs.options(opt);
    }
    /**
     * shortcut for yargs.usage
     * @param  {String} usage - usage info
     */

  }, {
    key: "usage",
    set: function set(usage) {
      this.yargs.usage(usage);
    }
    /**
     * helper function
     * @type {Object}
     */

  }, {
    key: "helper",
    get: function get() {
      return helper;
    }
  }, {
    key: "version",
    set: function set(ver) {
      this[VERSION] = ver;
    },
    get: function get() {
      return this[VERSION];
    }
  }, {
    key: "context",
    get: function get() {
      var argv = this.yargs.argv;
      var context = {
        argv: argv,
        cwd: process.cwd(),
        env: Object.assign({}, process.env),
        rawArgv: this.rawArgv
      };
      argv.help = undefined;
      argv.h = undefined;
      argv.version = undefined;
      argv.v = undefined; // remove alias result

      if (this.parserOptions.removeAlias) {
        var aliases = this.yargs.getOptions().alias;

        var _arr = Object.keys(aliases);

        for (var _i3 = 0; _i3 < _arr.length; _i3++) {
          var key = _arr[_i3];
          aliases[key].forEach(function (item) {
            argv[item] = undefined;
          });
        }
      } // remove camel case result


      if (this.parserOptions.removeCamelCase) {
        var _arr2 = Object.keys(argv);

        for (var _i4 = 0; _i4 < _arr2.length; _i4++) {
          var _key = _arr2[_i4];

          if (_key.includes('-')) {
            argv[_changeCase.default.camel(_key)] = undefined;
          }
        }
      } // extract execArgv


      if (this.parserOptions.execArgv) {
        // extract from command argv
        var _this$helper$extractE = this.helper.extractExecArgv(argv),
            debugPort = _this$helper$extractE.debugPort,
            debugOptions = _this$helper$extractE.debugOptions,
            execArgvObj = _this$helper$extractE.execArgvObj; // extract from WebStorm env `$NODE_DEBUG_OPTION`


        if (context.env.NODE_DEBUG_OPTION) {
          console.log('Use $NODE_DEBUG_OPTION: %s', context.env.NODE_DEBUG_OPTION);
          var argvFromEnv = (0, _yargsParser.default)(context.env.NODE_DEBUG_OPTION);
          var obj = this.helper.extractExecArgv(argvFromEnv);
          debugPort = obj.debugPort || debugPort;
          Object.assign(debugOptions, obj.debugOptions);
          Object.assign(execArgvObj, obj.execArgvObj);
        } // `--expose_debug_as` is not supported by 7.x+


        if (execArgvObj.expose_debug_as && _semver.default.gte(process.version, '7.0.0')) {
          console.warn(_chalk.default.yellow("Node.js runtime is " + process.version + ", and inspector protocol is not support --expose_debug_as"));
        } // remove from origin argv


        var _arr3 = Object.keys(execArgvObj);

        for (var _i5 = 0; _i5 < _arr3.length; _i5++) {
          var _key2 = _arr3[_i5];
          argv[_key2] = undefined;
          argv[_changeCase.default.camel(_key2)] = undefined;
        } // exports execArgv


        var self = this;
        context.execArgvObj = execArgvObj; // convert execArgvObj to execArgv
        // `--require` should be `--require abc --require 123`, not allow `=`
        // `--debug` should be `--debug=9999`, only allow `=`

        Object.defineProperty(context, 'execArgv', {
          get: function get() {
            var lazyExecArgvObj = context.execArgvObj;
            var execArgv = self.helper.unparseArgv(lazyExecArgvObj, {
              excludes: ['require']
            }); // convert require to execArgv

            var requireArgv = lazyExecArgvObj.require;

            if (requireArgv) {
              if (!Array.isArray(requireArgv)) requireArgv = [requireArgv];
              requireArgv.forEach(function (item) {
                execArgv.push('--require');
                execArgv.push(item);
              });
            }

            return execArgv;
          }
        }); // only exports debugPort when any match

        if (Object.keys(debugOptions).length) {
          context.debugPort = debugPort;
          context.debugOptions = debugOptions;
        }
      }

      return context;
    }
  }]);

  return WuxCommand;
}();

exports.default = WuxCommand;
module.exports = exports.default;