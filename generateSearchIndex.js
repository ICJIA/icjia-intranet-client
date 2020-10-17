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
const cheerio = require("cheerio");

const utils = require("./lib/utils");
const blacklist = [
  ".DS_Store",
  "placeholder.png",
  "placeholder.json",
  "placeholder.md",
];

const md = require("markdown-it")({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: "language-",
  linkify: true,
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
      let searchObj = {};
      searchObj.id = item.id;
      searchObj.title = item.title || item.name;
      searchObj.type = item.type || "news";
      searchObj.searchMeta = item.searchMeta || "";
      searchObj.section = section;
      let markdown = item.body || item.details;
      searchObj.html = md.render(markdown);
      let $ = cheerio.load(searchObj.html);
      let headings = [];
      $("h2, h3").filter(function () {
        let data = $(this);
        let text = data.text();
        let id = data.attr("id");
        let headingObj = {};
        headingObj.text = text;
        headingObj.id = id;
        headings.push(headingObj);
      });
      searchObj.headings = JSON.stringify(headings);
      searchObj.markdown = markdown;
      return searchObj;
    });
    return items;
  });

  let searchIndex = index.flat();
  searchIndex = utils.filterUndefined(searchIndex);
  utils.saveJson(searchIndex, "./public/searchIndex.json");
  console.log(`Search index created: ./public/searchIndex.json`);
}

main();
