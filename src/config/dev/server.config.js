const serverConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  historyApiFallback: true,
  // hot: true,
  overlay: true,
  publicPath: '/',
  // quiet: true,
  watchOptions: {
    ignored: /node_modules/
  },
  stats: { colors: true },
  compress: true,
}

export default serverConfig
