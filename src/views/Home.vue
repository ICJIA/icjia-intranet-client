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
                        <v-btn outlined small color="white" to="/news"
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
                        <v-btn outlined small color="white" to="/calendar"
                          >Calendar&nbsp;<v-icon right small
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

            <v-col sm="12" cols="12" class="child">
              <v-sheet class="px-2 py-2" elevation="3" style="">
                <v-container fluid class="mb-8" style="margin: 0; padding: 0">
                  <div style="background: #225b89" class="px-3 py-3">
                    <v-row no-gutters>
                      <v-col>
                        <h2 style="color: #fff">Latest Research</h2>
                      </v-col>
                      <v-col class="text-right mt-1">
                        <v-btn
                          outlined
                          small
                          color="white"
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
                <Research></Research>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>

        <!-- END: home components -->
      </div>
      <div v-if="result.error" class="text-center error apollo">
        {{ result.error }}
        <div class="text-center my-10">
          <router-link to="/login">LOGIN AGAIN</router-link>
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
    console.log(this.$myApp.config.timezone);
  },
  data() {
    return {
      GET_HOME,
      now: null,
      mergedEvents: () => [],
      eventLimit: this.$myApp.config.home.eventLimit,
      postLimit: this.$myApp.config.home.postLimit,
    };
  },
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
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
