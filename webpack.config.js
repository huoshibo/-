var Webpack2Polyfill = require('webpack2-polyfill-plugin');
var path = require('path');
var webpack = require('webpack');
var jquery = require('jquery/jquery.js');

//自动添加前缀
var autoprefixer = require('autoprefixer');

var HtmlWebpackPlugin = require('html-webpack-plugin');

//压缩
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
});

//使用上面的压缩会警告，解决警告
/*var definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production");
  }
});*/

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', './src/index.js']
  },

  output: {
    path: path.join(__dirname, '/build'),
    publicPath: 'http://localhost:3000/build/',
    filename: '[name].js'
  },

  externals: { 'react': 'React', 'react-dom': 'ReactDOM' },

  plugins: [
    new Webpack2Polyfill(), 
    //UglifyJsPlugin,
    // webpack2 需要设置 LoaderOptionsPlugin 开启代码压缩

    /*new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),*/

    // Uglify的配置
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true
      }
    }),

    /*new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery",
      jQuery: 'jquery'
    }),
*/
    new webpack.BannerPlugin("版权所有"),

   /* new HtmlWebpackPlugin({
      title: "react study",
      template: path.join(path.join(__dirname, "build"), "index.html")
    })*/
  ],

  resolve: {
    extensions: ['es6', 'js', 'jsx', 'scss'],
    alias: {
       _: path.resolve(__dirname, 'src')
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          "loader": "react-hot-loader/webpack"
        },{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { 'modules': false }],
              'react'
            ],

            plugins: [
              'react-require',
              'transform-object-rest-spread'
            ]
          }
        }]
      },

      {
        test: /\.css?$/,
        use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')
                ]),
              },
            },
          ]
      },

      // 这是sass的配置，less配置和sass一样，把sass-loader换成less-loader即可
      // webpack2 使用use来配置loader，并且不支持字符串形式的参数，x需要使用options
      // loader的加载顺序是从后向前的，这里是 sass -> postcss -> css -> style
      {
        test: /\.scss$/,
        use: [{ 
            loader: 'style-loader' 
        },{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]'
            }
          },{
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer
                ]
              }
            }
          },{
            loader: 'sass-loader'
          }
        ]
      },

      {
        test: /\.less$/,
        use: [{ 
            loader: 'style-loader' 
        },{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local]'
            }
          },{
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer
                ]
              }
            }
          },{
            loader: 'less-loader'
          }
        ]
      },

      // 当图片文件大于10KB时，复制文件到指定目录，小于10KB转为base64编码
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: './images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    publicPath: "http://localhost:3000/build/",
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*"
    }
  }
}