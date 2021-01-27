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
          ><span class="ml-2">{{ item.title }}</span>
        </div>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <div>
          <strong class="ml-3">{{ item.updated_at | dateFormat }}</strong>
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
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="grey lighten-2"
              size="35"
              class="my-3"
              @click.stop.prevent="download(item.file)"
              v-if="item.file"
              v-bind="attrs"
              v-on="on"
            >
              <span
                style="
                  font-weight: 400;
                  font-size: 10px;
                  text-transform: uppercase;
                "
                >{{ item.file.ext.substring(1) }}
              </span>
            </v-avatar>
          </template>
          <span v-if="item && item.file">Download {{ item.file.name }}</span>
        </v-tooltip>
      </template>

      <template v-slot:item.externalURL="{ item }">
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
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          style="padding: 0 !important; margin: 0 !important"
        >
          <DocumentCard :item="item"></DocumentCard>
        </td>
      </template>
    </v-data-table>
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
          text: "File",
          align: "center",
          sortable: true,
          value: "file.ext",
        },
        {
          text: "Link",
          align: "center",
          sortable: false,
          value: "externalURL",
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
      if (days <= 2) {
        return true;
      } else {
        return false;
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
      let download = `https://dev.icjia-api.cloud${file.url}`;
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
