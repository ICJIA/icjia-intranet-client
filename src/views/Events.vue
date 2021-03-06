<template>
  <div>
    <Breadcrumb :key="$route.path" title="Events"></Breadcrumb>
    <v-container v-if="$apollo.loading">
      <v-row>
        <v-col class="text-center">
          <Loader loadingText="Loading events..."></Loader>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-if="!$apollo.loading"
      :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
    >
      <v-row class="fill-height" v-if="display">
        <v-col>
          <div v-if="$apollo.error" class="text-center error apollo">
            {{ error }}
            <div>Please <a href="/login">login again</a>.</div>
          </div>

          <div class="text-center mb-10">
            <h1 class="mb-6">ICJIA Events</h1>
            <EventToggle
              @toggleEventView="toggleEventView"
              @toggleUpcoming="toggleUpcoming"
            ></EventToggle>
          </div>

          <div v-show="display === 'calendar'">
            <v-sheet height="64" elevation="3" v-if="!$apollo.loading">
              <v-toolbar flat color="white">
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                  >Today</v-btn
                >
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">{{
                  $refs.calendar.title
                }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right>mdi-menu-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet>
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="filteredEvents"
                :event-color="getEventColor"
                :type="type"
                @change="change"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                style="min-height: 100vh !important"
              ></v-calendar>
              <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                offset-x
              >
                <v-card color="grey lighten-4" min-width="250px" flat>
                  <EventCard
                    :item="selectedEvent"
                    @clicked="selectedOpen = false"
                  ></EventCard>
                </v-card>
              </v-menu>
            </v-sheet>
          </div>
          <div v-show="display === 'list'">
            <div
              v-for="(event, index) in filteredEvents"
              :key="index + event.id"
            >
              <v-card
                color="grey lighten-4"
                class="mb-5 hover card"
                elevation="0"
                style="border: 1px solid #bbb"
                @click="$router.push(`/events/${event.slug}/`)"
                data-aos="fade-up"
                data-aos-offset="100"
                data-aos-delay="0"
              >
                <div class="d-flex flex-no-wrap" style="border: 1px solid #bbb">
                  <div
                    class="px-5 hidden-sm-and-down"
                    style="max-height: 150px"
                  >
                    <v-container fill-height>
                      <v-row
                        align="center"
                        justify="center"
                        fill-height
                        style="width: 100px"
                      >
                        <v-col
                          fill-height
                          class="text-center hover"
                          @click.prevent="event.show = !event.show"
                        >
                          <span
                            style="
                              font-size: 14px;
                              color: #222;
                              font-weight: 900;
                            "
                          >
                            {{ event.start | shortMonth }}
                          </span>
                          <br />
                          <span
                            style="
                              font-size: 22px;
                              font-weight: 900;
                              color: #0d4474;
                            "
                            >{{ event.start | day }}</span
                          ><span
                            style="
                              font-size: 22px;
                              font-weight: 900;
                              color: #0d4474;
                            "
                            v-if="
                              isItMultiday(event.start, event.end, event.timed)
                            "
                          >
                            - {{ event.end | day }}
                          </span>
                          <div
                            style="font-size: 12px"
                            v-if="
                              !isItMultiday(event.start, event.end, event.timed)
                            "
                          >
                            {{ event.start | dayName }}
                          </div>
                          <div v-else style="font-size: 12px">
                            {{ event.start | dayName }} --
                            {{ event.end | dayName }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>

                  <div
                    style="border-left: 1px solid #ccc; width: 100% !important"
                    :class="{
                      'event-border':
                        $vuetify.breakpoint.md ||
                        $vuetify.breakpoint.lg ||
                        $vuetify.breakpoint.xl,
                    }"
                  >
                    <div class="px-5 py-6">
                      <div
                        style="font-size: 12px; font-weight: 900; color: #222"
                      >
                        <span style="color: #333">{{
                          event.type | upperCase
                        }}</span>
                        <span
                          v-html="getRange(event.start, event.end, event.timed)"
                        ></span>
                      </div>
                      <h2 class="mt-2 hover">
                        {{ event.name }}
                      </h2>

                      <v-card-subtitle>{{ event.summary }}</v-card-subtitle>

                      <div class="hover readMore text-right"></div>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </div>
          <div
            class="text-right mt-3"
            style="font-size: 12px; font-weight: 400"
          >
            For access to the FSGU Project Calendar, please
            <a href="https://calendar.icjia.cloud" target="_blank">click here</a
            >.
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { GET_EVENTS } from "@/graphql/queries/events";
import { fixButtonText } from "@/a11y";

// import NProgress from "nprogress";
const moment = require("moment");
const tz = require("moment-timezone");
import { EventBus } from "@/event-bus";
export default {
  watch: {
    isLoading(newValue, oldValue) {
      console.log(newValue, oldValue);
      // if (!newValue) {
      //   this.a11yfixes();
      // }
    },
  },
  data: () => ({
    focus: "",
    error: "",
    upcomingOnly: true,
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedID: null,
    selectedOpen: false,
    filteredEvents: [],
    display: "calendar",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    eventKicker: "",
    isLoading: true,
  }),
  created() {
    window.NProgress.start();
  },
  async mounted() {
    if (this.$refs.calendar) {
      this.$refs.calendar.checkChange();
    }
  },
  updated() {
    //console.log("updated");
    if (this.$refs.calendar) {
      this.$refs.calendar.checkChange();
    }
  },
  apollo: {
    events: {
      query: GET_EVENTS,
      variables() {},
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.events = this.events.map((event) => {
          event.start = moment(event.start)
            .tz(this.$myApp.config.timezone)
            .toDate();
          event.end = moment(event.end)
            .tz(this.$myApp.config.timezone)
            .toDate();
          //console.log(this.$myApp.config.events[event.type]["color"]);
          if (this.$myApp.config.events[event.type]) {
            event.color = this.$myApp.config.events[event.type]["color"];
          } else {
            event.color = "grey darken-4";
          }
          //event.color = this.colors[this.rnd(0, this.colors.length - 1)];
          event.show = false;
          return event;
        });
        //this.filteredEvents = this.events;

        this.filterUpcoming();
        this.isLoading = false;
        window.NProgress.done();
      },
    },
  },
  methods: {
    async change() {
      console.log("change here");
      await this.$nextTick();
      this.a11yfixes();
    },
    a11yfixes() {
      console.log("a11y fixes here");
      fixButtonText("mdi-chevron-right", "Click to move forward");
      fixButtonText("mdi-chevron-left", "Click to move previous");
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    toggleEventView(val) {
      this.display = val;
    },
    filterUpcoming() {
      let now = new Date();
      this.filteredEvents = this.events.filter((event) => {
        if (event.end >= now) {
          return event;
        }
      });
    },
    toggleUpcoming(val) {
      console.log("upcoming only: ", val);

      if (val) {
        this.filterUpcoming();
      } else {
        this.filteredEvents = this.events;
      }
      this.$refs.calendar.checkChange();
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        // console.log(event.id);
        // this.$vuetify.goTo(`#page-top`);
        this.selectedEvent = event;
        this.selectedID = event.id;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
        //this.$vuetify.goTo(`#event-title-${this.selectedID}`);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
        console.log("event-id: ", this.selectedID);
      }

      nativeEvent.stopPropagation();
    },
    getRange(start, end, timed) {
      let range;
      let localStart = moment(start).tz(this.$myApp.config.timezone);
      let localEnd = moment(end).tz(this.$myApp.config.timezone);
      let daysBetween = moment(localEnd).diff(moment(localStart), "days");

      if (daysBetween === 0 && timed) {
        range = ` | ${localStart.format("h:mm a")} to ${localEnd.format(
          "h:mm a"
        )} | <span style='font-weight: 400'>${localStart.format(
          "MMMM DD, YYYY"
        )}</span>`;
      } else if (daysBetween === 0 && !timed) {
        range = ` | All Day  | <span style='font-weight: 400'>${localStart.format(
          "MMMM DD, YYYY"
        )}</span>`;
      } else if (daysBetween > 0) {
        range = ` | <span style='font-weight: 400'>${localStart.format(
          "MMMM D"
        )}</span> <span style='font-weight: 400'>through</span> <span style='font-weight: 400'>${localEnd.format(
          "MMMM D, YYYY"
        )}</span>`;
      }
      return range;
    },

    isItMultiday(start, end, timed) {
      let range;
      let localStart = moment(start).tz(this.$myApp.config.timezone);
      let localEnd = moment(end).tz(this.$myApp.config.timezone);
      let daysBetween = moment(localEnd).diff(moment(localStart), "days");
      let isItMultiday;

      if (daysBetween > 0) {
        isItMultiday = true;
      } else {
        isItMultiday = false;
      }

      return isItMultiday;
    },

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    closeEvent() {
      console.log("click", this.selectedOpen);
    },
  },
};
</script>
