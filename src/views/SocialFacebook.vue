<template>
  <div>
    <v-container class="mt-6">
      <v-row class="text-center">
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-sheet class="px-2 py-2" elevation="3" style="">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0">
              <div style="background: #225b89" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff">ICJIA on Facebook</h2>
                  </v-col>
                  <v-col class="text-right mt-1">
                    <v-btn small @click="facebookKey++"
                      >Refresh <v-icon right small>refresh</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>

            <Facebook :key="facebookKey"></Facebook>
          </v-sheet>
          <!--  -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      facebookKey: 0,
    };
  },
};
</script>

<style lang="scss" scoped></style>
