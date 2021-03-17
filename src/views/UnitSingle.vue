<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subPath="Units"
      subPathURL="/units/"
      :title="`${unit.title}`"
      v-if="units && units.length"
    ></Breadcrumb>
    <v-container
      v-if="units && units.length"
      :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    >
      <v-row>
        <v-col cols="12" order-md="1" order="2" order-sm="2">
          <div class="markdown-body">
            <h1 class="text-center">{{ unit.title }}</h1>
            <div v-html="unit.summary" class="mb-12"></div>
            <h2
              class="mt-3 text-left"
              id="documents"
              v-if="unit.documents.length"
            >
              {{ unit.shortname }} Documents & Resources
            </h2>
          </div>
          <div v-if="unit.documents && unit.documents.length">
            <DocumentTable
              :documents="unit.documents"
              :searchLabel="`Search ${unit.shortname} Documents`"
              v-if="units"
              :key="$route.path"
              style="border: 1px solid #eee"
            ></DocumentTable>
          </div>

          <div class="text-left markdown-body mt-12">
            <h2
              class=""
              id="news-and-updates"
              v-if="unit.posts && unit.posts.length"
            >
              {{ unit.shortname }} News & Updates
            </h2>
          </div>
          <div v-if="unit && unit.posts && unit.posts.length">
            <v-container class="view-container mt-0">
              <v-row>
                <v-col
                  v-for="(item, index) in unit.posts"
                  :key="index"
                  cols="12"
                >
                  <NewsCard
                    :item="item"
                    :textOnly="false"
                    style="margin-top: -5px"
                  ></NewsCard>
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div v-if="$route.params.slug === 'research-and-analysis-unit'">
            <h2 class="text-left mt-12" id="latest-articles">
              R&A Recent Articles
            </h2>
            <v-card class="mt-5 px-5 py-5">
              <ResearchArticles
                :limit="4"
                :key="$route.path"
              ></ResearchArticles>
              <div class="py-2 text-center reduce-85">
                Visit
                <a href="https://icjia.illinois.gov/researchhub" target="_blank"
                  >the ResearchHub</a
                >
                for all articles, datasets, and applications.
              </div>
            </v-card>
            <h2 class="text-left mt-12" id="latest-applications">
              R&A Recent Applications
            </h2>
            <v-card class="mt-5 px-5 py-5">
              <ResearchApplications
                :limit="4"
                :key="$route.path"
              ></ResearchApplications>
              <div class="py-2 text-center reduce-85">
                Visit
                <a href="https://icjia.illinois.gov/researchhub" target="_blank"
                  >the ResearchHub</a
                >
                for all articles, datasets, and applications.
              </div>
            </v-card>
          </div>
        </v-col>
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
        this.unit.documents = this.unit.documents.map((d) => ({
          ...d,
          show: false,
        }));
        console.log(this.unit.documents);
      },
    },
  },
};
</script>

<style>
.mainToc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 115px !important;
  font-size: 13px;
}
</style>
