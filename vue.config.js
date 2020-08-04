//const path = require("path");
//const appConfig = require("./src/config.json");

module.exports = {
  // publicPath:
  //   process.env.NODE_ENV === `production` ? appConfig.publicPath : "/",
  publicPath: "/",
  configureWebpack: (config) => {
    config.entry.app = "./src/entry.js";
  },

  devServer: {
    proxy: {
      "/.netlify/functions": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/\\.netlify/functions": "",
        },
      },
    },
  },
  pluginOptions: {
    moment: {
      locales: ["en"],
    },
  },
  transpileDependencies: ["vuetify"],
};
