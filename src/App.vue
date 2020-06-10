<template>
  <v-app id="page-top" style="background: #eee;">
    <AppNav v-if="$store.state.auth.isAuthenticated"></AppNav>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  /* eslint-disable no-unused-vars */
  name: "App",
  mounted() {},

  components: {},

  data: () => ({
    //
  }),
};
</script>
