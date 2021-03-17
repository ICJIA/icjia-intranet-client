<template>
  <div>
    <Breadcrumb
      v-if="documents"
      :key="$route.path"
      :title="documents[0]['title']"
      subPath="Documents"
      subPathURL="/documents/"
    ></Breadcrumb>
    <v-container :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
      <v-row>
        <v-col v-if="documents">
          <DocumentCard :item="documents[0]"></DocumentCard>
        </v-col>
        <v-col v-else>
          <Loader></Loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_SINGLE_DOCUMENT } from "@/graphql/queries/documents";
export default {
  data() {
    return {
      item: null,
    };
  },
  apollo: {
    documents: {
      prefetch: true,
      query: GET_SINGLE_DOCUMENT,
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
          ApolloQueryResult.data.documents.length > 0 === false
        ) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        } else {
          this.documents = this.documents.map((d) => ({
            ...d,
            show: false,
          }));
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
