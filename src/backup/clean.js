import path from 'path'
import Command from '../command'

export default class CleanCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {
    const del = require('del')

    del([path.join(this.cwd, 'dist')]).then(paths => {
      if (paths.length > 0) {
        console.log('删除文件夹: ', paths.join('\n'))
      }
    })
  }

  get description() {
    return '清除（构建文件）'
  }
}
