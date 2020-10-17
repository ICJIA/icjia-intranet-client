const Fuse = require("fuse.js");

const options = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: true,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.8,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  keys: ["searchMeta", "summary", "title", "headings.text"],
};

(async function main() {
  const searchIndex = await require("./public/searchIndex.json");
  const myIndex = Fuse.createIndex(options.keys, searchIndex);
  const fuse = new Fuse(searchIndex, options, myIndex);
  const pattern = "Integer ac leo";
  const result = fuse.search(pattern).slice(0, 2);

  console.log("pattern: ", pattern);
  console.log(result);
})();
