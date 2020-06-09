<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div v-if="posts">
            {{ posts }}
          </div>
          <div v-else>
            <Loader></Loader>
          </div>
          <div v-if="homeAbout">
            {{ homeAbout }}
          </div>
          <div v-else>
            <Loader></Loader>
          </div>
          <!-- <div v-if="$apollo.loading" class="text-center mt-12">
            <Loader></Loader>
          </div> -->
          <div v-if="error && error.length" class="text-center mt-12">
            <div style="font-size: 24px; color: red; font-weight: bold;">
              {{ error[0] }}
            </div>

            <div class="mt-10">
              Please try
              <router-link to="/login">logging in</router-link> again.
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_HOME_POSTS, GET_HOME_ABOUT } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      posts: null,
      error: [],
      isLoading: false,
      content: null,
      homeAbout: null,
    };
  },
  mounted() {
    //console.log(this.$apollo);
  },
  apollo: {
    posts: {
      query: GET_HOME_POSTS,
      variables: {},
      error(error) {
        console.log("ERROR:", error);
        this.error.push(JSON.stringify(error.message));
      },
    },
    homeAbout: {
      query: GET_HOME_ABOUT,
      variables: {},
      error(error) {
        console.log("ERROR:", error);
        this.error.push(JSON.stringify(error.message));
      },
      // watchLoading(isLoading, countModifier) {
      //   this.isLoading = isLoading;
      //   console.log(isLoading, countModifier);
      // },
      // result(ApolloQueryResult) {
      //   // this.homeAbout = ApolloQueryResult.data.homeAbout;
      //   // this.posts = ApolloQueryResult.data.posts;
      //   // if (!ApolloQueryResult.data && !ApolloQueryResult.data.posts.length) {
      //   //   this.$router.push("/404").catch((err) => {
      //   //     console.log(err);
      //   //   });
      //   // }
      // },
    },
  },
};
</script>
