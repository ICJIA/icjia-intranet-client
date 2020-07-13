<template>
  <div>
    <div v-for="(event, index) in events" :key="index + event.id">
      <v-card color="grey lighten-4" class="mb-5" elevation="0">
        <div class="d-flex flex-no-wrap">
          <div class="px-5">
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
              <div
                style="font-size: 12px; font-weight: 900; color: #777;"
                v-if="!event.allDay"
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
              </div>
              <h2>{{ event.name }}</h2>

              <v-card-subtitle>{{ event.summary }}</v-card-subtitle>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    {{ events }}
  </div>
</template>

<script>
// import moment from "moment";
export default {
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped></style>
