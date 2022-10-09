const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包不要map文件
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭 eslint
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: { '^/api': '' },
      }
    }
  }
})
