<template>
  <div>
    <div v-if="articles && articles.length > 0">
      <div v-for="(article, index) in articles" :key="getKey(index)">
        <v-card class="mb-5 hover card" @click="routeTo(article)">
          <v-img
            class="white--text align-end"
            height="225px"
            :src="article.splash"
            :lazy-src="article.thumbnail"
            v-if="!$browserDetect.isIE"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <div class="card-banner mb-5">
              <div
                style="font-size: 22px; font-weight: 900"
                class="px-5 article-title"
              >
                {{ article.title }}
              </div>
            </div>
          </v-img>

          <h3 class="px-5 pt-5">
            {{ article.title }}
          </h3>

          <div class="px-4 pt-3">
            By
            <span v-for="(author, index) in article.authors" :key="index">
              <span v-if="index === article.authors.length - 1 && index > 0"
                >&nbsp;and&nbsp;</span
              >
              <span v-if="index < article.authors.length - 1 && index > 0"
                >,</span
              >
              <span style="font-weight: bold; color: #065f60">
                {{ author.title }}
              </span>
            </span>
          </div>

          <v-card-subtitle class="pb-2">
            {{ article.date | format }}
          </v-card-subtitle>

          <v-card-text class="text--primary mb-2">{{
            article.abstract
          }}</v-card-text>
        </v-card>
      </div>
    </div>
    <!-- <div v-if="loading">
      <Loader></Loader>
    </div> -->
    <!-- <div class="text-center" v-if="click < 2">
      <v-btn
        class="ma-2"
        :loading="loading"
        :disabled="loading"
        color="secondary"
        @click="loadMore()"
      >
        LOAD MORE
      </v-btn>
    </div> -->
  </div>
</template>

<script>
// if (!window.crypto) {
//   window.crypto = window.msCrypto;
// }

import { nanoid } from "nanoid";
import { getHubArticles } from "@/services/External";
export default {
  data() {
    return {
      loading: null,
      articles: [],
      start: 0,
      click: 0,
      limit: 2,
      max: 9,
      disabled: false,
      query: null,
      alreadySeen: false,
    };
  },
  created() {
    this.fetchContent();
    this.alreadySeen = true;
  },
  methods: {
    getKey(index) {
      return nanoid(8) + index;
    },
    routeTo(article) {
      window.open(
        `https://icjia.illinois.gov/researchhub/articles/${article.slug}`
      );
    },

    async fetchContent() {
      this.loading = true;
      this.query = await getHubArticles(this.start, this.limit);

      this.articles.push(...this.query);
      this.loading = false;
    },
    async loadMore() {
      if (this.click >= 2) {
        this.disabled = true;
        return;
      } else {
        this.start = this.start + this.limit;
        this.click = this.click + 1;
        this.fetchContent();
      }
    },
  },
};
</script>

<style>
.card-banner {
  background: rgba(79, 80, 79, 0.5);
  padding: 5px;
}
.card:hover {
  box-shadow: 0px 0px 15px #000000;
  z-index: 2;
  -webkit-transition: all 100ms ease-in;
  -webkit-transform: scale(1.01);
  -ms-transition: all 100ms ease-in;
  -ms-transform: scale(1.01);
  -moz-transition: all 100ms ease-in;
  -moz-transform: scale(1.01);
  transition: all 100ms ease-in;
  transform: scale(1.01);
  cursor: pointer;
}
.article-title {
  line-height: 1.3em;
}
</style>
