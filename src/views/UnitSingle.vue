<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subpath="Units"
      subpathURL="`/units/`"
      :title="`${unit.title}`"
      v-if="units && units.length"
    ></Breadcrumb>
    <v-container v-if="units && units.length">
      <v-row>
        <v-col class="">
          <div class="markdown-body">
            <h1 class="text-center">{{ unit.title }}</h1>
            <div v-html="unit.summary" class="mb-12"></div>
            <h2 class="mt-3 text-center">Documents</h2>
          </div>
          <div v-if="unit.documents.length">
            <DocumentTable
              :documents="unit.documents"
              :searchLabel="`Search ${unit.shortname} Documents`"
              v-if="units"
            ></DocumentTable>
          </div>
          <div v-else class="mt-4 markdown-body">
            <h3 style="color: #666" class="text-center">
              No documents for {{ unit.shortname }} found.
            </h3>
          </div>

          <div class="text-center markdown-body mt-12">
            <h2 class="">News & Updates</h2>
          </div>
          <div v-if="unit.posts.length">
            <NewsTable
              :posts="unit.posts"
              :searchLabel="`Search ${unit.shortname} News`"
              :unit="unit.shortname"
              v-if="units"
            ></NewsTable>
          </div>
          <div v-else class="mt-4 markdown-body">
            <h3 style="color: #666" class="text-center">
              No news for {{ unit.shortname }} found.
            </h3>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <loader></loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_SINGLE_UNIT } from "@/graphql/queries/units";
export default {
  data() {
    return {
      item: null,
      unit: null,
      error: null,
    };
  },
  apollo: {
    units: {
      prefetch: true,
      query: GET_SINGLE_UNIT,
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
          ApolloQueryResult.data.units.length > 0 === false
        ) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        }
        this.unit = ApolloQueryResult.data.units[0];
      },
    },
  },
};
</script>
