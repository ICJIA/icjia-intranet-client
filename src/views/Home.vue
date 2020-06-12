<template>
  <div>
    <v-container fluid>
      <v-row class="mt-2">
        <v-col>
          <Featured></Featured>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <HomeQuickBoxes></HomeQuickBoxes>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col sm="12" md="6" cols="12" class="child">
          <v-sheet class="px-2 py-2" elevation="3" style="">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0;">
              <div style="background: #225b89;" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff;">
                      News & Updates
                    </h2>
                  </v-col>
                  <v-col class="text-right mt-2">
                    <v-btn outlined x-small color="white" to="/news"
                      >news archive&nbsp;<v-icon right x-small
                        >view_headline</v-icon
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>

            <HomePosts></HomePosts>
          </v-sheet>
        </v-col>

        <v-col sm="12" md="6" cols="12">
          <v-sheet class="py-2 px-2" elevation="3">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0;">
              <div style="background: #225b89;" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff;">
                      Upcoming Events
                    </h2>
                  </v-col>
                  <v-col class="text-right mt-2">
                    <v-btn outlined x-small color="white" to="/calendar"
                      >calendar&nbsp;<v-icon right x-small>today</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>
            <HomeEvents></HomeEvents>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-sheet class="py-2 px-2" elevation="3">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0;">
              <div style="background: #225b89;" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff;">
                      Latest ICJIA Research
                    </h2>
                  </v-col>
                  <v-col class="text-right mt-2">
                    <v-btn
                      outlined
                      x-small
                      color="white"
                      href="https://icjia.illinois.gov/researchhub"
                      target="_blank"
                      >ResearchHub&nbsp;<v-icon right x-small
                        >open_in_new</v-icon
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>
            <Research></Research>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script></script>

<style>
.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  border-radius: 0px !important;
}
</style>
