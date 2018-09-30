import path from 'path'
import fs from 'fs'

import dargs from 'dargs'
import chalk from 'chalk'
import WuxCommand from '../packages/wux-command'

export default class Command extends WuxCommand {
  constructor(rawArgv) {
    super(rawArgv)

    this.usage = `用法: \n  ${chalk.green('$0', this.command)} [options]`
    this.ctx = path.resolve(__dirname, '..')
    this.cwd = process.cwd()
    this.chalk = chalk
    this.dargs = dargs
    this.yargs
      .epilogue(`版权所有 ©${this.getYears()} WUX`)
      .example('$0 dev', '打开本地服务器')
    this.config = this.getConfig()

    this.load(path.join(__dirname, 'commands'))
    this.addCommands()
  }

  async run() {
    this.showHelp()

    return 'must override the implementation'
  }

  get description() {
    return 'must override the implementation'
  }

  get command() {
    const _command = this.constructor.name.split(/command/i)[0].toLowerCase()

    if (!_command || _command === 'entry') {
      return '<command>'
    } else {
      return _command
    }
  }

  getTechnicalEcology() {
    let abc = this.config

    return {
      Suite: require(`../packages/wux-suite-${abc.type}/lib/${this.command}`),
      abc,
    }
  }

  getConfig() {
    const yaml = require('js-yaml')
    let config
    const abc = path.resolve('config', 'abc.yml')

    if (fs.existsSync(abc)) {
      try {
        config = yaml.safeLoad(fs.readFileSync(abc, 'utf8'))
      } catch (e) {
        console.log(e)
      }
    }

    return config
  }

  addCommands() {
    if (!this.config || !this.config.type) {
      return
    }

    const commands = path.join(__dirname, `../packages/wux-suite-${this.config.type}/lib/commands`)

    this.load(commands)
  }

  getYears() {
    let startupYear = 2018
    let currentYear = new Date().getFullYear()

    return startupYear !== currentYear && [startupYear, currentYear].join('-') || startupYear
  }
}
