import Command from '../command'

export default class BuildCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
  }

  get description() {
    return '构建（包含编译、打包等，生成打包文件）'
  }
}
