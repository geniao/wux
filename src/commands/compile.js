import Command from '../command'

export default class CompileCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '编译'
  }
}
