const website = require('./website_config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //新版本webpack css 分离
var loaders = {}
loaders.rules = [
    // {
    //   test: /\.css$/, //必填
    //   use: extractTextPlugin.extract({
    //     fallback: "style-loader",
    //     use: "css-loader"
    //   })
    // }, 
    {
      test: /\.css$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: website.publicPath
          }
        },
        {
          loader: "css-loader",
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpg|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 500, //大于500000字节不打包成base64格式,直接copy图片,
          outputPath: 'images/' //把文件生成到images文件夹下
        }
      }]
    },
    {
      test: /\.(htm|html)$/i,
      loader: 'html-withimg-loader' //出来标签引进的图片没有打包的问题
    },
    /* {
      test: /\.less$/, //必填
      use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "less-loader"]
      })
    }, */
    {
      test: /\.less$/,
      // use: [  //按顺序配置
      // {
      //   loader: 'style-loader'
      // }, {
      //   loader: 'css-loader'
      // }, {
      //   loader: 'less-loader'
      // }]
      use: [ // 分离less文件，合并到css中
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: website.publicPath
          }
        },
        "css-loader",
        "less-loader"
      ]
    },
    {
      test: /\.scss$/,
      // use: [  //按顺序配置
      // {
      //   loader: 'style-loader'
      // }, {
      //   loader: 'css-loader'
      // }, {
      //   loader: 'sass-loader'
      // }]
      use: [ // 分离less文件，合并到css中
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: website.publicPath
          }
        },
        "css-loader",
        "sass-loader"
      ]
    }, {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/ //去除掉的文件夹
    }
]

module.exports = loaders;