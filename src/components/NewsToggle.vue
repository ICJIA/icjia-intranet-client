<template>
  <div>
    <div class="mb-2" style="font-size: 12px; color: #555; font-weight: bold">
      Show as:
    </div>
    <v-btn-toggle v-model="icon" borderless>
      <v-btn value="list" small elevation="2">
        <span>List</span>

        <v-icon right small>mdi-format-list-bulleted</v-icon>
      </v-btn>

      <v-btn value="block" small elevation="2">
        <span>Blocks</span>

        <v-icon right small> mdi-view-module </v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "block",
    };
  },
  watch: {
    icon(newValue, oldValue) {
      if (!newValue) {
        this.$emit("toggle", oldValue);
      } else {
        this.$emit("toggle", newValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
