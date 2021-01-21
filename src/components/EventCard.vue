<template>
  <div class="markdown-body reduce-85">
    <v-card color="grey lighten-3" class="mb-5" elevation="0">
      <div
        style="
          border-left: 1px solid #ccc;
          background: #fafafa;
          width: 100% !important;
        "
      >
        <v-toolbar :color="getColor(item)" dark>
          <v-toolbar-title v-html="item.name" style="font-weight: 900">
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn
            x-small
            outlined
            @click.prevent.stop="$emit('clicked')"
            v-if="showClose"
            >CLOSE</v-btn
          >
        </v-toolbar>
        <div class="px-5 py-6">
          <div style="font-size: 16px">
            <span style="color: #333; font-weight: bold">{{
              item.type | upperCase
            }}</span>
            <span
              style="color: #555"
              v-html="getRange(item.start, item.end, item.timed)"
            ></span
            >&nbsp;&nbsp;&nbsp;<span v-if="showURL">|&nbsp;</span>
            <v-icon
              v-if="showURL"
              @click="$router.push(`/events/${item.slug}/`)"
              >link</v-icon
            >
          </div>

          <div class="py-3">
            <div class="pl-2" style="margin-top: 10px">
              <div v-html="render(item.details)"></div>
            </div>
          </div>
          <div
            v-if="item.documents && item.documents.length"
            style="background: #eee"
          >
            <v-sheet color="grey lighten-3" class="px-3 py-3">
              <div
                style="
                  font-weight: bold;
                  border-bottom: 1px solid #ccc;
                  padding-bottom: 5px;
                  margin-bottom: 15px;
                "
              >
                Related Documents
              </div>

              <ul class="mt-2">
                <span
                  v-for="(document, index) in item.documents"
                  :key="`eventDoc-${index}`"
                  class="download-link"
                >
                  <li
                    v-if="document.file"
                    class="hover"
                    @click.stop.prevent="download(document.file)"
                  >
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          {{ document.title }}
                        </span>
                      </template>
                      <span style="font-size: 12px">
                        {{ document.file.name }}
                      </span>
                    </v-tooltip>
                  </li>
                  <li
                    v-else
                    class="hover"
                    @click.stop.prevent="goToExternal(document.externalURL)"
                  >
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                          {{ document.title }}&nbsp;<v-icon x-small
                            >open_in_new</v-icon
                          >
                        </span>
                      </template>
                      <span style="font-size: 12px">
                        {{ document.externalURL }}
                      </span>
                    </v-tooltip>
                  </li>
                </span>
              </ul>
            </v-sheet>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
const moment = require("moment");
const tz = require("moment-timezone");
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
export default {
  mixins: [handleClicks],
  methods: {
    getColor(item) {
      let color = "grey darken-3";
      if (this.$myApp.config.events[item.type]) {
        color = this.$myApp.config.events[item.type]["color"];
      }
      return color;
    },
    render(content) {
      return renderToHtml(content);
    },
    goToExternal(url) {
      window.open(url);
    },
    download(file) {
      let download = `https://dev.icjia-api.cloud${file.url}`;
      //console.log("download: ", download);
      if (file.ext === ".pdf") {
        window.open(download);
      } else {
        location.href = download;
      }
    },
    getRange(start, end, timed) {
      let range;
      let localStart = moment(start).tz(this.$myApp.config.timezone);
      let localEnd = moment(end).tz(this.$myApp.config.timezone);
      let daysBetween = moment(localEnd).diff(moment(localStart), "days");
      console.log(daysBetween);

      if (daysBetween === 0 && timed) {
        range = ` | <strong>${localStart.format(
          "MMMM D, YYYY"
        )} </strong>  |  ${localStart.format("h:mm a")} to ${localEnd.format(
          "h:mm a"
        )}`;
      } else if (daysBetween === 0 && !timed) {
        range = `  |  <strong>${localStart.format(
          "MMMM D, YYYY"
        )}</strong> | All Day Event`;
      } else {
        range = `  |  <strong>${localStart.format(
          "MMMM D, h:mm a"
        )}</strong> through <strong>${localEnd.format(
          "MMMM D, h:mm a"
        )}</strong>`;
      }

      return range;
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    hideClusters: {
      type: Boolean,
      default: false,
    },
    showTitle: {
      type: Boolean,
      default: false,
    },
    showURL: {
      type: Boolean,
      default: true,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style></style>