<template>
  <v-carousel
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    style="border-bottom: 1px solid #ddd;"
  >
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-card color="grey lighten-4" height="100%">
        <v-row class="fill-height" align="center" justify="center" no-gutters>
          <v-col md="4" style="height: 100%; background: #fafafa;">
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              no-gutters
            >
              <div style="color: #333; font-weight: bold;">
                <div class="text-center px-12">
                  <h2>Featured content here</h2>
                  <h3 style="color: #aaa; font-size: 14px;" class="mt-5">
                    Lorem markdownum placuit manet deceptus, ira duris iuncta,
                    rogat reminiscitur vivum traxit Venus pro omnia.
                  </h3>
                  <v-btn class="mt-12" color="grey">Read more</v-btn>
                </div>
              </div>
            </v-row>
          </v-col>
          <v-col md="8">
            <v-img
              src="https://picsum.photos/900/400?image=125"
              :lazy-src="`https://picsum.photos/10/6?image=125`"
              aspect-ratio="1.7"
              max-height="400"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
};
</script>
