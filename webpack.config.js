const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')

const setWebpackConfig = (env, argv) => {
  console.log(argv.mode)
  const isDev = argv.mode === 'development'
  const config = {
    mode: argv.mode ? argv.mode : 'development',
    entry: path.join(__dirname, './src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
    },
    plugins: [
      new VueLoaderPlugin(),
      new HTMLPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            'less-loader'
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: '[name]-aaa.[ext]',
              },
            },
          ],
        },
      ],
    },
  }
  if(isDev){
    //设置浏览器调试
    config.devtool="#cheap-module-eval-source-map"
    
    //配置dev server
    config.devServer =  {
      ...{
        port: 8000,
        host: '0.0.0.0',
        overlay: {
          errors: true,  //错误直接显示在界面上
        },
        open: true, //自动打开浏览器
        hot: true, //热加载:会刷新整个页面
      },
    }
  }
  
  //不刷新整个页面，局部热加载
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  )
  
  return config
}

module.exports = (env, argv) => setWebpackConfig(env, argv)
