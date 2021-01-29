<template>
  <v-app id="page-top" style="background: #eee">
    <AppNav v-if="$store.state.auth.isAuthenticated"></AppNav>
    <AppSidebar></AppSidebar>

    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        small
        bottom
        dark
        right
        color="#088078"
        transition="scale-transition"
        @click="toTop"
        aria-label="Click to scroll to top"
        v-if="!$route.meta.hideScrollButton"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-main>
      <span v-if="!$myApp.config.underConstruction">
        <ApolloQuery
          :query="GET_ALERT"
          notifyOnNetworkStatusChange
          v-if="!$route.meta.hideAlert"
        >
          <template slot-scope="{ result }">
            <div v-if="result.error" class="text-center error apollo">
              {{ result.error }}
            </div>
            <div v-if="!isLoading(result.loading) && !result.error">
              <Alert
                :type="result.data.home.alert.alertType"
                :text="result.data.home.alert.text"
                :dismissable="result.data.home.alert.dismissable"
                v-if="result.data.home.alert"
              ></Alert>
            </div>
          </template>
        </ApolloQuery>
        <transition name="fade" mode="out-in">
          <router-view
            class="pb-12"
            style="min-height: 100vh !important"
          ></router-view>
        </transition>
      </span>
      <span v-else>
        <ComingSoon></ComingSoon>
      </span>
      <AppFooter v-if="$store.state.auth.isAuthenticated"></AppFooter>
    </v-main>
  </v-app>
</template>

<script>
import { GET_ALERT } from "@/graphql/queries/alert.js";
import NProgress from "nprogress";
export default {
  /* eslint-disable no-unused-vars */
  name: "App",
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      //console.log(to, from);
    },
  },
  mounted() {},

  components: {},

  data: () => ({
    fab: false,
    GET_ALERT,
  }),
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },

    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 100;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.container.full-width {
  width: 100%;
  padding: 0px !important;
}
body:not(.page-form) .grecaptcha-badge {
  display: none;
}
</style>
