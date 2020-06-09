<template>
  <div>
    <h1 v-if="posts">{{ posts[0]["title"] }}</h1>
    <div
      v-if="posts"
      v-html="render(posts[0]['body'])"
      @click="handleClicks"
      class="dynamic-content"
    ></div>
    <div v-if="$apollo.loading"><h1>LOADING</h1></div>
    <div v-if="error">Error: {{ error }}</div>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_POST_QUERY } from "@/graphql/queries/getPosts";
export default {
  name: "Home",
  mixins: [handleClicks],
  components: {},

  data() {
    return {
      posts: null,
      error: null,
    };
  },

  methods: {
    render(content) {
      return renderToHtml(content);
    },
  },
  apollo: {
    posts: {
      query: GET_SINGLE_POST_QUERY,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>
