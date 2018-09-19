import Command from '../command'

export default class NewCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.options = {
      s: {
        alias: 'suite',
        type: 'string',
        description: '套件地址，必须是绝对地址 [内部使用]',
      }
    }
  }

  async run({ argv }) {
    argv.command = 'new'
  }

  get description() {
    return '新建项目'
  }

  initializing() {}
  prompting() {}
  configuring() {}
  writing() {}
  conflicts() {}
  install() {}
  end() {}
}
