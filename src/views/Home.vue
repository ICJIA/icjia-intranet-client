<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <Featured></Featured>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-col
          v-for="n in 2"
          :key="n"
          class="d-flex child-flex"
          md="6"
          xs="12"
          sm="12"
        >
          <v-card class="mx-auto" color="white">
            <v-card-text>
              <div>Lorem markdownum</div>
              <p class="display-1 text--primary">
                rogat reminiscitur
              </p>
              <p>adjective</p>
              <div class="text--primary">
                Placuit manet deceptus, ira duris iuncta, rogat reminiscitur
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text style="color: #0d4474;">
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-col sm="12" md="6" cols="12" class="child">
          <v-sheet class="py-5 px-5" elevation="2">
            <v-container fluid class="mb-8">
              <v-row>
                <v-col>
                  <h2 style="color: #0d4474;">
                    News & Updates
                  </h2>
                </v-col>
                <v-col class="text-right mt-2">
                  <v-btn dark x-small color="indigo darken-3" to="/news"
                    >news archive</v-btn
                  >
                </v-col>
              </v-row>
              <div class="mt-3" style="border-bottom: 2px solid #0d4474;"></div>
            </v-container>

            <HomePosts></HomePosts>
          </v-sheet>
        </v-col>

        <v-col sm="12" md="6" cols="12">
          <v-sheet class="py-5 px-5" elevation="0">
            <v-container fluid class="mb-8">
              <v-row>
                <v-col>
                  <h2 style="color: #0d4474;">
                    Events
                  </h2>
                </v-col>
                <v-col class="text-right mt-2">
                  <v-btn dark x-small color="indigo darken-3" to="/events"
                    >calendar</v-btn
                  >
                </v-col>
              </v-row>
              <div class="mt-3" style="border-bottom: 2px solid #0d4474;"></div>
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
