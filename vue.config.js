module.exports = {
  publicPath: "./",
  outputDir: "docs/",
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/style/main.scss";',
      },
    },
  },
};
