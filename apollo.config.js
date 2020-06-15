module.exports = {
  client: {
    service: {
      name: "icjia-intranet",
      // URL to the GraphQL API
      url: process.env.VUE_APP_BASE_HTTP,
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
