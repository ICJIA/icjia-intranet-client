<template>
  <div>
    <div v-for="(event, index) in events" :key="index + event.id">
      <v-card color="grey lighten-4" class="mb-5" elevation="0">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="text-center px-8 py-4">
            <span style="font-size: 14px; color: #666;">June</span><br />
            <span style="font-size: 26px; font-weight: 900; color: #0d4474;"
              >23</span
            >
            <!-- <div style="font-size: 12px;">{{ event.start | timeFormat }}</div> -->
          </div>

          <div style="border-left: 1px solid #ccc;">
            <div class="px-5 py-2">
              <div style="font-size: 12px;">
                <span>{{ event.start | ChicagoTime }}</span>
                <span v-if="event.end">
                  to
                  <span>{{ event.end | ChicagoTime }}</span>
                </span>
              </div>
              <h2>title here</h2>

              <v-card-subtitle
                >pasdpas dpasd pasd pasod pasdopsaodak sd;aksdkasd lkasld
                kalsdkla skdlaksdlaskd laskd las dlak sd</v-card-subtitle
              >
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
