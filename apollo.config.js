import appConfig from "src/config.json";

module.exports = {
  client: {
    service: {
      name: "icjia-intranet",
      // URL to the GraphQL API
      url: appConfig.api.base,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
