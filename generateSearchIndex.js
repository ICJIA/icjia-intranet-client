/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const jsonfile = require("jsonfile");
const config = require("./src/config.json");
const fs = require("fs");
const apiDir = "./src/api";
const fileName = "searchIndex.json";
const dotenv = require("dotenv").config();
const JWT = dotenv.parsed.JWT;
const endpoint = config.api.baseGraphQL;

const { GraphQLClient, gql } = require("graphql-request");
const { Headers } = require("cross-fetch");

global.Headers = global.Headers || Headers;

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
});

const query = gql`
  query {
    posts {
      title
      summary
      searchMeta
      body
    }
  }
`;

async function main() {
  const data = await graphqlClient.request(query);
  console.log(data);
}

main();
