import reactWebpackConfig, { merge } from './webpack.config'

export default class WuxSuiteReact {
  apply(command) {
    command.hooks.config.tap('WuxSuiteReact', ({ webpackConfig, ...rest }) => {
      return {
        webpackConfig: merge(webpackConfig, reactWebpackConfig),
        ...rest
      }
    })

    // command.hooks.server.tap('WuxSuiteReact', (config) => {

    // })
  }
}
