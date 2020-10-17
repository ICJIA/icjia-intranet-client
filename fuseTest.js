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

// Change the pattern
// const pattern = ""

// return fuse.search(pattern)

async function main() {
  const searchIndex = await require("./public/searchIndex.json");
  // console.log("main invoked");
  const myIndex = Fuse.createIndex(options.keys, searchIndex);
  const fuse = new Fuse(searchIndex, options, myIndex);
  // Change the pattern
  const pattern = "Integer ac leo";

  const result = fuse.search(pattern).slice(0, 2);
  console.log("pattern: ", pattern);
  console.log(result);
}

main();
