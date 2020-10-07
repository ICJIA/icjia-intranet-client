<template>
  <div>
    <div v-if="!$apollo.loading">result here</div>
    <div v-else>
      <Loader></Loader>
    </div>
  </div>
</template>

<script>
/* eslint-disable graphql/template-strings */
import gql from "graphql-tag";
export default {
  name: "Home",

  components: {},

  data() {
    return {
      error: null,
    };
  },

  methods: {},
  apollo: {
    articles: {
      query: gql`
        query Research {
          articles {
            id
            title
          }
        }
      `,
      context: {
        uri: "https://researchhub.icjia-api.cloud/graphql",
        headers: { Authorization: "" },
      },
      variables() {},
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        console.log(ApolloQueryResult);
      },
    },
  },
};
</script>
