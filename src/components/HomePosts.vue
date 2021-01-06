<template>
  <div>
    <div v-if="!newPosts.length">
      <v-card
        color="grey lighten-5"
        class="mb-5 text-center py-5"
        elevation="1"
      >
        <h2>No upcoming posts</h2></v-card
      >
    </div>

    <div v-for="(post, index) in newPosts" :key="index + post.id" v-else>
      <v-card
        class="mx-auto my-5 py-5"
        outlined
        @click="$router.push(`/news/${post.slug}`)"
      >
        <v-list-item three-line>
          <v-list-item-avatar tile size="100" color="grey" v-if="post.splash">
            <v-img
              :src="
                getImageURL(
                  $myApp.config.api.base + post.splash.formats.thumbnail.url,
                  0,
                  0,
                  100
                )
              "
              :lazy-src="
                getImageURL(
                  $myApp.config.api.base + post.splash.formats.thumbnail.url,
                  0,
                  0,
                  1
                )
              "
              :alt="getAltText(post)"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="blue darken-3"
                  ></v-progress-circular>
                </v-row> </template
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="overline mb-4">{{ post.created_at | format }}</div>
            <div
              style="font-size: 14px; color: #888"
              class="mb-2"
              v-if="post.kicker"
            >
              {{ post.kicker }}
            </div>
            <h2 class="mt-0 hover">
              {{ post.title }}
            </h2>
            <v-card-subtitle v-if="!post.show">{{
              post.summary
            }}</v-card-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions style="margin-top: -15px">
          <v-spacer></v-spacer>
          <v-btn outlined x-small :to="`/news/${post.slug}`">
            Read More&nbsp;<v-icon x-small>keyboard_arrow_right</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import { getImageURL } from "@/services/Image";
export default {
  name: "HomePosts",
  components: {},

  data() {
    return {
      newPosts: [],
      getImageURL,
    };
  },
  created() {
    this.newPosts = this.posts.map((posts) => ({
      ...posts,
      show: false,
    }));
    // console.log(this.newEvents.length);
  },

  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    routeTo(slug) {
      this.$router.push(`/news/${slug}`);
    },

    getAltText(post) {
      if (post.splash.alternativeText) {
        return post.splash.alternativeText;
      } else {
        return "ICJIA Thumbnail Image";
      }
    },
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
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
  background: #fafafa;
}
</style>
