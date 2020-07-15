<template>
  <v-container fluid>
    <v-row class="fill-height">
      <v-col>
        <div v-if="$apollo.error" class="text-center error apollo">
          {{ error }}
        </div>
        <v-sheet height="64" elevation="3" v-if="!$apollo.loading">
          <v-toolbar flat color="white">
            <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday"
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
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
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
                <!-- <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item> -->
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
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
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <!-- <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn> -->
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false"
                  >Cancel</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
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
    let now = moment().tz("America/Chicago");
    console.log("now " + now.toString());
    console.log("start " + now.startOf("day").toString());
    console.log("end " + now.endOf("day").toString());
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
          event.start = moment(event.start).tz("America/Chicago").toDate();
          event.end = moment(event.end).tz("America/Chicago").toDate();
          event.color = this.colors[this.rnd(0, this.colors.length - 1)];
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
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      console.log(this.events);
      // let events = [
      //   {
      //     name: "Event 1",
      //     start: "2020-07-13T13:30:00.216Z",
      //     end: "2020-07-13T22:00:00.000Z",
      //     timed: false,
      //     // color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     details:
      //       "\nLorem markdownum vertuntur statuo. Tu auro deceperat obsessae sustinet arcus, coma manet, inque, quae premeret sic; caput quo pomaria. Ire pater, lucis genas creatus silentum, luctus terras nescio.\n\nSuperabat ferunt ignipedum imitetur, et frustra et Bacchi adimunt? Muta dixit Romuleae me venit corpore, ab hanc adii quod digitis tecta poterentur. Inferias pietate laniaverat illi liquidus ferrum ei fata atavosque me aer sublimes temptare. In axis, incipere quem tum et Tiberinus succinctae teneo, monumentis.\n",
      //   },
      //   {
      //     name: "Event 2",
      //     start: "2020-07-16T13:30:00.000Z",
      //     end: "2020-07-16T14:30:00.000Z",
      //     timed: true,
      //     //color: this.colors[this.rnd(0, this.colors.length - 1)],
      //     details:
      //       "Lorem markdownum nocti Eurynomes contigit maxima aristas sacerdos sanguine putes, harenae solebat dum atque freta adfuit. Montes concutit cruorem.\n\nMors bene victrix, quae lingua non nomen sub, ales sed aquas femina inerti et inter et. Hostem vocabitur ecce, ubi oblitis haec gratamque facite quid.\n\nNec pestifer nigri, inmensum prohibet carmina ubi facundia voce; Neleius cognataque. Pleno meritos avidos flentibus bracchia tu factus civilia usu! Quo Iovis ululatibus, Troiana in monitu, lucis dedit ea movit spoliisque Pandione luctu uni; est et infelix. Sedes perque est auras mora tegumenque torrem pariter nimiumque similisque, me qui mota et pectoraque bello partes. Quoque iam Halesi pecus ergo in cum infestae Astraea utque?\n\n## Est delubris in hederae ibimus Laelapa adsumit\n\nFestam amor, te vidi proxima, illic et penates sonat dixit traxit tantaeque abiit strictis imago. Ad enim tela gravitas Thisbes Ianthe vidisse imago enim rogus per. Excussae quod Autonoe, reponunt casus.\n\nMurmura oculosque luces et, laudatos Phocaico sit altera in sublimia faveas reducere boum octonis: guttura. Recidendum boves se a corpore morari quamquam aquarum: vir nodosque este tutus? Licet furoris iaculante flamma arboris, sistere moderato qui aut.\n\n",
      //   },
      // ];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>
