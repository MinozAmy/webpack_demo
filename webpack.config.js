const path = require('path'); // node 语法
const glob = require('glob')
const PurifyCssPlugin = require('purifycss-webpack'); // webpack 去除无用css代码插件
const uglify = require('uglifyjs-webpack-plugin'); // webpack js代码压缩插件
const htmlPlugin = require('html-webpack-plugin'); // webpack html代码压缩插件
// const extractTextPlugin = require("extract-text-webpack-plugin"); 
// webpack css分离插件， extract-text-webpack-plugin@next为webpack4使用版本
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 新版本webpack css 分离
const webpack = require('webpack')
const copyPlugin = require('copy-webpack-plugin') //静态资源集中输出

// 引进本地模块
const loaders = require('./webpack_config/loaders_config')
const devServer = require('./webpack_config/devserver_config')
const website = require('./webpack_config/website_config')

module.exports = {
  // devtool: 'sourse-map', //四种模式,适用于webpack3.x版本
  mode: 'development',
  // 入口文件的配置项
  entry: {
    entry: './src/entry.js',
    jquery: 'jquery',
    vue: 'vue'
  },
  // 出口文件的配置项
  output: {
    path: path.resolve(__dirname, 'dist'), // dist文件夹的绝对路径
    filename: '[name].js', // [name]根据入口文件的名称， 打包成相同的名称， 打包出对应的文件。
    publicPath: website.publicPath // 公共路径 ，把原来的相对路径改为了绝对路径，
  },
  // 模块：例如解读CSS,图片如何转换，压缩
  module: {
    rules: loaders.rules
  },
  //优化
  optimization: {
    splitChunks: {
      cacheGroups: {
        jquery: {
          name: "jquery", //打包的文件名字
          chunks: "initial", //'initial','async'和'all',分别对应优化时只选择初始的chunks，所需要的chunks 还是所有chunks
          minChunks: 2 //最少分离文件
        },
        vue: {
          name: "vue",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  // 插件，用于生产模版和各项功能
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery' // 先安装才能引入
    }),
    new uglify(),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      hash: true,
      template: './src/index.html'
    }),
    // new extractTextPlugin("/css/index.css") //css/index.css是分离后的路径位置
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].css'
    }),
    new PurifyCssPlugin({
      paths: glob.sync(path.join(__dirname, './src/*html'))
    }),
    // 版本
    new webpack.BannerPlugin('XXX版权所有'),
    //静态资源集中输出
    new copyPlugin([{
      from: __dirname + '/src/public', //要打包的静态资源目录地址，这里的__dirname是指项目目录下
      to: './public' //相对于output.path (即dist)
    }]),
    //热加载
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: devServer, // 配置webpack开发服务功能
  watchOptions: {
    poll: 1000, //检测修改时间，毫秒为单位
    aggregateTimeout: 500, //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
    ignored: /node_modules/ // 不监听的目录,不带引号
  }
}
