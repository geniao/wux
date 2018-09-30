import Command from 'wux-command'
import dargs from 'dargs'

export default class DevCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')

    spawn('npx', [
      'egg-bin',
      'dev',
      ...dargs(argv, {
        excludes: ['$0'],
        useEquals: false,
      })
    ], {
      stdio: 'inherit',
      cwd: this.ctx
    })
  }

  get description() {
    return '开发服务器'
  }
}
