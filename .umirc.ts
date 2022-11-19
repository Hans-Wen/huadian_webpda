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

  chainWebpack(memo) {
    memo.module
      .rule('media')
      .test(/\.(wav)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
  },
});
