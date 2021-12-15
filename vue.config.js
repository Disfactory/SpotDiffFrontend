module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  devServer: {
    proxy: {
      '/factories': {
        target: process.env.VUE_APP_DISFACTORY_API_URL,
        pathRewite: { '^/factories': '' },
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
// target: 'http://api.disfactory.tw/api/',
// target: 'https://data.ntpc.gov.tw/api/',
