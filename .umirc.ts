import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: 'http://103.231.15.106:5000/',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('wav')
      .test('/.wav$/')
      .use('file-loader')
      .loader('file-loader');
  },
});
