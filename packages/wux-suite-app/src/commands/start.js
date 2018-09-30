import Command from 'wux-command'
import dargs from 'dargs'

export default class StartCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')
    let args = dargs(argv, {
      excludes: ['$0'],
      useEquals: false,
    })

    if (args.includes('--daemon')) {
      args.splice(args.indexOf('--daemon'), 1)
    }

    spawn('npx', [
      'egg-scripts',
      'start',
      '--daemon',
      ...args
    ], {
      stdio: 'inherit',
      cwd: this.ctx
    })
  }

  get description() {
    return '打开服务器'
  }
}
