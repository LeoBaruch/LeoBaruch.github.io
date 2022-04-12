const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  // transpileDependencies: true,
  lintOnSave: false,
  // 解决md 文件build报错
  parallel: false,
  publicPath: '/blog',
  outputDir: 'blog',
  configureWebpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.devtool = 'source-map';
  },
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
      });
  },
  css: {
    // 查看CSS属于哪个css文件
    sourceMap: true,
  },

});
