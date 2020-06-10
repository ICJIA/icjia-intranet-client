<template>
  <v-app id="page-top">
    <AppNav></AppNav>

    <v-content>
      <!-- <div class="mt-3 text-center">
        <router-link to="/">Home</router-link> |
        <router-link to="/news/test-post-one">One</router-link> |
        <router-link to="/news/test-post-two">Two</router-link>
      </div> -->
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
