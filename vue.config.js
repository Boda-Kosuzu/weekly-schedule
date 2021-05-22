module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/style/main.scss";',
      },
    },
  },
};
