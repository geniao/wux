import path from 'path'
import fs from 'fs'

import chalk from 'chalk'
// import changeCase from 'change-case'
import WuxCommand from '../packages/wux-command'

export default class Command extends WuxCommand {
  constructor(rawArgv) {
    super(rawArgv)

    this.usage = `用法: \n  ${chalk.green('$0', this.command)} [options]`
    this.ctx = path.resolve(__dirname, '..')
    this.cwd = process.cwd()
    this.chalk = chalk
    this.yargs.epilogue('版权所有 ©2018 UX')
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
    const yaml = require('js-yaml')
    let abc

    try {
      abc = yaml.safeLoad(fs.readFileSync(path.resolve('abc.yml'), 'utf8'))
    } catch (e) {
      console.log(e)
    }

    return {
      Suite: require(`../packages/wux-suite-${abc.type}/lib/${this.command}`),
      abc,
    }
  }

  //
  installSuite() {

  }
}
