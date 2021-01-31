<template>
  <div>
    <Breadcrumb :key="$route.path" title="News & Updates"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>News & Updates</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row v-masonry id="masonry-group">
        <v-col v-for="(post, index) in posts" :key="index" cols="12" sm="4">
          <v-card
            color="white"
            elevation="2"
            class="pt-1 pb-1 mx-3 my-3 hover info-card"
            @click="$router.push(`/news/${post.slug}`)"
          >
            <v-card-text style="font-size: 12px"
              ><PostedMeta :meta="post" :showUpdatedInText="false"></PostedMeta
            ></v-card-text>
            <div class="px-4 mb-5">
              <h2 style="line-height: 32px">
                <v-chip
                  dark
                  x-small
                  color="#2296F3"
                  class="mr-2"
                  v-if="isItNew(post)"
                >
                  NEW! </v-chip
                >{{ post.title }}
              </h2>
            </div>

            <img
              v-if="post.splash"
              :src="`${$myApp.config.api.base}${post.splash.formats.small.url}`"
              :lazy-src="`${$myApp.config.api.base}${post.splash.formats.thumbnail.url}`"
              @load="redraw()"
              width="100%"
            />
            <div v-else>{{ redraw() }}</div>
            <v-card-text>{{ post.summary }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_ALL_POSTS_QUERY } from "@/graphql/queries/posts";
import moment from "moment";
export default {
  data() {
    return {
      error: null,
    };
  },
  created() {
    this.redraw();
    this.$redrawVueMasonry();
  },
  mounted() {
    this.redraw();
    console.log("loaded");
  },
  methods: {
    redraw() {
      this.$redrawVueMasonry("#masonry-group");
      console.log("redraw masonry");
    },
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.updated_at); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= this.$myApp.config.daysToShowNew) {
        return true;
      } else {
        return false;
      }
    },
    buildMeta(post) {
      let meta = {
        created_at: post.created_at,
        updated_at: post.updated_at,
        updated_by: post.updated_by,
        created_by: post.created_by,
      };
      return meta;
    },
  },
  apollo: {
    posts: {
      prefetch: true,
      query: GET_ALL_POSTS_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>

<style></style>
