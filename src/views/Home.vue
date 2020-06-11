<template>
  <div>
    <v-container fluid>
      <v-row class="mt-2">
        <v-col>
          <Featured></Featured>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col
          v-for="n in 2"
          :key="n"
          class="d-flex child-flex"
          md="6"
          cols="12"
        >
          <v-card
            class="mx-auto px-2 py-5"
            style="background: #ccc;"
            elevation="8"
          >
            <v-card-text>
              <div>Lorem markdownum</div>
              <h2 style="font-size: 24px; color: #333;" class="mt-3 mb-4">
                Request ICJIA Resources
              </h2>

              <div style="color: #333;">
                Request a conference room, laptop, or a rental car.
              </div>
            </v-card-text>

            <v-btn absolute dark fab bottom right color="blue darken-3">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-6">
        <v-col sm="12" md="6" cols="12" class="child">
          <v-sheet class="px-2 py-2" elevation="8" style="">
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
                        >calendar_today</v-icon
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
          <v-sheet class="py-2 px-2" elevation="8">
            <v-container fluid class="mb-8" style="margin: 0; padding: 0;">
              <div style="background: #225b89;" class="px-3 py-3">
                <v-row no-gutters>
                  <v-col>
                    <h2 style="color: #fff;">
                      Upcoming Events
                    </h2>
                  </v-col>
                  <v-col class="text-right mt-2">
                    <v-btn outlined x-small color="white" to="/news"
                      >all events&nbsp;<v-icon right x-small
                        >calendar_today</v-icon
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </v-container>
            <HomeEvents></HomeEvents>
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
