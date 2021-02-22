<template>
  <div>
    <div v-if="!newPosts.length">
      <v-card
        color="grey lighten-5"
        class="mb-5 text-center py-5"
        elevation="0"
      >
        <h2>No upcoming posts</h2></v-card
      >
    </div>

    <div
      v-for="(post, index) in newPosts"
      :key="index + post.id"
      v-else
      class="mb-8"
    >
      <news-card :item="post" :text-only="false"></news-card>
    </div>
  </div>
</template>
<script>
import { getImageURL } from "@/services/Image";
import moment from "moment";
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
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.published_at); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= this.$myApp.config.daysToShowNew) {
        return true;
      } else {
        return false;
      }
    },
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
      loading ? window.NProgress.start() : window.NProgress.done();
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
