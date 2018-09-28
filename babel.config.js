module.exports = (api) => {
  // api.cache(true)
  api.cache.using(() => process.env.NODE_ENV === 'development')
  api.assertVersion('^7.0')

  let modules = 'commonjs'

  if (typeof process.env.WUX_SUITE_TYPE !== 'undefined') {
    if (process.env.WUX_SUITE_TYPE === 'es') {
      modules = false
    } else {
      modules = process.env.WUX_SUITE_TYPE
    }
  }

  const config = {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        modules,
        targets: {
          esmodules: !modules
        }
      }]
    ],
    plugins: [
      'add-module-exports',
      ['@babel/plugin-transform-runtime', {
        'corejs': false,
        'helpers': false,
        'regenerator': true,
        'useESModules': false,
        // 'absoluteRuntime': true,
      }],
    ]
  }



  return config
}
