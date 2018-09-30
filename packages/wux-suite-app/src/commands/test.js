import Command from 'wux-command'
import dargs from 'dargs'

export default class TestCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')

    spawn('npx', [
      'egg-bin',
      'test',
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
    return '测试'
  }
}
