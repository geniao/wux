import path from 'path'

import Command from '../command'
import { SyncWaterfallHook, AsyncSeriesWaterfallHook } from 'tapable'

export default class BuildCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.hooks = {
      init: new SyncWaterfallHook(['config']),
      config: new SyncWaterfallHook(['config']),
      // compiler: new SyncWaterfallHook(['config']),
      compile: new AsyncSeriesWaterfallHook(['compiler'])
    }

    // 初始化，添加开发套件
    this.hooks.init.tap('BuildCommand', () => {
      const { Suite, abc } = this.getTechnicalEcology()

      new Suite().apply(this)

      return abc
    })

    // 配置
    this.hooks.config.tap('BuildCommand', (config) => {
      const { webpackConfig, esConfig, libConfig } = require(`../config/${this.command}`)
      const { umd, es, lib } = config.output || {}
      const res = {
        config,
      }

      if (umd) {
        res.webpackConfig = webpackConfig
      }

      if (es) {
        res.esConfig = esConfig
      }

      if (lib) {
        res.libConfig = libConfig
      }

      return res
      // const te = require('../fixtures/technical-ecology').getInstance()
      // const teConfig = te.config
      // const targets = teConfig.output && teConfig.output.targets || {}

      // console.log(targets)

      // const { webpackConfig } = require('./modules/build/config')

      // return {
      //   webpackConfig,
      // }
    })

    // this.hooks.compiler.tap('BuildCommand', (config) => {
    //   const webpack = require('webpack')

    //   return webpack(config)
    // })

    this.hooks.compile.tapPromise('BuildCommand', ({ webpackConfig, esConfig, libConfig, }) => {
      let res = []

      if (webpackConfig) {
        const webpack = require('webpack')
        const compiler = webpack(webpackConfig)

        res.push(
          new Promise((resolve, reject) => {
            compiler.run((err) => {
              // console.log(err, stats)
              if (err) {
                reject({
                  type: 'umd',
                  status: 'failure',
                  message: err
                })
              } else {
                resolve({
                  type: 'umd',
                  status: 'success',
                })
              }
            })
          })
        )
      }

      // console.log({ webpackConfig, esConfig, libConfig })
      if (esConfig) {
        process.env.WUX_SUITE_TYPE = 'es'

        const spawn = require('cross-spawn')
        const presets = esConfig.presets || []
        let args = [
          'babel',
          path.join(this.cwd, 'src'),
          '-d',
          path.join(this.cwd, 'dist/es'),
          '-v',
          '--config-file', path.join(this.ctx, 'babel.config.js'),
        ]

        if (presets.length > 0) {
          args = args.concat([
            '--presets',
            presets.join(',')
          ])
        }

        spawn('npx', args, {
          stdio: 'inherit',
          cwd: this.ctx
        })

        res.push(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                type: 'es',
                status: 'success'
              })
            }, 1000)
          })
        )
      }

      if (libConfig) {
        process.env.WUX_SUITE_TYPE = 'commonjs'

        const spawn = require('cross-spawn')
        const presets = libConfig.presets || []
        let args = [
          'babel',
          path.join(this.cwd, 'src'),
          '-d',
          path.join(this.cwd, 'dist/lib'),
          '-v',
          '--config-file', path.join(this.ctx, 'babel.config.js'),
        ]

        if (presets.length > 0) {
          args = args.concat([
            '--presets',
            presets.join(',')
          ])
        }

        spawn('npx', args, {
          stdio: 'inherit',
          cwd: this.ctx
        })

        res.push(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                type: 'lib',
                status: 'success'
              })
            }, 1000)
          })
        )
      }

      return Promise.all(res)
    })
  }

  async run() {
    const abc = this.hooks.init.call({})
    const config = this.hooks.config.call(abc)
    // const compiler = this.hooks.compiler.call(webpackConfig)
    const result = await this.hooks.compile.promise(config)

    console.log(result)
    // if (result) {
    //   console.log('完成构建')
    // }
  }

  get description() {
    return '构建（包含编译、打包等，生成打包文件）'
  }
}
