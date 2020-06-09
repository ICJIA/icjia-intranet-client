<template>
  <div>
    {{ $route.params.slug }}
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style lang="scss" scoped></style>
