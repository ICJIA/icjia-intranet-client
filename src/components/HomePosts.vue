<template>
  <ApolloQuery :query="getHomePosts" notifyOnNetworkStatusChange>
    <template slot-scope="{ result }">
      <div v-if="isLoading(result.loading, result.error)">
        <Loader></Loader>
      </div>

      <div v-if="!isLoading(result.loading, result.error) && !result.error">
        <div v-for="post in result.data.posts" :key="post.id">
          <v-card
            class="mb-1 mt-1 px-3 py-4 hover card"
            @click="routeTo(post.slug)"
            elevation="1"
          >
            <div
              class="text-right"
              style="font-size: 12px; font-weight: bold; color: #555;"
            >
              {{ post.created_at | format }}
            </div>
            <v-card-title style="font-size: 18px;">{{
              post.title
            }}</v-card-title>
            <v-card-text style="font-size: 14px;">{{
              post.summary
            }}</v-card-text>
          </v-card>
        </div>
      </div>
      <div v-if="result.error" class="text-center error apollo">
        {{ result.error }}
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import { GET_HOME_POSTS } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      getHomePosts: GET_HOME_POSTS,
    };
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
