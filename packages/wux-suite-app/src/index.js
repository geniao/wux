import { SyncWaterfallHook } from 'tapable'

export default class WuxSuiteApp {
  constructor() {
    this.hooks = {
      // 获取命令列表
      init: new SyncWaterfallHook(['config']),
      // 获取命令配置
      config: new SyncWaterfallHook(['config']),
      // 执行命令
      run: new SyncWaterfallHook(['config']),
    }
  }

  apply() {

  }
}
