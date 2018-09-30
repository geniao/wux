// import path from 'path'

import Command from './command'

export default class EntryCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    // this.usage = `用法: \n  ${this.chalk.green('$0 <command>')} [options]`
    // this.load(path.join(__dirname, 'commands'))

    // this.add('dev', path.join(__dirname, '..', 'packages', 'wux-suite-app', 'lib/commands/dev.js'))
    // this.config = this.getConfig()
    // this.getCommands()
  }

  get description() {
    return '工程化链路'
  }
}
