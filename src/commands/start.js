import Command from '../command'

export default class StartCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '打开服务器'
  }
}
