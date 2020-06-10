<template>
  <div>
    <v-app-bar app dense color="grey darken-3" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2 hover"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
          @click="
            $router.push('/').catch((err) => {
              $vuetify.goTo(0);
            })
          "
        />

        <div
          style="font-size: 28px; font-weight: bold;"
          class="hover"
          @click="
            $router.push('/').catch((err) => {
              $vuetify.goTo(0);
            })
          "
        >
          ICJIA
        </div>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
