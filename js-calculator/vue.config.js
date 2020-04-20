module.exports = {
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/js-calculator/' : '/',
};
