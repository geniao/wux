import Command from 'wux-command'
import dargs from 'dargs'

export default class PkgFilesCommand extends Command {
  async run({ argv }) {
    const spawn = require('cross-spawn')

    spawn('npx', [
      'egg-bin',
      'pkgfiles',
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
    return 'Generate pkg.files automatically before npm publish, see ypkgfiles for detail'
  }
}
