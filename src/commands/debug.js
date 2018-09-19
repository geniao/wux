import Command from '../command'

export default class DebugCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '调试'
  }
}
