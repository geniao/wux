import Command from '../command'

export default class StopCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '关闭服务器'
  }
}
