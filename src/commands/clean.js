import Command from '../command'

export default class CleanCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '清除（构建文件）'
  }
}
