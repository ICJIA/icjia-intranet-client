<template>
  <div>
    <h1>Get all posts</h1>

    <div v-if="posts">
      {{ posts }}
    </div>
    <div v-if="$apollo.loading"><h1>LOADING</h1></div>
    <div v-if="error">Error: {{ error }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import { GET_ALL_POSTS_QUERY } from "@/graphql/queries/getPosts.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      posts: null,
      error: null,
      isLoading: false,
    };
  },
  mounted() {
    //console.log(this.$apollo);
  },
  apollo: {
    posts: {
      query: GET_ALL_POSTS_QUERY,
      variables: {},
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      watchLoading(isLoading, countModifier) {
        this.isLoading = isLoading;
        console.log(isLoading, countModifier);
      },
      result(ApolloQueryResult) {
        // console.log(ApolloQueryResult.data);
        // console.log(ApolloQueryResult.data.posts.length);
        if (!ApolloQueryResult.data && !ApolloQueryResult.data.posts.length) {
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
