import path from 'path'

import Command from '../command'
import spawn from 'cross-spawn'

export default class TestCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.configFile = path.resolve('..', '..', 'jest.config.js')
  }

  async run() {
    spawn('npx', [
      'jest',
      '--rootDir',
      this.cwd,
      '--watch',
      '--config', this.configFile
    ], {
      stdio: 'inherit',
      cwd: this.ctx
    })
  }

  get description() {
    return '单元测试'
  }
}
