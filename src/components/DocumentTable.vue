<template>
  <div>
    <div
      style="font-size: 12px; font-weight: 700"
      class="text-right pt-3 pr-5 mb-3"
    >
      Displaying {{ documents.length }} documents.
    </div>
    <v-data-table
      :hide-default-footer="hideFooter"
      :headers="headers"
      :items="documents"
      :items-per-page="-1"
      class="elevation-0 hover my-8"
      show-expand
      item-key="title"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      @click:row="clicked"
      :search="search"
      dense
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :footer-props="{
        itemsPerPageText: 'Number of documents per page:',
        itemsPerPageOptions: [100, 200, 300, -1],
      }"
      v-if="
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl
      "
    >
      <template v-slot:top v-if="!hideSearch">
        <div class="pt-5">
          <v-text-field
            v-model="search"
            :label="searchLabel"
            class="mx-4"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:item.title="{ item }">
        <div class="my-2">
          <span class=""
            ><strong>{{ item.title }}</strong></span
          >
        </div>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <div>
          {{ item.updated_at | dateFormat }}
        </div>
      </template>
      <template v-slot:item.published_at="{ item }">
        <div>
          <div>
            <v-chip
              :dark="getNewOrUpdatedLabel(item) === 'Updated!' ? false : true"
              :outlined="
                getNewOrUpdatedLabel(item) === 'Updated!' ? true : false
              "
              x-small
              color="#1b6fb5"
              v-if="isItNew(item)"
              class="text-center"
              :class="{ darkText: getNewOrUpdatedLabel(item) === 'Updated!' }"
              v-html="getNewOrUpdatedLabel(item)"
            >
            </v-chip>
          </div>
        </div>
      </template>
      <template v-slot:item.unit.shortname="{ item }">
        <div
          style="color: #aaa; font-weight: bold"
          v-if="item.unit && item.unit.shortname"
        >
          {{ item.unit.shortname }}
        </div>
        <div v-else style="color: #aaa; font-weight: bold">General</div>
      </template>
      <template v-slot:item.file.ext="{ item }">
        <span v-if="item.file && item.file.ext">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                color="grey lighten-2"
                size="35"
                class="my-1"
                @click.stop.prevent="download(item.file)"
                v-if="item.file"
                v-bind="attrs"
                v-on="on"
              >
                <span
                  style="
                    font-weight: 900;
                    font-size: 10px;
                    text-transform: uppercase;
                  "
                  >{{ item.file.ext.substring(1) }}
                </span>
              </v-avatar>
            </template>
            <span v-if="item && item.file">{{ item.file.name }}</span>
          </v-tooltip>
        </span>
        <span v-else>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                color="white"
                size="35"
                class="my-1"
                v-bind="attrs"
                v-on="on"
                @click.stop.prevent="goToExternal(item.externalURL)"
              >
                <span
                  style="
                    font-weight: 400;
                    font-size: 10px;
                    text-transform: uppercase;
                  "
                  ><v-icon small v-bind="attrs" v-on="on">open_in_new</v-icon>
                </span>
              </v-avatar>
            </template>
            <span v-if="item.externalURL">{{ item.externalURL }}</span>
          </v-tooltip>
        </span>
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          style="padding: 0 !important; margin: 0 !important"
        >
          <DocumentCard :item="item" class=""></DocumentCard>
        </td>
      </template>
    </v-data-table>
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th class="text-left">Date</th>
              <th class="text-left">Title</th>

              <th class="text-left">Download/Link</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in documents"
              :key="`mobile-table-${index}`"
              @click.stop.prevent="goToLink(item)"
              class="hover"
            >
              <td>
                <v-chip
                  :dark="
                    getNewOrUpdatedLabel(item) === 'Updated!' ? false : true
                  "
                  :outlined="
                    getNewOrUpdatedLabel(item) === 'Updated!' ? true : false
                  "
                  x-small
                  color="#1b6fb5"
                  v-if="isItNew(item)"
                  class="text-center"
                  :class="{
                    darkText: getNewOrUpdatedLabel(item) === 'Updated!',
                  }"
                  v-html="getNewOrUpdatedLabel(item)"
                >
                </v-chip>
              </td>
              <td>
                {{ item.updated_at | dateFormatShort }}
              </td>
              <td>
                <strong>{{ item.title }}</strong>
              </td>
              <td class="text-center">
                <span v-if="item.externalURL">
                  <v-icon small>open_in_new</v-icon>
                </span>
                <span v-else>
                  <v-avatar color="grey lighten-2" size="35" class="my-3">
                    <span
                      style="
                        font-weight: 900;
                        font-size: 10px;
                        text-transform: uppercase;
                      "
                      >{{ item.file.ext.substring(1) }}
                    </span>
                  </v-avatar>
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";

import moment from "moment";
export default {
  mixins: [handleClicks],
  data() {
    return {
      sortBy: "updated_at",
      sortDesc: true,
      items_per_page: [100, 200, 300 - 1],
      error: null,
      expanded: [],
      search: "",
      singleExpand: true,
      loading: true,
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "updated_at",
        },
        {
          text: "",
          align: "start",
          sortable: false,
          value: "published_at",
        },
        {
          text: "Title",
          align: "start",
          sortable: true,
          value: "title",
        },
        {
          text: "Unit",
          align: "start",
          sortable: true,
          value: "unit.shortname",
        },

        {
          text: "Download/Link",
          align: "center",
          sortable: true,
          value: "file.ext",
        },
      ],
    };
  },

  created() {},
  methods: {
    render(content) {
      return renderToHtml(content);
    },
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
    getNewOrUpdatedLabel(item) {
      let published = moment(item.published_at);
      let updated = moment(item.updated_at); // another date
      let duration = moment.duration(updated.diff(published));
      let days = duration.asDays();
      if (days > 1) {
        return "Updated!";
      } else {
        return "&nbsp;&nbsp;&nbsp;&nbsp;New!&nbsp;&nbsp;&nbsp;&nbsp;";
      }
    },
    goToLink(item) {
      if (item.externalURL) {
        this.goToExternal(item.externalURL);
      } else {
        this.download(item.file);
      }
    },
    goToExternal(url) {
      //
      if (url.indexOf("://") > 0 || url.indexOf("//") === 0) {
        window.open(url);
        console.log("absolute: ", url);
      } else {
        this.$router.push(url);
        console.log("relative: ", url);
      }
    },
    download(file) {
      let download = `${this.$myApp.config.api.base}${file.url}`;
      //console.log("download: ", download);
      if (file.ext === ".pdf") {
        window.open(download);
      } else {
        location.href = download;
      }
    },

    clicked(value) {
      //console.log(value);
      if (value === this.expanded[0]) {
        this.expanded = [];
      } else {
        if (this.expanded.length) {
          this.expanded.shift();
          this.expanded.push(value);
        } else {
          this.expanded.push(value);
        }
      }
    },
  },
  props: {
    documents: {
      type: Array,
      default: () => {},
    },
    searchLabel: {
      type: String,
      default: "Filter Documents",
    },
    chipLabel: {
      type: String,
      default: "Updated!",
    },
    elevation: {
      type: Number,
      default: 2,
    },
    hideFooter: {
      type: Boolean,
      default: false,
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.darkText {
  font-weight: 700 !important;
}
</style>
