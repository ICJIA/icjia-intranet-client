<template>
  <div>
    <div v-if="error">
      <v-container>
        <v-row>
          <v-col class="text-center">
            <div class="apollo error">
              {{ error }}
              <div class="text-center my-10">
                <router-link to="/logout">LOGOUT</router-link>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div class="px-4" v-if="!loading">
      <slot name="readingProgress"></slot>
      <slot name="title"></slot>
      <slot name="postedMeta"></slot>
      <slot name="splash"></slot>
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
      default: "",
    },
  },
};
</script>

<style scoped></style>
