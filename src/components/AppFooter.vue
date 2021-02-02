<template>
  <v-footer dark color="#113959" height="auto">
    <v-card
      flat
      tile
      fixed
      class="text-center pt-0 pb-2"
      style="width: 100% !important"
      color="#113959"
    >
      <v-card-text
        class="pt-2 pb-2 mt-2"
        color="#113959"
        style="font-size: 12px"
      >
        &copy;&nbsp;
        <a href="http://icjia.illinois.gov" style="background: none">
          {{ year }}
          Illinois Criminal Justice Information Authority </a
        >&nbsp;|&nbsp;
        <router-link to="/web-support/" style="background: none"
          >Contact ICJIA Web Support</router-link
        >&nbsp;|&nbsp;
        <a
          href="https://github.com/ICJIA/icjia-intranet-client"
          style="background: none"
          ><v-icon size="12px" class="ml-0">fab fa-github</v-icon>
          {{ info.version }}
        </a>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
const info = require("../../package.json");
export default {
  data: () => ({
    icons: ["fab fa-github"],
    info: info,
  }),
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
a {
  color: #eee !important;
}
a:hover {
  color: #aaa !important;
}
</style>
