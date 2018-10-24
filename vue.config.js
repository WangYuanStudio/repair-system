module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      "/": {
        target: "",
        changeOrigin: true,
        ws: false
      }
    },
  },
  productionSourceMap: false
};
