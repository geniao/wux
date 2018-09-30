import Command from 'wux-command'
import dargs from 'dargs'

export default class AutodCommand extends Command {
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
    return 'Generate pkg.dependencies and pkg.devDependencies automatically, see autod for detail'
  }
}
