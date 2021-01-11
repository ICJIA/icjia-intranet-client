<template>
  <div>
    <Breadcrumb :key="$route.path" title="Events"></Breadcrumb>
    <v-container fluid>
      <v-row class="fill-height">
        <v-col>
          <div v-if="$apollo.error" class="text-center error apollo">
            {{ error }}
          </div>
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
              :events="currentEvents"
              :event-color="getEventColor"
              :type="type"
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
                <!-- <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title
                    :id="`event-title-${selectedEvent.id}`"
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>

                  <v-btn x-small outlined @click="selectedOpen = false"
                    >CLOSE</v-btn
                  >
                </v-toolbar> -->

                <EventCard
                  :item="selectedEvent"
                  :hideClusters="true"
                  @clicked="selectedOpen = false"
                ></EventCard>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { GET_EVENTS } from "@/graphql/queries/events";

import NProgress from "nprogress";
const moment = require("moment");
const tz = require("moment-timezone");
export default {
  data: () => ({
    focus: "",
    error: "",
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
    currentEvents: [],
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
  }),
  created() {
    NProgress.start();
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  apollo: {
    events: {
      query: GET_EVENTS,
      variables() {},
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        this.currentEvents = this.events.map((event) => {
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
          return event;
        });
        NProgress.done();
      },
    },
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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

    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    closeEvent() {
      console.log("click", this.selectedOpen);
    },
  },
};
</script>
