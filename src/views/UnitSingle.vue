<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subPath="Units"
      subPathURL="/units/"
      :title="`${unit.title}`"
      v-if="units && units.length"
    ></Breadcrumb>
    <v-container v-if="units && units.length" fluid>
      <v-row>
        <v-col cols="12" md="9" order-md="1" order="2" order-sm="2">
          <div class="markdown-body">
            <h1 class="text-center">{{ unit.title }}</h1>
            <div v-html="unit.summary" class="mb-12"></div>
            <h2 class="mt-3 text-center" id="documents">
              Documents & Resources
            </h2>
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
            <h2 class="" id="news-and-updates">News & Updates</h2>
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
          <div v-if="$route.params.slug === 'research-and-analysis-unit'">
            <h2 class="text-center mt-12" id="latest-articles">
              Recent Articles
            </h2>
            <v-card class="mt-5 px-5 py-5">
              <ResearchArticles limit="3"></ResearchArticles>
              <!-- <div class="py-2 text-center reduce-85">
                Visit
                <a href="https://icjia.illinois.gov/researchhub" target="_blank"
                  >the ResearchHub</a
                >
                for ICJIA's articles, datasets, and applications.
              </div> -->
            </v-card>
            <h2 class="text-center mt-12" id="latest-applications">
              Recent Applications
            </h2>
            <v-card class="mt-5 px-5 py-5">
              <ResearchApplications limit="3"></ResearchApplications>
            </v-card>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="3" order-md="2" order="1" order-sm="1">
          <div class="mainToc" v-if="units">
            <Toc :key="$route.path"></Toc>
          </div>
          <div v-else><Loader></Loader></div>
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
