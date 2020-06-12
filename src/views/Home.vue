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
            elevation="3"
          >
            <v-card-text>
              <div>Lorem markdownum</div>
              <h2 style="font-size: 24px; color: #333;" class="mt-3 mb-4">
                ICJIA Online Forms
              </h2>

              <div style="color: #333;">
                Request a conference room, laptop, or rental car.
              </div>
            </v-card-text>

            <!-- <v-btn absolute dark fab bottom right color="#0D4474">
              <v-icon>more_vert</v-icon>
            </v-btn> -->
            <v-menu
              right
              top
              offset-y
              nudge-left="70"
              nudge-bottom="30"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="blue darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3">
                <v-list-item v-for="n in 4" :key="n">
                  <v-list-item-title style="font-size: 12px;"
                    >Form {{ n }}</v-list-item-title
                  >
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item-title
                  style="font-size: 12px; font-weight: bold; color: #aaa;"
                  class="py-2 text-center"
                  >All forms</v-list-item-title
                >
              </v-list>
            </v-menu>
          </v-card>
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
