<template>
  <div>
    <div v-if="!newEvents.length">
      <v-card
        color="grey lighten-5"
        class="mb-5 text-center py-5"
        elevation="0"
      >
        <h2>No upcoming events</h2></v-card
      >
    </div>
    <div v-for="(event, index) in newEvents" :key="index + event.id" v-else>
      <v-card
        color="grey lighten-4"
        class="mb-5 hover event-card"
        elevation="0"
        style="border: 1px solid #aaa"
        @click="$router.push(`/events/${event.slug}/`)"
      >
        <div class="d-flex flex-no-wrap" style>
          <div class="px-5" style="max-height: 150px">
            <v-container fill-height>
              <v-row
                align="center"
                justify="center"
                fill-height
                style="width: 80px"
              >
                <v-col
                  fill-height
                  class="text-center hover"
                  @click.prevent="event.show = !event.show"
                >
                  <span style="font-size: 14px; color: #222; font-weight: 900">
                    {{ event.start | shortMonth }}
                  </span>
                  <br />
                  <span
                    style="font-size: 26px; font-weight: 900; color: #0d4474"
                    >{{ event.start | day }}</span
                  >
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div
            style="
              border-left: 1px solid #ccc;
              background: #fafafa;
              width: 100% !important;
            "
          >
            <div class="px-5 py-6">
              <div style="font-size: 12px; font-weight: 900; color: #222">
                <span style="color: #333">{{ event.type | upperCase }}</span>
                {{ getRange(event.start, event.end, event.timed) }}
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
</template>

<script>
/* eslint-disable no-unused-vars */
const moment = require("moment");
const tz = require("moment-timezone");
export default {
  methods: {
    getRange(start, end, timed) {
      let range;
      let localStart = moment(start).tz(this.$myApp.config.timezone);
      let localEnd = moment(end).tz(this.$myApp.config.timezone);
      let daysBetween = moment(localEnd).diff(moment(localStart), "days");

      if (daysBetween === 0 && timed) {
        range = ` | ${localStart.format("h:mm a")} to ${localEnd.format(
          "h:mm a"
        )}`;
      } else if (daysBetween === 0 && !timed) {
        range = ` | All Day`;
      } else if (daysBetween > 0) {
        range = ` | ${localStart.format("MMMM D")} through ${localEnd.format(
          "MMMM D"
        )}`;
      }
      return range;
    },
  },
  created() {
    this.newEvents = this.events.map((events) => ({
      ...events,
      show: false,
    }));
    // console.log(this.newEvents.length);
  },
  data() {
    return {
      newEvents: [],
    };
  },

  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.readMore {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.readMore:hover {
  color: #777;
}
</style>
