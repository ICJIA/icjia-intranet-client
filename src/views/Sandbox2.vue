<template>
  <div>
    <div v-if="!$apollo.loading">
      <HomeAlert :content="home.alert"></HomeAlert>
    </div>
    <div v-else>
      <Loader></Loader>
    </div>
  </div>
</template>

<script>
import { GET_HOME } from "@/graphql/queries/home";
export default {
  name: "Home",

  components: {},

  data() {
    return {
      home: null,
      error: null,
    };
  },

  methods: {},
  apollo: {
    home: {
      query: GET_HOME,
      variables() {},
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        if (!ApolloQueryResult.data && !ApolloQueryResult.data.posts.length) {
          // eslint-disable-next-line no-unused-vars
          // this.$router.push("/404").catch((err) => {
          //   console.log(err);
          // });
          console.log("error");
        }
      },
    },
  },
};
</script>
