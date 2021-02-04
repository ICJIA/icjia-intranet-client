<template>
  <div>
    <v-container class="mt-6">
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="10">
          <v-sheet class="px-2 py-2" elevation="3" style="">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0">
              <div style="background: #225b89" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff">ICJIA on Twitter</h2>
                  </v-col>
                  <v-col class="text-right mt-1">
                    <v-btn
                      outlined
                      small
                      target="_blank"
                      href="https://twitter.com/ICJIA_Illinois"
                      >Twitter&nbsp;<v-icon right small
                        >open_in_new</v-icon
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>

            <!-- <Timeline
              id="ICJIA_Illinois"
              sourceType="profile"
              :options="{ tweetLimit: '15' }"
            /> -->
            <Twitter></Twitter>
          </v-sheet>
          <div class="mt-4 text-center" style="font-size: 12px">
            Timeline not appearing?
            <a
              href="https://intranet.icjia.cloud/social/twitter/"
              style="background: none"
              >Refresh this page.</a
            >
          </div>
          <!--  -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { Tweet, Moment, Timeline } from "vue-tweet-embed";
export default {
  // components: {
  //   Timeline,
  // },
};
</script>

<style lang="scss" scoped></style>
