module.exports = (type) => {
  if (!type) {
    return {}
  }

  let modules = 'commonjs'

  if (type === 'es') {
    modules = false
  } else if (type === 'umd') {
    modules = 'umd'
  }

  const config = {
    presets: [
      ['@babel/preset-env', {
        loose: true,
        modules,
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
