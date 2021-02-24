<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subPath="Tags"
      subPathURL="/tags/"
      :title="`${tag.title}`"
    ></Breadcrumb>
    <v-container v-if="tags && tags.length">
      <v-row>
        <v-col cols="12" order-md="1" order="2" order-sm="2">
          <div class="markdown-body">
            <h1 class="text-center">{{ tag.title }}</h1>
            <div v-html="tag.summary" class="mb-12"></div>
            <h2
              class="mt-3 text-center"
              id="documents"
              v-if="tag.documents.length"
            >
              Documents & Resources
            </h2>
          </div>
          <div v-if="tag.documents.length">
            <DocumentTable
              :documents="tag.documents"
              :searchLabel="`Search Documents`"
              v-if="tags"
              :key="$route.path"
            ></DocumentTable>
          </div>
          <!-- <div v-else class="mt-4 markdown-body">
            <h3 style="color: #666" class="text-center">
              No documents tagged '{{ tag.title }}' found.
            </h3>
          </div> -->

          <div
            class="text-center markdown-body mt-12"
            v-if="tag && tag.posts && tag.posts.length"
          >
            <h2 class="" id="news-and-updates">News & Updates</h2>
          </div>
          <div v-if="tag && tag.posts && tag.posts.length">
            <v-container class="view-container mt-6">
              <v-row>
                <v-col
                  v-for="(item, index) in tag.posts"
                  :key="index"
                  cols="12"
                >
                  <news-card
                    :item="item"
                    :textOnly="false"
                    style="margin-top: -5px"
                  ></news-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <!-- <div v-else class="mt-4 markdown-body">
            <h3 style="color: #666" class="text-center">
              No news tagged '{{ tag.title }}' found.
            </h3>
          </div> -->

          <h2
            class="mt-8 text-center"
            id="documents"
            v-if="tag && tag.events && tag.events.length"
          >
            Upcoming Events
          </h2>

          <div v-if="tag && tag.events && tag.events.length">
            <v-container class="view-container mt-6">
              <v-row>
                <v-col>
                  <HomeEvents :events="tag.events"></HomeEvents>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <!-- <div v-else class="mt-4 markdown-body">
            <h3 style="color: #666" class="text-center">
              No events tagged '{{ tag.title }}' found.
            </h3>
          </div> -->
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
import { GET_SINGLE_TAG } from "@/graphql/queries/tags";
export default {
  data() {
    return {
      item: null,
      tag: null,
      error: null,
      display: null,
      filteredEvents: null,
    };
  },
  methods: {},
  apollo: {
    tags: {
      prefetch: true,
      query: GET_SINGLE_TAG,
      variables() {
        return {
          slug: this.$route.params.slug,
          now: new Date(),
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        if (
          ApolloQueryResult &&
          ApolloQueryResult.data &&
          ApolloQueryResult.data.tags.length > 0 === false
        ) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        }
        this.tag = ApolloQueryResult.data.tags[0];
        this.tag.documents = this.tag.documents.map((d) => ({
          ...d,
          show: false,
        }));
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
