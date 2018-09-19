import Command from '../command'

export default class DistCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '打包'
  }
}
