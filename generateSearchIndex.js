/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const jsonfile = require("jsonfile");
const myConfig = require("./src/config.json");
const fs = require("fs");
const apiDir = "./src/api";
const dotenv = require("dotenv").config();
const JWT = process.env.JWT;
const endpoint = myConfig.api.baseGraphQL;
const cheerio = require("cheerio");
const Fuse = require("fuse.js");
const toc = require("./lib/markdown-toc-fork");

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

Object.defineProperty(Array.prototype, "flat", {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  },
});

const query = gql`
  query {
    news: posts {
      id
      title
      summary
      slug
      body
    }
    events {
      id
      name
      type
      summary
      slug
    }
    documents {
      title
      summary
      externalURL
      body
      slug
      file {
        url
        ext
      }
      unit {
        title
        slug
      }
    }

    clusters {
      title
      summary
      slug
    }

    units {
      title
      summary
      slug
    }
  }
`;

async function main() {
  const data = await graphqlClient.request(query);
  const sections = Object.keys(data);

  let index = sections.map((section) => {
    let items = data[section].map((item) => {
      let searchObj = {};
      searchObj.id = item.id;
      searchObj.title = item.title || item.name;
      searchObj.contentType = section;
      if (section === "documents" && item.file) {
        searchObj.type = "download";
        searchObj.path = `https://dev.icjia-api.cloud${item.file.url}`;
        searchObj.ext = item.file.ext;
        //console.log(item.file.url);
      } else if (section === "documents" && item.externalURL) {
        searchObj.type = "url";
        searchObj.path = item.externalURL;
      }

      if (section === "events" && item.type) {
        searchObj.type = item.type;
      }

      searchObj.section = section;
      searchObj.slug = item.slug;
      let markdown = item.body || item.details || "";
      searchObj.html = md.render(markdown);
      let $ = cheerio.load(searchObj.html);
      searchObj.markdown = markdown;
      let headings = [];
      $("h2").filter(function () {
        let data = $(this);
        let text = data.text();
        headings.push(text);
      });
      searchObj.headings = headings;
      // searchObj.toc = toc(markdown).json;
      if (section === "clusters") {
        searchObj.route = `/documents/${section}/${searchObj.slug}/`;
      } else {
        searchObj.route = `/${section}/${searchObj.slug}/`;
      }

      searchObj.summary = item.summary || "";
      searchObj.url = `${myConfig.api.baseClient}${searchObj.route}`;
      delete searchObj.markdown;
      delete searchObj.html;
      return searchObj;
    });
    return items;
  });

  let siteMeta = index.flat();
  siteMeta = utils.filterUndefined(siteMeta);

  utils.saveJson(siteMeta, "./src/assets/site-meta.json");
  console.log(`Site meta created: ./src/assets/site-meta.json"`);
  //console.log(siteMeta);
}

main();
