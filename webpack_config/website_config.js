console.log(encodeURIComponent(process.env.type)) //在终端打印，值为webpack.config.js配置中的type
if (process.env.type == 'dev') {
  // 开发环境
  var website = {
    publicPath: "http://10.187.41.203:8090/" //devServer配置的IP和端口，端口号后加‘/’
  }
} else {
  // 生产环境等
  var website = {
    publicPath: "http://10.187.41.203:8090/"
  }
}
module.exports = website;