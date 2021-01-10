<template>
  <div class="markdown-body">
    <v-card color="grey lighten-4" class="mb-5" elevation="0">
      <div
        style="
          border-left: 1px solid #ccc;
          background: #fafafa;
          width: 100% !important;
        "
      >
        <div class="px-5 py-6">
          <div style="font-size: 14px">
            <span style="color: #333; font-weight: bold">{{
              item.type | upperCase
            }}</span>
            <span
              style="color: #555"
              v-html="getRange(item.start, item.end, item.timed)"
            ></span>
          </div>
          <h2 class="mt-4" style="font-size: 20px">
            {{ item.name }}&nbsp;<v-icon
              v-if="showURL"
              class="hover"
              small
              @click="$router.push(`/events/${item.slug}/`)"
              >link</v-icon
            >
          </h2>

          <div class="py-3">
            <div class="pl-2" style="font-size: 14px; margin-top: -15px">
              {{ item.details }}
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

                  font-size: 14px;
                "
              >
                Related Documents
              </div>

              <ul class="mt-2">
                <span
                  v-for="(document, index) in item.documents"
                  :key="`eventDoc-${index}`"
                  style="font-size: 13px"
                  class="download-link"
                >
                  <li
                    v-if="document.file"
                    class="hover"
                    @click.stop.prevent="download(document.file)"
                  >
                    {{ document.title }}
                  </li>
                  <li
                    v-else
                    class="hover"
                    @click.stop.prevent="goToExternal(document.externalURL)"
                  >
                    {{ document.title }}&nbsp;<v-icon x-small
                      >open_in_new</v-icon
                    >
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

      if (daysBetween === 0 && timed) {
        range = ` | ${localStart.format("h:mm a")} to ${localEnd.format(
          "h:mm a"
        )}`;
      } else if (daysBetween === 0 && !timed) {
        range = ` | All Day`;
      } else if (daysBetween > 0) {
        range = ` | <strong>${localStart.format(
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
  },
};
</script>
