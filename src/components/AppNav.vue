<template>
  <div>
    <v-app-bar app style="background: #fff" elevate-on-scroll>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
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
      <v-btn small text to="/forms" class="hidden-sm-and-down">Forms</v-btn>
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
            >Documents <v-icon right small>arrow_drop_down</v-icon>
          </v-btn>
        </template>
        <v-list nav dense elevation="2">
          <v-list-item
            @click="
              $router.push(`/documents/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title>All</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="
              $router.push(`/documents/clusters/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title>Grouped</v-list-item-title>
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
            @click="
              $router.push(`${unit.path}`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            <v-list-item-content class="hover">
              <v-list-item-title>{{ unit.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn small text to="/calendar" class="hidden-sm-and-down"
        >Calendar</v-btn
      >

      <v-btn icon to="/search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
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
export default {};
</script>

<style>
.v-item--active {
  background: #fff !important;
}
.v-list-item:hover {
  background: #ccc !important;
}

.currentRoute {
  background: #d8d8d8;
}
</style>
