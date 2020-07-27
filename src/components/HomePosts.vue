<template>
  <div>
    {{ newPosts }}
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
