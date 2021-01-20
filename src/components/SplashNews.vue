<template>
  <div>
    <v-container fluid>
      <v-img
        :src="getImagePath(splash.url, 0, 0, 50)"
        :lazy-src="getImagePath(splash.formats.thumbnail.url)"
        width="100%"
        height="400"
        class="mb-5"
        style="border: 1px solid #fafafa"
        :alt="getAltText()"
        ><template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="blue darken-3"
            ></v-progress-circular>
          </v-row> </template
      ></v-img>
    </v-container>
  </div>
</template>

<script>
import { getImageURL } from "@/services/Image";
export default {
  methods: {
    getImagePath(url) {
      let imgPath;
      imgPath = `https://dev.icjia-api.cloud${url}`;
      const thumborImgPath = getImageURL(imgPath);
      return thumborImgPath;
    },
    getAltText() {
      if (this.splash.alternativeText) {
        return this.splash.alternativeText;
      } else {
        return "ICJIA Intranet Image";
      }
    },
  },
  props: {
    splash: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
