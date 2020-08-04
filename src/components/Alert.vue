<template>
  <v-alert
    v-model="alert"
    close-text="Close Alert"
    dark
    class="mt-5 mx-1"
    :type="type"
    :dismissible="dismissable"
    v-if="!$myApp.config.underConstruction"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  data() {
    return {
      alert: true,
    };
  },
  props: {
    text: {
      type: String,
      default: "no text set",
    },
    type: {
      type: String,
      default: "info",
    },
    dismissable: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
