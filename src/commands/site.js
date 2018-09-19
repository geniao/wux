import Command from '../command'

export default class SiteCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)
  }

  async run() {

  }

  get description() {
    return '静态站点'
  }
}
