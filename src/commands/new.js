import Command from '../command'

export default class NewCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.options = {
      s: {
        alias: 'suite',
        type: 'string',
        description: '技术套件',
        default: 'react',
        choices: ['react', 'vue', 'vanilla', 'app'],
      },
      t: {
        alias: 'type',
        type: 'string',
        description: '项目类型',
        default: 'component',
        choices: ['component', 'module', 'page', 'app']
      }
    }
  }

  async run() {

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
