<template>
  <v-container fluid>
    <v-sheet elevation="0" border="1px solid #aaa" style="background: #aaa">
      <v-carousel
        height="400"
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, index) in slides.slide" :key="index">
          <v-card
            color="grey lighten-4"
            height="100%"
            class="hover"
            @click="route(slide.url)"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
              no-gutters
            >
              <v-col md="4" style="height: 100%; background: #0d4474" cols="12">
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                  no-gutters
                >
                  <div
                    style="
                      color: #fff;
                      font-weight: bold;
                      padding-right: 50px;
                      padding-left: 50px;
                    "
                  >
                    <div class="text-center">
                      <h2 v-if="slide.title">{{ slide.title }}</h2>
                      <h3
                        style="color: #fff; font-size: 14px"
                        class="mt-5"
                        v-if="slide.summary"
                      >
                        {{ slide.summary }}
                      </h3>
                      <v-btn
                        v-if="slide.url"
                        class="mt-12"
                        @click="route(slide.url)"
                        aria-label="Read More button"
                        >Read more</v-btn
                      >
                    </div>
                  </div>
                </v-row>
              </v-col>
              <v-col md="8" cols="12" class="hidden-sm-and-down">
                <v-img
                  v-if="slide.image && slide.image.formats"
                  aria-label="ICJIA Main Splash Image"
                  :src="getImageURL($myApp.config.api.base + slide.image.url)"
                  :lazy-src="
                    getImageURL(
                      $myApp.config.api.base +
                        slide.image.formats.thumbnail.url,
                      0,
                      0,
                      1
                    )
                  "
                  aspect-ratio="1.7"
                  max-height="400"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        aria-label="Progress bar: Loading"
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
    </v-sheet>
  </v-container>
</template>

<script>
import { getImageURL } from "@/services/Image";
export default {
  mounted() {},
  methods: {
    route(url) {
      var r = new RegExp("^(?:[a-z]+:)?//", "i");
      if (r.test(url)) {
        window.open(url);
      } else {
        // eslint-disable-next-line no-unused-vars
        this.$router.push(url).catch((err) => {
          this.$vuetify.goTo(0);
        });
      }
    },
  },
  props: {
    slides: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      base: this.$myApp.config.api.base,
      getImageURL,
    };
  },
};
</script>
