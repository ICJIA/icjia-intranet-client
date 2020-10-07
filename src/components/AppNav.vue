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
      <v-btn small text to="/documents" class="hidden-sm-and-down"
        >Documents</v-btn
      >
      <v-btn small text to="/support" class="hidden-sm-and-down"
        >Technical Support</v-btn
      >
      <v-btn small text to="/calendar" class="hidden-sm-and-down"
        >Calendar</v-btn
      >

      <v-btn icon>
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

<style lang="scss" scoped></style>
