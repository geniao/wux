import Command from '../command'

export default class GeneratorCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    // this.options = {
    //   s: {
    //     alias: 'suite',
    //     type: 'string',
    //     description: '技术套件',
    //     default: 'react',
    //     hidden: true,
    //     choices: ['react', 'vue', 'vanilla'],
    //   },
    //   t: {
    //     alias: 'type',
    //     type: 'string',
    //     description: '项目类型',
    //     default: 'component',
    //     hidden: true,
    //     choices: ['component', 'module', 'page', 'app']
    //   }
    // }
  }

  async run() {
    // const suite = argv._[0]

    // if (suite) {

    // }

    // console.log(suite)
  }

  get description() {
    return '脚手架生成器'
  }
}
