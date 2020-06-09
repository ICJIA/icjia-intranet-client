<template>
  <v-app id="page-top">
    <AppNav></AppNav>

    <v-content>
      <router-link to="/news/test-post-one">one</router-link> |
      <router-link to="/news/test-post-two">two</router-link>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
