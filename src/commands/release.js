import Command from '../command'

export default class ReleaseCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '发布'
  }
}
