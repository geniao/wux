import Command from 'wux-command'
import dargs from 'dargs'

export default class StopCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')

    spawn('npx', [
      'egg-scripts',
      'stop',
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
    return '关闭服务器'
  }
}
