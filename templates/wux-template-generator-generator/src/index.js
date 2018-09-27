import { SyncWaterfallHook, SyncLoopHook } from 'tapable'

// initializing：初始化方法（检验当前项目状态、获取configs、等）
// prompting：获取用户选项
// configuring：保存配置（创建 .editorconfig 文件）
// default：如果函数名称如生命周期钩子不一样，则会被放进这个组
// writing：写generator特殊的文件（路由、控制器、等）
// conflicts：冲突后处理办法
// install：正在安装（npm、bower）
// end：安装结束、清除文件、设置good bye文案、等

export default class Generator {
  constructor() {
    this.hooks = {
      initializing: new SyncWaterfallHook(),
      prompting: new SyncLoopHook(),
      configuring: new SyncWaterfallHook(),
      writing: new SyncWaterfallHook(),
      conflicts: new SyncWaterfallHook(),
      install: new SyncWaterfallHook(),
      end: new SyncWaterfallHook(),
    }
  }
  initializing() {}
  prompting() {}
  configuring() {}
  writing() {}
  conflicts() {}
  install() {}
  end() {}
}
