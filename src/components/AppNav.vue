<template>
  <div>
    <v-app-bar app style="background: #fff" elevate-on-scroll>
      <v-app-bar-nav-icon
        @click="toggleDrawer"
        v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
      ></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <v-img
          alt="ICJIA Logo"
          class="shrink mr-2 hover"
          contain
          src="/icjia-logo.png"
          transition="scale-transition"
          width="70"
          style
          @click="
            $router.push('/').catch((err) => {
              $vuetify.goTo(0);
            })
          "
        />
      </div>
      <div
        @click="
          $router.push('/').catch((err) => {
            $vuetify.goTo(0);
          })
        "
        style="font-size: 24px; font-weight: bold; margin-left: 10px"
        class="hover"
      >
        INTRANET
      </div>
      <!-- {{ $store.state.auth.isAuthenticated }} -->
      <v-spacer></v-spacer>
      <!-- <v-btn small text to="/news" class="hidden-sm-and-down"
        >News & Updates</v-btn
      > -->

      <v-btn small text to="/tags/training/" class="hidden-sm-and-down"
        >Training</v-btn
      >
      <v-menu
        bottom
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            :class="{
              currentRoute:
                $route.path.includes('news') || $route.path.includes('social'),
            }"
            >News & updates<v-icon right small>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense elevation="2">
          <v-list-title style="font-weight: 900; font-size: 12px">
            ICJIA News & Updates
          </v-list-title>
          <div class="mb-2">&nbsp;</div>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/news/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title
                style="
                  font-size: 12px !important;
                  font-weight: 500;
                  color: #333;
                "
                >Intranet News Archive</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <div class="mt-3">&nbsp;</div>
          <v-list-title style="font-weight: 900; font-size: 12px">
            Social Media
          </v-list-title>
          <div class="mb-2">&nbsp;</div>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/social/facebook/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title
                style="
                  font-size: 12px !important;
                  font-weight: 500;
                  color: #333;
                "
                ><v-icon small left>fab fa-facebook</v-icon
                >Facebook</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/social/twitter/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title
                style="
                  font-size: 12px !important;
                  font-weight: 500;
                  color: #333;
                "
                ><v-icon small left>fab fa-twitter</v-icon
                >Twitter</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            href="https://www.youtube.com/IllinoisCriminalJusticeInformationAuthority"
          >
            <v-list-item-content class="hover">
              <v-list-item-title
                style="
                  font-size: 12px !important;
                  font-weight: 500;
                  color: #333;
                "
                ><v-icon small left>fab fa-youtube</v-icon
                >YouTube</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu
        bottom
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            :class="{ currentRoute: $route.path.includes('forms') }"
            >Web Forms <v-icon right small>arrow_drop_down</v-icon></v-btn
          >
        </template>
        <v-list nav dense elevation="2">
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/forms/conference/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >Conference Room reservation</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/forms/laptop/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >Laptop Request</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/forms/supplies/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >Office Supply Request</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/forms/support/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >Technical Support Request</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/forms/profile/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >User Profile</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu
        bottom
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            :class="{ currentRoute: $route.path.includes('documents') }"
            >Documents<v-icon right small>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense elevation="2">
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/documents/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >All Documents</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="appNav"
            @click="
              $router.push(`/documents/clusters/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >Document Groups</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            class="appNav"
            href="https://archive.icjia.cloud"
            target="_blank"
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >ICJIA Document Archive<v-icon right small
                  >open_in_new</v-icon
                ></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- <v-btn small text to="/units/" class="hidden-sm-and-down">Units</v-btn> -->

      <v-menu
        bottom
        offset-y
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            small
            text
            class="hidden-sm-and-down"
            v-bind="attrs"
            v-on="on"
            :class="{ currentRoute: $route.path.includes('units') }"
            >Units <v-icon right small>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense elevation="2">
          <v-list-item
            v-for="(unit, index) in $myApp.units"
            :key="`unitNav-${index}`"
            class="appNav"
            @click="
              $router.push(`${unit.path}`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >{{ unit.title }}&nbsp;({{
                  unit.shortname.toUpperCase()
                }})</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            @click="
              $router.push(`/units/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title style="font-size: 12px !important"
                >All units</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn small text to="/events/" class="hidden-sm-and-down">Events</v-btn>

      <v-btn icon to="/search" aria-label="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" aria-label="Action menu">
            <v-icon color="indigo darken-4">account_circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/forms/profile/">
            <v-list-item-title style="font-size: 12px !important"
              >Update Your Profile</v-list-item-title
            >
          </v-list-item>
          <v-list-item to="/forms/support/">
            <v-list-item-title style="font-size: 12px !important"
              >Contact Tech Support</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            href="https://dev.icjia-api.cloud/admin/"
            target="_blank"
          >
            <v-list-item-title style="font-size: 12px !important"
              >Intranet Administration</v-list-item-title
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item to="/login/">
            <v-list-item-title style="font-size: 12px !important"
              ><v-icon left color="indigo darken-2">no_accounts</v-icon
              >Logout</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  methods: {
    toggleDrawer() {
      EventBus.$emit("toggleDrawer");
      console.log("toggle drawer");
    },
  },
};
</script>

<style>
.appNav.v-list-item:hover {
  background: #ccc !important;
}

.currentRoute {
  background: #d8d8d8;
}
</style>
