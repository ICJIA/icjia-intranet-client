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
        style="border: 0px solid #eee"
        @click="$router.push(`/events/${event.slug}/`)"
        data-aos="fade-up"
        data-aos-offset="100"
        data-aos-delay="0"
      >
        <div class="d-flex flex-no-wrap" style="border: 1px solid #ddd">
          <div class="px-5 hidden-sm-and-down" style="max-height: 150px">
            <v-container fill-height>
              <v-row
                align="center"
                justify="center"
                fill-height
                style="width: 110px"
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
                    style="font-size: 22px; font-weight: 900; color: #0d4474"
                    >{{ event.start | day }}</span
                  ><span
                    style="font-size: 22px; font-weight: 900; color: #0d4474"
                    v-if="isItMultiday(event.start, event.end, event.timed)"
                  >
                    - {{ event.end | day }}
                  </span>
                  <div
                    style="font-size: 12px"
                    v-if="!isItMultiday(event.start, event.end, event.timed)"
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
            style="background: #fafafa; width: 100% !important"
            :class="{
              'event-border':
                $vuetify.breakpoint.md ||
                $vuetify.breakpoint.lg ||
                $vuetify.breakpoint.xl,
            }"
          >
            <div class="px-5 py-6">
              <div style="font-size: 12px; font-weight: 900; color: #222">
                <span style="color: #333">{{ event.type | upperCase }}</span>
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

.event-border {
  border-left: 1px solid #ccc;
}
</style>
