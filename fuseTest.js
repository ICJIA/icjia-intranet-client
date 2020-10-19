const Fuse = require("fuse.js");
const query = "Fulsem";
const _ = require("lodash");

const highlight = (fuseSearchResult, highlightClassName = "highlight") => {
  // const set = (obj, path, value) => {
  //   const pathValue = path.split(".");
  //   let i;
  //   for (i = 0; i < pathValue.length - 1; i++) {
  //     obj = obj[pathValue[i]];
  //   }
  //   obj[pathValue[i]] = value;
  // };
  const generateHighlightedText = (inputText, regions = []) => {
    let content = "";
    let nextUnhighlightedRegionStartingIndex = 0;
    regions.forEach((region) => {
      const lastRegionNextIndex = region[1] + 1;
      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<span class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        "</span>",
      ].join("");
      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });
    content += inputText.substring(nextUnhighlightedRegionStartingIndex);
    return content;
  };
  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = Object.assign({}, item);
      matches.forEach((match) => {
        _.set(
          highlightedItem,
          match.key,
          generateHighlightedText(match.value, match.indices)
        );
      });
      return highlightedItem;
    });
};

(async function main() {
  const searchOptions = await require("./src/config.json").search;
  const fuseIndex = await require("./public/fuse-index.json");
  const myIndex = Fuse.parseIndex(fuseIndex);
  const siteMeta = await require("./public/site-meta.json");
  // const myIndex = Fuse.createIndex(searchOptions.keys, searchIndex);
  const fuse = new Fuse(siteMeta, searchOptions, myIndex);
  const result = highlight(fuse.search(query).slice(0, 2));

  console.log("query: ", query);
  console.log(result);
})();
