<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <Featured></Featured>
        </v-col>
      </v-row>
      <v-row class="masonry">
        <v-col md="6" class="child">
          <v-sheet class="py-5 px-5" elevation="2">
            <h2
              style="
                border-bottom: 2px solid #666;
                padding-bottom: 8px;
                margin-bottom: 10px;
              "
            >
              News & Updates
            </h2>
            <HomePosts></HomePosts>
          </v-sheet>
        </v-col>
        <v-col md="6" class="child" style="height: 200px;">
          <v-sheet class="py-5 px-5" elevation="2">
            <h2
              style="
                border-bottom: 2px solid #666;
                padding-bottom: 8px;
                margin-bottom: 10px;
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
