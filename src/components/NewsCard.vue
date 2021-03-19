<template>
  <div>
    <v-card
      class="grid-item markdown-body hover card"
      @click="$router.push(`/news/${item.slug}`)"
      height="240px"
      elevation="0"
      color="#fff"
      v-if="
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl
      "
      :class="{ bottomRule: bottomRule }"
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay="0"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="4" v-if="item && !textOnly">
            <v-img
              v-if="item.splash && item.splash.url && !textOnly"
              aria-label="News post image"
              :src="getImagePath(item.splash.url, 0, 500, 100)"
              :lazy-src="getImagePath(item.splash.formats.thumbnail.url)"
              width="100%"
              height="190px"
              class=""
              style="border: 0px solid #fafafa"
              alt="ICJIA Intranet image"
              ><v-chip
                dark
                label
                style="margin-top: -1px"
                color="#0D4474"
                class="icjia-card"
                v-if="isItNew(item)"
              >
                NEW! </v-chip
              ><template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    aria-label="Progress bar: Loading"
                    color="blue darken-3"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-img
              v-if="!item.splash && !textOnly"
              aria-label="Default post image"
              src="/icjia-half-splash.jpg"
              lazy-src="/icjia-half-splash-thumb.jpg"
              width="100%"
              height="175px"
              class=""
              style="border: 0px solid #fafafa"
              alt="ICJIA Intranet image"
              ><v-chip
                dark
                label
                style="margin-top: -1px"
                color="#0D4474"
                class="icjia-card"
                v-if="isItNew(item)"
              >
                NEW! </v-chip
              ><template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    aria-label="Progress bar: Loading"
                    color="blue darken-3"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" :md="textOnly ? 12 : 8"
            ><v-card-text style="font-size: 12px; margin-top: -25px">
              <PostedMeta :meta="item" :showUpdatedInText="false"></PostedMeta>
              |
              <span
                @click.stop.prevent="routeToUnit(item.units[0])"
                class="hover unit-link"
                style="font-weight: bold; color: #0d4474"
                >{{ getUnitTitle(item) }}</span
              ></v-card-text
            >

            <v-card-text v-if="item.title"
              ><div
                style="
                  margin-top: -25px;
                  font-size: 18px;
                  font-weight: 700;
                  line-height: 24px;
                "
              >
                <span v-if="textOnly">
                  <v-chip
                    dark
                    label
                    x-small
                    style="margin-top: -1px"
                    color="#0D4474"
                    class="icjia-card mr-2"
                    v-if="isItNew(item)"
                  >
                    NEW!
                  </v-chip>
                </span>
                {{ item.title }}
              </div></v-card-text
            >

            <v-card-text v-if="item.summary" style="margin-top: -15px">{{
              truncate(item.summary, 20)
            }}</v-card-text>
            <v-card-text
              style="margin-top: -25px; font-size: 10px; font-weight: 700"
              v-if="item && item.tags && item.tags.length"
            >
              <!-- <Tags
                :tags="item.tags"
                :rule="false"
                :showText="true"
              ></Tags>  -->

              <span v-for="(tag, index) in item.tags" :key="index">
                <v-chip
                  small
                  class="mr-1 py-2"
                  @click.stop.prevent="
                    $router.push(`/tags/${tag.slug}/`).catch((err) => {
                      $vuetify.goTo(0);
                    })
                  "
                >
                  {{ tag.title }}
                </v-chip>
              </span>
            </v-card-text></v-col
          >
        </v-row>
      </v-container>
    </v-card>

    <v-card
      v-else
      class="grid-item markdown-body hover card"
      @click="$router.push(`/news/${item.slug}`)"
      elevation="0"
      color="#fff"
      style="border: 1px solid #ccc"
    >
      <v-img
        v-if="item && item.splash && item.splash.url && !textOnly"
        :src="getImagePath(item.splash.url, 0, 500, 100)"
        :lazy-src="getImagePath(item.splash.formats.thumbnail.url)"
        width="100%"
        aria-label="News post image"
        height="150px;"
        class=""
        style="border: 0px solid #fafafa"
        alt="ICJIA Intranet image"
        ><v-chip
          dark
          label
          style="margin-top: -1px"
          color="#0D4474"
          class="icjia-card"
          v-if="isItNew(item)"
        >
          NEW! </v-chip
        ><template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              aria-label="Progress bar: Loading"
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
          class="icjia-card"
          v-if="isItNew(item)"
          style="margin-top: -2px"
        >
          NEW!
        </v-chip>
      </div>

      <div class="px-5">
        <v-card-text style="font-size: 12px"
          ><PostedMeta :meta="item" :showUpdatedInText="false"></PostedMeta> |
          <span
            @click.stop.prevent="routeToUnit(item.units[0])"
            class="hover unit-link"
            style="font-weight: bold; color: #0d4474"
            >{{ getUnitTitle(item) }}</span
          ></v-card-text
        >

        <v-card-text v-if="item.title"
          ><div
            style="
              margin-top: -20px;
              font-size: 22px;
              font-weight: bold;
              line-height: 28px;
            "
          >
            {{ item.title }}
          </div></v-card-text
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
      default: 250,
    },
    bottomRule: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.$emit("init");
    // console.log(this.item.splash);
  },
  computed: {},
  data() {
    return {};
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    // getCols(item) {
    //   // if (item.splash) {
    //   //   return "8";
    //   // } else {
    //   //   return "12";
    //   // }
    //   return "12";
    // },
    truncate(str, max = 25) {
      const array = str.trim().split(" ");
      const ellipsis = array.length > max ? "..." : "";

      return array.slice(0, max).join(" ") + ellipsis;
    },
    getUnitTitle(item) {
      if (item.units && item.units.length) {
        return item.units[0].title;
      } else {
        return "General";
      }
    },
    routeToUnit(unit) {
      if (unit && unit.slug) {
        this.$router.push(`/units/${unit.slug}`).catch(() => {
          this.$vuetify.goTo(0);
        });
      } else {
        this.$router.push("/units/");
      }
    },
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.published_at); // another date
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

      imgPath = `${this.$myApp.config.api.base}${url}`;

      const thumborImgPath = getImageURL(
        imgPath,
        imgWidth,
        imgHeight,
        imageQuality
      );
      // console.log(thumborImgPath)
      return thumborImgPath;
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

<style>
.bottomRule {
  border-bottom: 1px solid #eee !important;
}
</style>
