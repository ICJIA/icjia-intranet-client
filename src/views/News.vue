<template>
  <div>
    <Breadcrumb
      v-if="posts && posts.length"
      :key="$route.path"
      title="News"
    ></Breadcrumb>
    <v-container class="mb-0">
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>News & Updates</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid class="mb-12">
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <!-- <div
              class="mb-2"
              style="font-size: 12px; font-weight: 900; color: #666"
            >
              Show:
            </div> -->
            <NewsToggle @toggle="toggle"></NewsToggle>
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
      <v-row v-if="view === 'list'" style="margin-top: -20px" class="masonry">
        <v-col cols="12" sm="12" class="child">
          <div
            v-for="(item, index) in posts"
            :key="`list-${index}`"
            class="px-5"
          >
            <news-card
              :item="item"
              :text-only="true"
              read-more-text="Read News"
              @init="resize"
              style="margin-bottom: -10px !important"
              @imageLoaded="resize"
            ></news-card>
          </div>
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
