/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const jsonfile = require("jsonfile");
const myConfig = require("./src/config.json");
const fs = require("fs");
const apiDir = "./src/api";
const dotenv = require("dotenv").config();
const JWT = process.env.JWT;
const endpoint = myConfig.api.baseGraphQL;
const utils = require("./lib/utils");
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
    units(sort: "slug:asc") {
      id
      title
      slug
      shortname
    }
  }
`;

async function main() {
  const data = await graphqlClient.request(query);
  const sections = Object.keys(data);
  let index = sections.map((section) => {
    let items = data[section].map((item) => {
      let obj = {};
      obj.id = item.id;
      obj.title = item.title;
      obj.slug = item.slug;
      obj.shortname = item.shortname.toLowerCase();
      obj.path = `/units/${item.slug}/`;
      return obj;
    });
    return items;
  });
  let units = index.flat();
  units = utils.filterUndefined(units);
  utils.saveJson(units, "./src/assets/units.json");
  console.log(`Site meta created: ./src/assets/units.json"`);
}

main();
