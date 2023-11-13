'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

let cdn = { css: [], js: [] }
// 通过环境变量 来区分是否使用cdn
const isProd = process.env.NODE_ENV === 'production' // 判断是否是生产环境
let externals = {}
if (isProd) {
  // 如果是生产环境 就排除打包 否则不排除
  externals = {
    // key(包名) / value(这个值 是 需要在CDN中获取js, 相当于 获取的js中 的该包的全局的对象的名字)
    // 'vue': 'Vue', // 后面的名字不能随便起 应该是 js中的全局对象名
    // 'element-ui': 'ELEMENT', // 都是js中全局定义的
    // 'xlsx': 'XLSX' // 都是js中全局定义的
  }
  cdn = {
    // 放置css文件目录
    css: [
      // 'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
    ],
    // 放置js文件目录
    js: [
      // 'https://unpkg.com/vue/dist/vue.js', // vuejs
      // 'https://unpkg.com/element-ui/lib/index.js', // element
      // 'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js',
      // 'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js'
    ]
  }
}

// 网站标题
const name = defaultSettings.title || 'vue Admin Template' // page title
// 开发环境下运行端口号
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // 打包之后文件引用路径关系
  publicPath: isProd ? './' : '/',
  // 打包输出目录
  outputDir: 'dist',
  // 静态文件目录
  assetsDir: 'static',
  // 判断是否保存就校验
  lintOnSave: process.env.NODE_ENV === 'development',
  // 关闭打包时候的map文件
  productionSourceMap: false,
  // 服务器相关配置
  devServer: {
    port: port, // 端口号
    open: true, // 是否自动打开浏览器
    overlay: {
      warnings: false,
      errors: true
    },
    // 代理跨域的配置
    // proxy: {
    //   '/api': {
    //     // target: 'http://ihrm-java.itheima.net/', // 跨域请求的地址
    //     target: 'http://192.168.17.39:3000/', // 跨域请求的地址
    //     changeOrigin: true // 只有这个值为true的情况下 才表示开启跨域
    //   }
    // },
    // 是否引入mock
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 配置网站名称
    name: name,
    // 一些解析配置
    resolve: {
      // 配置别名
      alias: {
        '@': resolve('src')
      }
    },
    // webpack打包排除项目
    externals
  },
  // webpack的配置
  chainWebpack(config) {
    // 提高首屏加载速度
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // 多页面应用情况下提高首屏加载速度
    config.plugins.delete('prefetch')
    // 设置cdn资源到index.html模板中
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
