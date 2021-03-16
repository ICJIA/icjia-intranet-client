<template>
  <div>
    <v-container class="fill-height mt-8" style="background-color: #eee">
      <v-row class="fill-height" align="center" justify="center">
        <v-card class="px-8 py-8">
          <center v-if="showLogo">
            <v-img
              src="/icjia-logo.png"
              width="125"
              class="text-center"
              aria-label="ICJIA Logo"
            ></v-img>
          </center>
          <h1 class="text-center mt-5">{{ message }}</h1>

          <h2 class="text-center mt-3" style="color: #555">In the meantime:</h2>
          <div class="mt-4">
            <ul>
              <li>
                To reserve a conference room or request a vehicle, please
                contact
                <a href="mailto: john.klaer@illinois.gov">John Klaer</a>.
              </li>
              <li>
                For HR questions, please contact
                <a href="mailto: zina.smith@illinois.gov">Zina Smith</a>
              </li>
              <li>
                For technical support or laptop requests, please contact
                <a href="mailto: anthony.jenkins@illinois.gov"
                  >Anthony Jenkins</a
                >
              </li>
            </ul>
          </div>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: " The new ICJIA intranet is coming soon.",
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
