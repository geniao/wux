import Command from '../command'
import { SyncWaterfallHook, AsyncSeriesWaterfallHook } from 'tapable'

export default class DevCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv)

    this.hooks = {
      init: new SyncWaterfallHook(['config']),
      config: new SyncWaterfallHook(['config']),
      compiler: new SyncWaterfallHook(['config']),
      server: new AsyncSeriesWaterfallHook(['compiler', 'serverConfig', 'browserConfig']),
    }

    this.hooks.init.tap('DevCommand', () => {
      const { Suite, abc } = this.getTechnicalEcology()

      new Suite().apply(this)

      return abc
    })

    this.hooks.config.tap('DevCommand', () => {
      const { webpackConfig, serverConfig, browserConfig } = require(`../config/${this.command}`)

      return {
        webpackConfig,
        serverConfig,
        browserConfig
      }
    })

    this.hooks.compiler.tap('DevCommand', (config) => {
      const webpack = require('webpack')

      return webpack(config)
    })

    this.hooks.server.tapPromise('DevCommand', (compiler, serverConfig, browserConfig) => {
      return new Promise((resolve, reject) => {
        const WebpackDevServer = require('webpack-dev-server')
        const opn = require('opn')

        const { url, host, port, } = browserConfig
        const server = new WebpackDevServer(compiler, serverConfig)
        const open = true

        server.listen(port, host, err => {
          if (err) {
            return reject(false)
          }

          if (open) {
            if (typeof open === 'boolean') {
              // --open
              opn(url)
            } else {
              // --open=firefox
              opn(url, { app: open })
            }

            resolve(true)
          }
        })
      })
    })
  }

  async run() {
    const abc = this.hooks.init.call({})
    const { webpackConfig, serverConfig, browserConfig } = this.hooks.config.call(abc)
    const compiler = this.hooks.compiler.call(webpackConfig)
    const result = await this.hooks.server.promise(compiler, serverConfig, browserConfig)

    if (result) {
      console.log('starting server...')
    }
  }

  get description() {
    return '开发服务器'
  }
}
