<template>
  <div class="text-center my-12">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="size"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  mounted() {},
  props: {
    size: {
      type: String,
      default: "50",
    },
  },
};
</script>

<style lang="scss" scoped></style>
