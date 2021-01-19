<template>
  <div>
    <div v-if="timeIntervals">
      {{ timeIntervals }}
    </div>
  </div>
</template>

<script>
import { generateHours } from "@/services/Utils";
export default {
  data() {
    return {
      timeIntervals: null,
    };
  },
  mounted() {
    this.timeIntervals = generateHours();
  },
};
</script>

<style lang="scss" scoped></style>
