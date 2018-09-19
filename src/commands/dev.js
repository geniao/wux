import Command from '../command'

export default class DevCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {

  }

  get description() {
    return '开发服务器'
  }
}
