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

      <div v-if="!isLoading(result.loading) && !result.error">
        <!-- START: home components -->

        <HomeSlider
          :slides="result.data.home.slider"
          v-if="result.data.home.slider"
        ></HomeSlider>

        <HomeQuickMenus
          :menus="result.data.home.quick_menu"
          v-if="result.data.home.quick_menu"
        ></HomeQuickMenus>

        <v-container fluid style="margin-top: -20px">
          <v-row>
            <v-col sm="12" md="6" cols="12" class="child">
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">News & Updates</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          to="/news"
                          aria-label="Show all news button"
                          >news archive&nbsp;<v-icon right small
                            >view_headline</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>

                <HomePosts
                  :posts="result.data.posts"
                  v-if="result.data.posts"
                ></HomePosts>
              </v-sheet>
            </v-col>
            <v-col sm="12" md="6" cols="12" class="child">
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">Upcoming Events</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          to="/events/"
                          aria-label="Show all Events button"
                          >All Events&nbsp;<v-icon right small
                            >calendar_today</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>

                <HomeEvents
                  :events="mergedEvents"
                  v-if="result.data.events && result.data.eventRange"
                ></HomeEvents>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="12" cols="12" md="6" class="child">
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">Recent Articles</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          target="_blank"
                          href="https://icjia.illinois.gov/researchhub"
                          >Research Hub&nbsp;<v-icon right small
                            >open_in_new</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <ResearchArticles :limit="4"></ResearchArticles>
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
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">Recent Applications</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          target="_blank"
                          href="https://icjia.illinois.gov/researchhub"
                          >Research Hub&nbsp;<v-icon right small
                            >open_in_new</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <ResearchApplications :limit="5"></ResearchApplications>
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
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">ICJIA on Facebook</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          target="_blank"
                          href="https://facebook.com/ICJIA"
                          >Facebook&nbsp;<v-icon right small
                            >fab fa-facebook</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>

                <Facebook></Facebook>
              </v-sheet>
              <!--  -->
            </v-col>
            <v-col cols="12" md="6">
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">ICJIA on Twitter</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          target="_blank"
                          href="https://twitter.com/ICJIA_Illinois"
                          >Twitter&nbsp;<v-icon right small
                            >fab fa-twitter</v-icon
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-container>
                <Timeline
                  id="ICJIA_Illinois"
                  sourceType="profile"
                  :options="{ tweetLimit: '3' }"
                  error-message="This timeline could not be loaded. Please <a href='https://intranet.icjia.cloud/'>refresh the page</a>."
                />
              </v-sheet>
              <!-- <div class="mt-4 text-center" style="font-size: 12px">
                Timeline not appearing?
                <a href="https://intranet.icjia.cloud/" style="background: none"
                  >Refresh this page.</a
                >
              </div> -->
              <!--  -->
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
import { Tweet, Moment, Timeline } from "vue-tweet-embed";
import { nanoid } from "nanoid";

export default {
  name: "Home",
  components: {
    Timeline,
  },
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
