<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 v-if="posts && posts.length">{{ posts[0]["title"] }}</h1>
          <div
            v-if="posts && posts.length"
            v-html="render(posts[0]['body'])"
            @click="handleClicks"
            class="dynamic-content"
          ></div>
          <div v-if="$apollo.loading" class="text-center">
            <Loader></Loader>
          </div>
          <div v-if="error">Error: {{ error }}</div>
        </v-col>
      </v-row>
    </v-container>
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
      result(ApolloQueryResult) {
        // console.log(ApolloQueryResult.data);
        // console.log(ApolloQueryResult.data.posts.length);
        if (!ApolloQueryResult.data.posts.length) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        }
      },
    },
  },
};
</script>
