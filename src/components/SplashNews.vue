<template>
  <div>
    <v-container fluid>
      <v-img
        :src="`${$myApp.config.api.base}${splash.large.url}`"
        :lazy-src="`${$myApp.config.api.base}${splash.thumbnail.url}`"
        max-height="450"
        style="object-fit: cover !important"
      ></v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    splash: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
