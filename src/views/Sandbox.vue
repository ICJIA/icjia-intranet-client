<template>
  <div>
    <ApolloQuery :query="getHomePosts" notifyOnNetworkStatusChange>
      <template slot-scope="{ result }">
        <!-- Some content -->

        <div v-if="result.loading">LOADING</div>

        <div v-else>{{ result }}</div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { GET_HOME_POSTS, GET_HOME_ABOUT } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      getHomePosts: GET_HOME_POSTS,
      getHomeAbout: GET_HOME_ABOUT,
    };
  },
  mounted() {
    //console.log(this.$apollo);
  },
};
</script>
