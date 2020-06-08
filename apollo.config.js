module.exports = {
  client: {
    service: {
      name: "icjia-intranet",
      // URL to the GraphQL API
      url: "https://intranet.icjia-api.cloud/graphql",
    },
    // Files processed by the extension
    includes: ["src/**/*.vue", "src/**/*.js"],
  },
};
