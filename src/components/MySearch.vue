<template>
  <div>
    <v-container fluid
      ><v-col cols="12">
        <v-form class="pl-2">
          <v-text-field
            ref="textfield"
            v-model="query"
            label="Search"
            placeholder="Search ICJIA Intranet"
            @keyup="instantSearch"
          />
          <div style="font-size: 12px" class="text-right mb-9">
            {{ queryResults.length }} result{{ resultNumber }}
          </div>
          <div v-if="query && query.length">
            <div
              v-for="(result, index) in queryResults"
              :key="index"
              class="my-5"
            >
              <v-card
                elevation="1"
                class="px-5 py-4 info-card"
                color="grey lighten-5"
                @click="$router.push(result.route)"
              >
                <div
                  style="
                    font-size: 12px;
                    font-weight: bold;
                    text-transform: uppercase;
                    color: #777;
                  "
                  class="text-right mb-5"
                >
                  <span
                    v-html="result.contentType"
                    style="color: #0d4474 !important"
                  ></span>
                  <span v-if="result.type">&nbsp;|&nbsp;</span>
                  <span v-if="result.type" v-html="result.type"></span>
                </div>

                <h2><span v-html="result.title"></span></h2>
                <v-card-text v-if="result.summary"
                  ><div v-html="result.summary"></div
                ></v-card-text>
              </v-card>
            </div>
          </div>
        </v-form> </v-col
    ></v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import Fuse from "fuse.js";
import _ from "lodash";
function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
const highlight = (fuseSearchResult, highlightClassName = "highlight") => {
  const set = (obj, path, value) => {
    const pathValue = path.split(".");
    let i;
    for (i = 0; i < pathValue.length - 1; i++) {
      obj = obj[pathValue[i]];
    }
    obj[pathValue[i]] = value;
  };
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
        set(
          highlightedItem,
          match.key,
          generateHighlightedText(match.value, match.indices)
        );
      });
      return highlightedItem;
    });
};
export default {
  data() {
    return {
      query: "",
      queryResults: [],
      content: "",
      fuse: null,
      resultNumber: "s",
    };
  },
  async created() {
    this.fuse = new Fuse(this.$myApp.siteMeta, this.$myApp.config.search);
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.textfield.focus();
    });
  },
  methods: {
    instantSearch() {
      let queryResults = this.fuse.search(this.query);
      this.queryResults = highlight(queryResults);
    },
  },
};
</script>

<style>
.highlight {
  background: #ffff00;
  font-weight: 900;
  padding: 2px;
  text-transform: uppercase;
}
</style>
