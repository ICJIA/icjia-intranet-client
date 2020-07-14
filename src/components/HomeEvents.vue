<template>
  <div>
    <div v-for="(event, index) in newEvents" :key="index + event.id">
      <v-card color="grey lighten-4" class="mb-5" elevation="0">
        <div class="d-flex flex-no-wrap">
          <div class="px-5" style="max-height: 150px;">
            <v-container fill-height>
              <v-row align="center" justify="center" fill-height>
                <v-col fill-height>
                  <span style="font-size: 14px; color: #666;">{{
                    event.start | month
                  }}</span
                  ><br />
                  <span
                    style="font-size: 26px; font-weight: 900; color: #0d4474;"
                    >{{ event.start | day }}</span
                  >
                </v-col>
              </v-row>
            </v-container>
          </div>

          <div style="border-left: 1px solid #ccc;">
            <div class="px-5 py-4">
              <!-- <div
                style="font-size: 12px; font-weight: 900; color: #777;"
                v-if="event.timed"
              >
                <span>{{ event.start | ChicagoTime }}</span>
                <span v-if="event.end">
                  to
                  <span>{{ event.end | ChicagoTime }}</span>
                </span>
              </div>
              <div
                v-else
                style="font-size: 12px; font-weight: 900; color: #777;"
              >
                <span>ALL DAY</span>
              </div> -->
              <div style="font-size: 12px; font-weight: 900; color: #777;">
                {{ getRange(event.start, event.end, event.timed) }}
              </div>
              <h2>{{ event.name }}</h2>

              <v-card-subtitle>{{ event.summary }}</v-card-subtitle>

              <div
                class="hover readMore"
                @click.prevent="event.show = !event.show"
              >
                <span v-if="!event.show">
                  Show details...
                </span>
                <span v-else>
                  Hide details
                </span>
              </div>
              <!-- <v-btn small @click.native="event.show = !event.show"
                >Full description</v-btn
              > -->
              <v-slide-y-transition>
                <div class="py-3 mt-2" v-show="event.show">
                  <div class="mt-2 pl-5">
                    {{ event.details }}
                  </div>
                </div>
              </v-slide-y-transition>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    {{ newEvents }}
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
      let localStart = moment(start).tz("America/Chicago");
      let localEnd = moment(end).tz("America/Chicago");
      let daysBetween = moment(localEnd).diff(moment(localStart), "days");

      if (daysBetween === 0 && timed) {
        range = `${localStart.format("h:mm:ss a")} to ${localEnd.format(
          "h:mm:ss a"
        )}`;
      } else if (daysBetween === 0 && !timed) {
        range = ``;
      } else if (daysBetween > 0) {
        range = `through ${localEnd.format(" MMMM D YYYY")}`;
      }
      return range;
    },
  },
  created() {
    this.newEvents = this.events.map((events) => ({
      ...events,
      show: false,
    }));
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
