const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 运行代码配置
  devServer: {
    // 服务器代理，解决开发环境下跨域问题
    proxy: {
      '^/proxyApi': {
        target: 'https://elevator.hzsdtech.com/elevator/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/',
        },
      },
    },
    open: true // 打开浏览器 
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },

}