<template>
  <div>
    <div class="px-4" v-if="!loading">
      <slot name="title"></slot>
      <slot name="error"></slot>
      <slot name="content"></slot>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col>
            <loader></loader>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    //console.log(this.$browserDetect.isIE);
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
