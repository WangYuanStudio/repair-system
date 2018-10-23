module.exports = {
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
