module.exports = (api) => {
  api.cache(true)
  api.assertVersion('^7.0')

  const config = {
    presets: [
      ['@babel/preset-env', {
        loose: true
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
