const Fuse = require("fuse.js");
const query = "Integer ac leo";

(async function main() {
  const searchOptions = await require("./src/config.json").search;
  const fuseIndex = await require("./public/fuse-index.json");
  const myIndex = Fuse.parseIndex(fuseIndex);
  const siteMeta = await require("./public/site-meta.json");
  // const myIndex = Fuse.createIndex(searchOptions.keys, searchIndex);
  const fuse = new Fuse(siteMeta, searchOptions, myIndex);
  const result = fuse.search(query).slice(0, 2);

  console.log("query: ", query);
  console.log(result);
})();
