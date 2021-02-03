<template>
  <div>
    <v-btn-toggle v-model="icon" borderless>
      <v-btn value="list" small>
        <span class="hidden-sm-and-down">List</span>

        <v-icon right small>mdi-format-list-bulleted</v-icon>
      </v-btn>

      <v-btn value="block" small>
        <span class="hidden-sm-and-down">Block</span>

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
