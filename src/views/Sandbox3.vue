<template>
  <v-container class="grey lighten-5" fluid>
    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row fill-height>
      <v-col
        v-for="n in items"
        :key="n"
        cols="12"
        :sm="getWidth('sm')"
        :md="getWidth('md')"
        style="min-height: 150px;"
      >
        <v-card class="pa-2" outlined tile height="100%">
          <div v-if="n % 2">
            random text
          </div>
          <div v-else>
            Other text Other text Other text Other text Other text Other text
            Other text Other text Other text Other text Other text Other text
            Other text Other text
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: 2,
    };
  },
  methods: {
    getWidth() {
      if (this.$vuetify.breakpoint.xs) {
        return 12;
      } else if (this.$vuetify.breakpoint.sm) {
        if (this.items <= 1) {
          return 12;
        } else {
          return 6;
        }
      } else {
        if (this.items <= 1) {
          return 12;
        } else {
          if (this.items > 2) {
            return 4;
          } else {
            return 6;
          }
        }
      }
    },
  },
};
</script>
