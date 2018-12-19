const path = require('path'); //node 语法
var devServer = {
  contentBase: path.resolve(__dirname, 'dist'), //基本目录结构，监听哪里的更新
  host: '10.187.41.203', //服务器地址，用localhost可能会被修改,可以用本机IP
  compress: true, //是否开启服务端压缩(需要服务端支持)
  port: 8090 //随意起一个
}
module.exports = devServer;