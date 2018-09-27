import path from 'path'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import pkgDir from 'pkg-dir'

const pkg = require(path.resolve('package.json'))
const dist = path.resolve('dist')
const context = pkgDir.sync(__dirname)

const webpackConfig = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: [
    path.resolve('src/index')
  ],
  output: {
    filename: '[name].js',
    path: dist,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', path.join(context, 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        // options: {
        //   // extends: require.resolve(path.join(context, '.babelrc')),
        //   presets: [
        //     require.resolve('@babel/preset-env'),
        //   ],
        //   plugins: [
        //     [require.resolve('@babel/plugin-proposal-decorators'), {
        //       legacy: true
        //     }],
        //     require.resolve('@babel/plugin-proposal-object-rest-spread'),
        //     [require.resolve('@babel/plugin-proposal-class-properties'), {
        //       loose: true
        //     }],
        //   ]
        //   // cacheDirectory: path.join(context, 'node_modules', '.cache', 'babel')
        // }
      },
      {
        test: /\.(gif|png|webp)$/,
        loader: 'url-loader'
      },
      {
        test: /\.svg?$/,
        loader: 'url-loader'
      },
      {
        test: /\.jpe?g$/,
        loader: 'url-loader'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(mp4|ogg|webm)$/,
        loader: 'url-loader'
      },
      {
        test: /\.(wav|mp3|m4a|aac|oga)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(path.join(__dirname, '..', 'postcss', 'postcss.config.js'))
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(path.join(__dirname, '..', 'postcss', 'postcss.config.js'))
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(path.join(__dirname, 'postcss.config.js'))
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      mountId: 'demo',
      template: path.resolve('public/index.html'),
      inject: true,
      title: `${pkg.name} ${pkg.version} Demo`
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  resolveLoader: {
    modules: ['node_modules', path.join(context, 'node_modules')]
  },
}

export default webpackConfig
