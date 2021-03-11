<template>
  <v-container>
    <v-row>
      <v-col>
        <Claps :key="getPageID()" :pageID="getPageID()"></Claps>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { MD5 } from "@/utils";
export default {
  mounted() {
    console.log(process.env.NODE_ENV);
  },
  methods: {
    getPageID() {
      let url = this.$myApp.config.api.baseClient + this.$route.fullPath + "/";
      console.log(url + ": " + MD5(url));
      return MD5(url);
    },
  },
};
</script>

<style lang="scss" scoped></style>
