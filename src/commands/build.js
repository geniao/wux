import Command from '../command'
import { SyncWaterfallHook, AsyncSeriesWaterfallHook } from 'tapable'

export default class BuildCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.hooks = {
      init: new SyncWaterfallHook(['config']),
      config: new SyncWaterfallHook(['config']),
      compiler: new SyncWaterfallHook(['config']),
      compile: new AsyncSeriesWaterfallHook(['compiler'])
    }

    // 初始化，添加开发套件
    this.hooks.init.tap('BuildCommand', () => {
      const { Suite, abc } = this.getTechnicalEcology()

      new Suite().apply(this)

      return abc
    })

    // 配置
    this.hooks.config.tap('BuildCommand', () => {
      const { webpackConfig } = require(`../config/${this.command}`)

      return {
        webpackConfig
      }
      // const te = require('../fixtures/technical-ecology').getInstance()
      // const teConfig = te.config
      // const targets = teConfig.output && teConfig.output.targets || {}

      // console.log(targets)

      // const { webpackConfig } = require('./modules/build/config')

      // return {
      //   webpackConfig,
      // }
    })

    this.hooks.compiler.tap('BuildCommand', (config) => {
      const webpack = require('webpack')

      return webpack(config)
    })

    this.hooks.compile.tapPromise('BuildCommand', (compiler) => {
      return new Promise((resolve, reject) => {
        compiler.run((err) => {
          // console.log(err, stats)
          if (err) {
            reject(false)
          } else {
            resolve(true)
          }
        })
      })
    })
  }

  async run() {
    const abc = this.hooks.init.call({})
    const { webpackConfig } = this.hooks.config.call(abc)
    const compiler = this.hooks.compiler.call(webpackConfig)
    const result = await this.hooks.compile.promise(compiler)

    if (result) {
      console.log('完成构建')
    }
  }

  get description() {
    return '构建（包含编译、打包等，生成打包文件）'
  }
}
