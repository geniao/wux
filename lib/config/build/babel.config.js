"use strict";

module.exports = function (type) {
  if (!type) {
    return {};
  }

  var modules = 'commonjs';

  if (type === 'es') {
    modules = false;
  } else if (type === 'umd') {
    modules = 'umd';
  }

  var config = {
    presets: [['@babel/preset-env', {
      loose: true,
      modules: modules
    }]],
    plugins: ['add-module-exports', ['@babel/plugin-transform-runtime', {
      'corejs': false,
      'helpers': false,
      'regenerator': true,
      'useESModules': false // 'absoluteRuntime': true,

    }]]
  };
  return config;
};