<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      :title="`${clusters[0]['title']}`"
      v-if="clusters"
    ></Breadcrumb>
    <v-container>
      <v-row>
        <v-col v-if="clusters">
          <DocumentClusterCard :item="clusters[0]"></DocumentClusterCard>
        </v-col>
        <v-col v-else>
          <Loader></Loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_SINGLE_CLUSTER } from "@/graphql/queries/clusters";
export default {
  data() {
    return {
      item: null,
    };
  },
  apollo: {
    clusters: {
      prefetch: true,
      query: GET_SINGLE_CLUSTER,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        if (
          ApolloQueryResult &&
          ApolloQueryResult.data &&
          ApolloQueryResult.data.clusters.length > 0 === false
        ) {
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

<style lang="scss" scoped></style>
