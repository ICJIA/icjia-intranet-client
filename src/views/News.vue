<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>News & Updates here</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row v-masonry id="masonry-group">
        <v-col v-for="(post, index) in posts" :key="index" cols="12" sm="4">
          <v-card color="white" class="pt-1 pb-1 mx-3 my-3">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-img
              v-if="post.splash"
              :src="`${$myApp.config.api.base}${post.splash.formats.thumbnail.url}`"
              @load="$redrawVueMasonry('#masonry-group')"
            ></v-img>
            <div v-else>{{ redraw() }}</div>
            <v-card-text>{{ post.summary }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_ALL_POSTS_QUERY } from "@/graphql/queries/getPosts";
export default {
  data() {
    return {
      error: null,
    };
  },
  mounted() {
    this.$redrawVueMasonry("#masonry-group");
    console.log("redraw masonry");
  },
  methods: {
    redraw() {
      this.$redrawVueMasonry("#masonry-group");
      console.log("redraw masonry -- no pic");
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
