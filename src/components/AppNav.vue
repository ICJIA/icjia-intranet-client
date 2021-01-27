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
      <v-btn small text to="/news" class="hidden-sm-and-down"
        >News & Updates</v-btn
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
            :class="{ currentRoute: $route.path.includes('forms') }"
            >Forms <v-icon right small>arrow_drop_down</v-icon></v-btn
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
            >Documents & Resources <v-icon right small>arrow_drop_down</v-icon>
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
                >All</v-list-item-title
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
                >Groups</v-list-item-title
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
                >List All units</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn small text to="/events/" class="hidden-sm-and-down">Events</v-btn>

      <v-btn icon to="/search" aria-label="search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" aria-label="Action menu">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/login">
            <v-list-item-title>Logout</v-list-item-title>
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
