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
                @click="$router.push(result.item.route)"
              >
                <div
                  style="
                    font-size: 12px;
                    font-weight: bold;
                    text-transform: uppercase;
                    color: #777;
                  "
                  class="text-right mb-3"
                >
                  <span
                    v-html="highlight(result.item.contentType)"
                    style="color: #222 !important"
                  ></span>
                  <span v-if="result.item.type">&nbsp;|&nbsp;</span>
                  <span
                    v-if="result.item.type"
                    v-html="highlight(result.item.type)"
                  ></span>
                </div>

                <h2><span v-html="highlight(result.item.title)"></span></h2>
                <v-card-text v-if="result.item.summary"
                  ><div v-html="highlight(result.item.summary)"></div
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
const highlight = (needle, haystack) => {
  haystack.replace(
    new RegExp(needle, "gi"),
    (str) => `<strong>${str}
      </strong>`
  );
  return haystack;
};
export default {
  data() {
    return {
      query: "",
      queryResults: [],
      content: "",
      fuse: null,
    };
  },
  async created() {
    this.fuse = new Fuse(this.$myApp.siteMeta, this.$myApp.config.search);
  },
  methods: {
    highlight(text) {
      let pattern = new RegExp(this.query, "gi");
      let str = text.replace(
        pattern,
        `<span class='highlight'>${this.query}</span>`
      );

      return str;
    },
    instantSearch() {
      this.queryResults = this.fuse.search(this.query).slice(0, 20);
      //console.log(this.fuse.search(this.query));
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
