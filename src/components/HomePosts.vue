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
        color="grey lighten-4"
        class="mb-5 py-3 px-3 postCard"
        elevation="1"
        @click.prevent="routeTo(post.slug)"
      >
        <div class="px-5 py-6">
          <h2 class="mt-2 hover" @click.prevent="post.show = !post.show">
            {{ post.title }}
          </h2>
          <v-card-subtitle v-if="!post.show">{{
            post.summary
          }}</v-card-subtitle>
        </div>
        <div class="hover readMore text-right">
          <span
            ><v-btn outlined x-small :to="`/news/${post.slug}`">
              Read More&nbsp;<v-icon x-small
                >keyboard_arrow_right</v-icon
              ></v-btn
            ></span
          >
        </div>

        <v-slide-y-transition>
          <div class="py-3 mt-2" v-show="post.show">
            <div class="mt-2 pl-5">{{ post.body }}</div>
          </div>
        </v-slide-y-transition>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomePosts",
  components: {},

  data() {
    return {
      newPosts: [],
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
