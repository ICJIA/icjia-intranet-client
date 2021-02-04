<template>
  <div>
    <!-- <div class="mb-2" style="font-size: 12px; color: #555; font-weight: bold">
      Show as:
    </div> -->
    <div>
      <v-btn-toggle v-model="icon" borderless>
        <v-btn value="list" small elevation="2">
          <span>List View</span>

          <v-icon right small>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn value="calendar" small elevation="2">
          <span>Calendar</span>

          <v-icon right small> calendar_today </v-icon>
        </v-btn>
      </v-btn-toggle>
      <div class="mt-5">
        <input
          type="checkbox"
          id="showHideFuture"
          name="showHideFuture"
          v-model="showHideFuture"
        />
        <label for="showHideFuture" aria-label="Show/Hide future events">
          Future events only</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "calendar",
      showHideFuture: false,
    };
  },
  mounted() {
    this.$emit("toggleEventView", this.icon);
    this.$emit("toggleFuture", this.showHideFuture);
  },
  watch: {
    icon(newValue, oldValue) {
      if (!newValue) {
        this.$emit("toggleEventView", oldValue);
      } else {
        this.$emit("toggleEventView", newValue);
      }
    },
    // eslint-disable-next-line no-unused-vars
    showHideFuture(newValue, oldValue) {
      // if (!newValue) {
      //   this.$emit("toggleFuture", oldValue);
      // } else {
      //   this.$emit("toggleFuture", newValue);
      // }
      this.$emit("toggleFuture", newValue);
      console.log(newValue);
    },
  },
};
</script>
