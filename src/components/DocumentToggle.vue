<template>
  <div>
    <v-btn-toggle v-model="documentToggle" color="blue darken-4" elevation="2">
      <v-btn small class="px-5" elevation="2">
        All
        <!-- <v-icon right>done_all</v-icon> -->
      </v-btn>

      <v-btn small class="px-5" elevation="2">
        Files
        <!-- <v-icon right>cloud_download</v-icon> -->
      </v-btn>

      <v-btn small class="px-5" elevation="2">
        Links
        <!-- <v-icon right>open_in_new</v-icon> -->
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  watch: {
    documentToggle(newValue) {
      if (newValue === 0) {
        EventBus.$emit("toggleDocuments", "all");
      }

      if (newValue === 1) {
        EventBus.$emit("toggleDocuments", "files");
      }

      if (newValue === 2) {
        EventBus.$emit("toggleDocuments", "links");
      }
    },
  },
  data() {
    return {
      documentToggle: 0,
    };
  },
};
</script>

<style lang="scss" scoped></style>
