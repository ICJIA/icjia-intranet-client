<template>
  <div class="text-center my-12" :style="{ 'min-height': `${height}px` }">
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
    height: {
      type: String,
      default: "550",
    },
  },
};
</script>

<style lang="scss" scoped></style>
