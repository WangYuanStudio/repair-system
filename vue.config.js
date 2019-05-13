module.exports = {
  baseUrl: './',
  devServer: {
    proxy: {
      "/": {
        target: "https://web.test.wangyuan.info/wy_app_bz/public/index.php/",
        changeOrigin: true,
        ws: false
      }
    },
  },
  productionSourceMap: false
};
