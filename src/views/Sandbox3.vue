<template>
  <div>
    <Breadcrumb
      v-if="posts && posts.length"
      :key="$route.path"
      title="News"
    ></Breadcrumb>
    <v-container class="mb-5">
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>News & Updates</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="posts" class="view-container" fluid>
      <v-row v-if="view === 'block'" class="masonry">
        <v-col
          v-for="(item, index) in posts"
          :key="index"
          class="child"
          cols="12"
          md="6"
        >
          <news-card
            :item="item"
            :text-only="false"
            read-more-text="Read News"
            @init="resize"
            @imageLoaded="resize"
          ></news-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_ALL_POSTS_QUERY } from "@/graphql/queries/posts";
export default {
  data() {
    return {
      view: "block",
    };
  },
  methods: {
    toggle(e) {
      this.view = e;
      // console.log('view: ', this.view)
      this.resize();
    },
    resize() {
      const elem = document.querySelector(".masonry");
      const masonry = new window.Masonry(elem, {
        itemSelector: ".child",
      });
      masonry.layout();
      console.log("layout resized");
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

<style lang="scss" scoped></style>
