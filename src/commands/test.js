import Command from '../command'

export default class TestCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '测试'
  }
}
