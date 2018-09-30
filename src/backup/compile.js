import path from 'path'

import spawn from 'cross-spawn'
// import babel from '../../node_modules/.bin/babel src -d ./lib -w -v --config-file ../../babel.config.js'
import Command from '../command'

export default class CompileCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.configFile = path.resolve(this.ctx, 'babel.config.js')
  }

  async run() {
    spawn('npx', [
      'babel',
      path.join(this.cwd, 'src'),
      '-d',
      path.join(this.cwd, 'lib'),
      '-w',
      '-v',
      '--delete-dir-on-start',
      '--config-file', this.configFile
    ], {
      stdio: 'inherit',
      cwd: this.ctx
    })
  }

  get description() {
    return '编译'
  }
}
