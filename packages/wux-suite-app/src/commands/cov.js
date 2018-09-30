import Command from 'wux-command'
import dargs from 'dargs'

export default class CovCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')

    spawn('npx', [
      'egg-bin',
      'cov',
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
    return '测试报告'
  }
}
