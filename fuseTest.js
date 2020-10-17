const Fuse = require("fuse.js");
const query = "Integer ac leo";

(async function main() {
  const searchOptions = await require("./src/config.json").search;
  const searchIndex = await require("./public/searchIndex.json");
  const myIndex = Fuse.createIndex(searchOptions.keys, searchIndex);
  const fuse = new Fuse(searchIndex, searchOptions, myIndex);
  const result = fuse.search(query).slice(0, 2);

  console.log("query: ", query);
  console.log(result);
})();
