<template>
  <div>
    <v-btn-toggle v-model="documentToggle" color="blue darken-4">
      <v-btn x-small>
        All
        <v-icon x-small right>done_all</v-icon>
      </v-btn>

      <v-btn x-small>
        Files
        <v-icon x-small right>file_present</v-icon>
      </v-btn>

      <v-btn x-small>
        Links
        <v-icon x-small right>link</v-icon>
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
