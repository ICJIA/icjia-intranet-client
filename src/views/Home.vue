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
          v-for="n in 4"
          :key="n"
          class="d-flex child-flex"
          md="3"
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
            <h2
              style="
                border-bottom: 2px solid #0d4474;
                padding-bottom: 8px;
                margin-bottom: 25px;
                color: #0d4474;
              "
            >
              News & Updates
            </h2>
            <HomePosts></HomePosts>
          </v-sheet>
        </v-col>
        <v-col sm="12" md="6" cols="12" class="child" style="height: 200px;">
          <v-sheet class="py-5 px-5" elevation="2">
            <h2
              style="
                border-bottom: 2px solid #0d4474;
                padding-bottom: 8px;
                margin-bottom: 25px;
                color: #0d4474;
              "
            >
              Events
            </h2>
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
  border-radius: 0px;
}
</style>
