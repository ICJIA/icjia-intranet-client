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

const md = require("markdown-it")({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: false,
  typographer: false,
  quotes: "“”‘’",
  highlight: function (/*str, lang*/) {
    return "";
  },
})
  .use(require("markdown-it-attrs"))
  .use(require("markdown-it-named-headers"));

const { GraphQLClient, gql } = require("graphql-request");
const { Headers } = require("cross-fetch");
global.Headers = global.Headers || Headers;

const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${JWT}`,
  },
});

const sections = ["posts", "events"];

const query = gql`
  query {
    posts {
      id
      title
      summary
      searchMeta
      body
    }
    events {
      id
      name
      type
      summary
      searchMeta
      details
    }
  }
`;

async function main() {
  const data = await graphqlClient.request(query);
  const sections = Object.keys(data);
  //console.log(data.posts);
  let index = sections.map((section) => {
    let items = data[section].map((item) => {
      console.log(item.id);
    });
  });
}

main();
