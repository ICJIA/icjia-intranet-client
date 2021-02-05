<template>
  <div>
    <div v-if="articles && articles.length > 0">
      <div v-for="(article, index) in articles" :key="getKey(index)">
        <v-card
          class="mb-5 px-3 py-3 hover card"
          style="border: 1px #aaa solid"
          @click="routeTo(article)"
          elevation="0"
        >
          <v-img
            class=""
            height="225px"
            :src="article.splash"
            :lazy-src="article.thumbnail"
            v-if="!$browserDetect.isIE"
          >
            <v-chip
              dark
              color="#2296F3"
              style="margin-top: -1px !important"
              v-if="isItNew(article)"
              class="icjia-card"
            >
              NEW!
            </v-chip>
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <!-- <div class="card-banner mb-5">
              <div
                style="font-size: 22px; font-weight: 900"
                class="px-5 article-title"
              >
                {{ article.title }}
              </div>
            </div> -->
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
import moment from "moment";
import { nanoid } from "nanoid";
import { getHubArticles } from "@/services/External";
export default {
  data() {
    return {
      loading: null,
      articles: [],
      start: 0,
      click: 0,

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
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.date); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= this.$myApp.config.daysToShowNewResearch) {
        return true;
      } else {
        return false;
      }
    },
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
  props: {
    limit: {
      type: Number,
      default: 4,
    },
  },
};
</script>

<style></style>
