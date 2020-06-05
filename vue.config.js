//const path = require("path");
const appConfig = require("./src/config.json");

module.exports = {
  publicPath:
    process.env.NODE_ENV === `production` ? appConfig.publicPath : "/",
  //publicPath: "/",
  configureWebpack: config => {
    config.entry.app = "./src/entry.js";
  },
  pluginOptions: {
    moment: {
      locales: ["en"]
    }
  },
  transpileDependencies: ["vuetify"]
};
