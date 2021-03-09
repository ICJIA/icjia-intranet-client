<template>
  <ApolloQuery
    :query="GET_HOME"
    notifyOnNetworkStatusChange
    :variables="{ now, eventLimit, postLimit }"
    @result="afterFetch"
  >
    <template slot-scope="{ result }">
      <div v-if="isLoading(result.loading)">
        <Loader></Loader>
      </div>

      <div
        v-if="!isLoading(result.loading) && !result.error"
        style="background: #fff"
      >
        <!-- START: home components -->

        <HomeSlider
          :slides="result.data.home.slider"
          v-if="result.data.home.slider"
        ></HomeSlider>

        <v-container
          fluid
          style="margin-top: 20px; border-top: 1px solid #ddd"
          class="markdown-body"
        >
          <v-row>
            <v-col sm="12" md="6" cols="12" class="child">
              <v-sheet class="" elevation="0" style="">
                <v-container>
                  <v-row>
                    <v-col>
                      <HomePosts
                        :posts="result.data.posts"
                        v-if="result.data.posts"
                      ></HomePosts>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-col>
            <v-col
              sm="12"
              md="6"
              cols="12"
              class="child"
              style="border-left: 1px solid #ddd; margin-top: -12px"
            >
              <v-sheet class="pl-3" elevation="0" style="">
                <HomeEvents
                  class="mt-4"
                  :events="mergedEvents"
                  v-if="result.data.events && result.data.eventRange"
                ></HomeEvents>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container
          fluid
          style="border-top: 1px solid #ddd; margin-top: -12px"
        >
          <v-row>
            <v-col>
              <v-sheet class="px-2 py-2" elevation="0" style="">
                <v-container fluid>
                  <v-container fluid style="margin: 0; padding: 0">
                    <div style="background: #f3f5f7" class="px-2 py-2">
                      <v-row no-gutters>
                        <v-col>
                          <h2>Recent Documents</h2>
                        </v-col>
                      </v-row>
                    </div>
                  </v-container>

                  <v-row style="margin-top: -5px">
                    <v-col v-if="documents.length">
                      <DocumentTable
                        :documents="filteredDocuments"
                        :hideFooter="true"
                        :hideSearch="true"
                        chipLabel="Updated!"
                        style="border: 1px solid #eee"
                      ></DocumentTable>
                    </v-col>
                    <v-col v-else>
                      <div class="text-center">
                        <h2>No documents found</h2>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
        <v-container
          fluid
          style="margin-top: 20px; border-top: 1px solid #ddd"
          class=""
        >
          <v-row>
            <v-col sm="12" cols="12" md="6" class="child">
              <v-sheet class="px-2 py-2" elevation="0">
                <v-container fluid style="margin: 0; padding: 0">
                  <div style="background: #f3f5f7" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2>Recent Articles</h2>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <ResearchArticles :limit="4" class="mt-2"></ResearchArticles>
                <div class="py-2 text-center reduce-85">
                  Visit
                  <a
                    href="https://icjia.illinois.gov/researchhub"
                    target="_blank"
                    >ICJIA's ResearchHub</a
                  >
                  for more articles, datasets, and applications.
                </div>
              </v-sheet>
            </v-col>
            <v-col sm="12" cols="12" md="6" class="child">
              <v-sheet class="px-2 py-2" elevation="0">
                <v-container fluid style="margin: 0; padding: 0">
                  <div style="background: #f3f5f7" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2>Recent Applications</h2>
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <ResearchApplications
                  :limit="5"
                  class="mt-2"
                ></ResearchApplications>
                <div class="py-2 text-center reduce-85">
                  Visit
                  <a
                    href="https://icjia.illinois.gov/researchhub"
                    target="_blank"
                    >ICJIA's ResearchHub</a
                  >
                  for more articles, datasets, and applications.
                </div>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" class="text-center">
              <v-sheet class="px-2 py-2" elevation="0" style="">
                <v-container fluid style="margin: 0; padding: 0" class="mb-3">
                  <div style="background: #f3f5f7" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2>ICJIA on Facebook</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn x-small @click="facebookKey++"
                          >Refresh <v-icon right small>refresh</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>

                <Facebook :key="facebookKey"></Facebook>
              </v-sheet>
              <!--  -->
            </v-col>
            <v-col cols="12" md="6">
              <v-sheet class="px-2 py-2" elevation="0" style="">
                <v-container fluid style="margin: 0; padding: 0">
                  <div style="background: #f3f5f7" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2>ICJIA on Twitter</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn x-small @click="twitterKey++"
                          >Refresh <v-icon right small>refresh</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <Twitter :key="twitterKey" :tweetLimit="3"></Twitter>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <!-- END: home components -->
      </div>
      <div v-if="result.error" class="text-center error apollo">
        {{ result.error }}
        <div class="text-center my-10 py-5">
          <router-link to="/login"
            >PLEASE CLICK HERE TO LOGIN AGAIN</router-link
          >
        </div>
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import { GET_HOME } from "@/graphql/queries/home.js";
// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import tz from "moment-timezone";
// eslint-disable-next-line no-unused-vars
//import { Tweet, Moment, Timeline } from "vue-tweet-embed";
import { nanoid } from "nanoid";

export default {
  name: "Home",
  components: {},
  computed: {
    name() {
      return this.data;
    },
  },
  created() {
    this.now = moment().tz(this.$myApp.config.timezone).format("YYYY-MM-DD");
  },
  mounted() {
    //console.log(this.$myApp.config.timezone);
  },
  data() {
    return {
      GET_HOME,
      now: null,
      documents: null,
      filteredDocuments: null,
      twitterKey: 0,
      facebookKey: 0,
      nanoid,
      mergedEvents: () => [],
      eventLimit: this.$myApp.config.home.eventLimit,
      postLimit: this.$myApp.config.home.postLimit,
    };
  },
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? window.NProgress.start() : window.NProgress.done();
      return loading ? true : false;
    },

    afterFetch(result) {
      if (result.data && result.data.events && result.data.eventRange) {
        let mergedEvents = [...result.data.events, ...result.data.eventRange];
        mergedEvents = _.sortBy(mergedEvents, (o) => o.start);
        this.mergedEvents = mergedEvents.slice(0, this.eventLimit);
      }

      if (result.data && result.data.documents) {
        this.documents = result.data.documents;
        this.documents = this.documents.map((d) => ({
          ...d,
          show: false,
        }));
        this.filteredDocuments = this.documents;
      }
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0px 0px 15px #000000;
  z-index: 2;
  -webkit-transition: all 100ms ease-in;
  -webkit-transform: scale(1.01);
  -ms-transition: all 100ms ease-in;
  -ms-transform: scale(1.01);
  -moz-transition: all 100ms ease-in;
  -moz-transform: scale(1.01);
  transition: all 100ms ease-in;
  transform: scale(1.01);
  cursor: pointer;
  background: #fafafa;
}
</style>
