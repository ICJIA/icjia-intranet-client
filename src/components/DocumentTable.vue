<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="documents"
      :items-per-page="15"
      class="elevation-3 hover my-8"
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
        itemsPerPageText: 'Number of documents',
        itemsPerPageOptions: [100, 200, 300, -1],
      }"
      v-if="
        $vuetify.breakpoint.md ||
        $vuetify.breakpoint.lg ||
        $vuetify.breakpoint.xl
      "
    >
      <template v-slot:top>
        <div class="pt-5">
          <v-text-field
            v-model="search"
            :label="searchLabel"
            class="mx-4"
          ></v-text-field>
        </div>
      </template>
      <template v-slot:item.title="{ item }">
        <div>
          <v-chip dark x-small color="#2296F3" v-if="isItNew(item)">
            NEW! </v-chip
          ><span class="ml-2"
            ><strong>{{ item.title }}</strong></span
          >
        </div>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <div>
          {{ item.updated_at | dateFormat }}
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

      <!-- <template v-slot:item.externalURL="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="white"
              size="35"
              class="my-3"
              v-bind="attrs"
              v-on="on"
              v-if="!item.file && item.externalURL"
              @click.stop.prevent="goToExternal(item.externalURL)"
            >
              <v-icon x-small style="font-weight: 900">open_in_new</v-icon>
            </v-avatar>
          </template>
          <span>Go to link</span>
        </v-tooltip>
      </template> -->

      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          style="padding: 0 !important; margin: 0 !important"
        >
          <DocumentCard :item="item"></DocumentCard>
        </td>
      </template>
    </v-data-table>
    <div v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Updated</th>
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
                  dark
                  x-small
                  color="#2296F3"
                  class="mr-2"
                  v-if="isItNew(item)"
                >
                  NEW! </v-chip
                >{{ item.updated_at | dateFormatShort }}
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
          text: "Last updated",
          align: "start",
          sortable: true,
          value: "updated_at",
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
      default: "Search Documents",
    },
  },
};
</script>
