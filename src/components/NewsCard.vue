<template>
  <div>
    <v-card
      class="grid-item pb-6 mb-6 markdown-body info-card"
      outlined
      @click="$router.push(`/news/${item.slug}`)"
    >
      <!-- <div style="font-size: 12px; margin-left: 15px">
        {{ formatDate(item.posted_at) }}
      </div> -->

      <v-img
        v-if="item.splash && !textOnly"
        :src="`${$myApp.config.api.base}${item.splash.formats.small.url}`"
        :lazy-src="`${$myApp.config.api.base}${item.splash.formats.thumbnail.url}`"
        width="100%"
        :height="splashHeight"
        class=""
        style="border: 0px solid #fafafa"
        alt="ICJIA Intranet image"
        ><v-chip
          dark
          label
          style="margin-top: -2px"
          color="#2296F3"
          class=""
          v-if="isItNew(item)"
        >
          NEW! </v-chip
        ><template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="blue darken-3"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div v-if="!item.splash || textOnly">
        <v-chip
          dark
          label
          small
          color="#2296F3"
          class=""
          v-if="isItNew(item)"
          style="margin-top: -2px"
        >
          NEW!
        </v-chip>
      </div>

      <div class="px-5">
        <v-card-text style="font-size: 12px"
          ><PostedMeta :meta="item" :showUpdatedInText="true"></PostedMeta
        ></v-card-text>

        <v-card-text v-if="item.title"
          ><h2 style="margin-top: -20px">
            {{ item.title }}
          </h2></v-card-text
        >

        <v-card-text v-if="item.summary" style="margin-top: -15px">{{
          item.summary
        }}</v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import { getImageURL } from "@/services/Image";
import moment from "moment";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    textOnly: {
      type: Boolean,
      default: true,
    },
    readMoreText: {
      type: String,
      default: "Read article",
    },
    splashHeight: {
      type: Number,
      default: 200,
    },
  },
  mounted() {
    this.$emit("init");
  },

  methods: {
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.updated_at); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= this.$myApp.config.daysToShowNew) {
        return true;
      } else {
        return false;
      }
    },
    getImagePath(url, imgWidth = 0, imgHeight = 0, imageQuality = 30) {
      let imgPath;
      if (this.$store.state.appEnv === "development") {
        // For Dev
        // imgPath = `${url}`
        imgPath = `${this.$store.state.appConfig.clientURL}${url}`;

        const thumborImgPath = getImageURL(
          imgPath,
          imgWidth,
          imgHeight,
          imageQuality
        );
        // console.log(thumborImgPath)
        return thumborImgPath;
      } else {
        imgPath = `${this.$store.state.appConfig.clientURL}${url}`;

        const thumborImgPath = getImageURL(
          imgPath,
          imgWidth,
          imgHeight,
          imageQuality
        );
        // console.log(thumborImgPath)
        return thumborImgPath;
      }
    },
    formatDate() {
      // const temp = new Date(d).toJSON().split("T")[0];
      // const myDate = `${temp}T23:59:59.000Z`;
      // const formattedDate = format(parseISO(myDate), "MMMM dd, yyyy");
      //return formattedDate;

      return "date here";
    },
    resize() {
      // console.log('child image loaded')
      this.$emit("imageLoaded");
    },
  },
};
</script>

<style lang="scss" scoped></style>
