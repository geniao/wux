import Command from '../command'

export default class UnittestCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '单元测试'
  }
}
