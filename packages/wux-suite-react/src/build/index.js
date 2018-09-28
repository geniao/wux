import reactWebpackConfig, { merge } from './webpack.config'

export default class WuxSuiteReact {
  apply(command) {
    command.hooks.config.tap('WuxSuiteReact', ({ webpackConfig, esConfig, libConfig, ...rest }) => {
      esConfig.presets.push(require.resolve('@babel/preset-react'))
      libConfig.presets.push(require.resolve('@babel/preset-react'))

      return {
        webpackConfig: merge(webpackConfig, reactWebpackConfig),
        esConfig,
        libConfig,
        ...rest
      }
    })
  }
}
