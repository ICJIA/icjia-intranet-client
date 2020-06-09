<template>
  <div>
    <ApolloQuery :query="getHomePosts" notifyOnNetworkStatusChange class="mt-3">
      <template slot-scope="{ result }">
        <div v-if="isLoading(result.loading, result.error)">
          <Loader></Loader>
        </div>

        <div v-if="!isLoading(result.loading, result.error) && !result.error">
          <div v-for="post in result.data.posts" :key="post.id">
            <v-card class="mb-5 hover card" @click="routeTo(post.slug)">
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-text>{{ post.summary }}</v-card-text>
            </v-card>
          </div>
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </template>
    </ApolloQuery>
  </div>
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
}
</style>
