<template>
  <div>
    <ApolloQuery :query="getHomePosts" notifyOnNetworkStatusChange class="mt-3">
      <template slot-scope="{ result }">
        <!-- Some content -->

        <div v-if="isLoading(result.loading, result.error)">
          <v-progress-circular
            indeterminate
            color="primary"
            size="50"
          ></v-progress-circular>
        </div>

        <div v-if="!isLoading(result.loading, result.error) && !result.error">
          {{ result }}
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </template>
    </ApolloQuery>

    <ApolloQuery :query="getHomeAbout" notifyOnNetworkStatusChange class="mt-3">
      <template slot-scope="{ result }">
        <!-- Some content -->

        <div v-if="isLoading(result.loading, result.error)">
          <v-progress-circular
            indeterminate
            color="primary"
            size="50"
          ></v-progress-circular>
        </div>

        <div v-if="!isLoading(result.loading, result.error) && !result.error">
          {{ result }}
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { GET_HOME_POSTS, GET_HOME_ABOUT } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},
  mounted() {
    // console.log(this.$apollo);
  },
  //   watch: {
  //     loading(newValue) {
  //       console.log(newValue);
  //     },
  //   },
  data() {
    return {
      getHomePosts: GET_HOME_POSTS,
      getHomeAbout: GET_HOME_ABOUT,
      loading: null,
    };
  },
  methods: {
    isLoading(loading, error) {
      this.loading = loading;
      console.log(error);
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
  },
};
</script>
