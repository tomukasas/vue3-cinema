const path = require("path");
module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set("vue$", path.resolve("node_modules/vue/dist/vue.esm-bundler.js"));
  },
  devServer: {
    proxy: "http://localhost:8070",
    host: 'localhost'
  }
};
