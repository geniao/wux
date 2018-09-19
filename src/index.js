import path from 'path'

import Command from './command'

export default class EntryCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    // this.usage = `用法: \n  ${this.chalk.green('$0 <command>')} [options]`
    this.load(path.join(__dirname, 'commands'))
    this.yargs.example('$0 dev', '打开本地服务器')
  }

  get description() {
    return '工程化链路'
  }
}
