<template>
  <div>
    <div v-if="error">
      <v-container>
        <v-row>
          <v-col class="text-center">
            <div class="apollo error">
              {{ error }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="px-4" v-if="!loading">
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
    <div v-if="loading">
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
    error: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped></style>
