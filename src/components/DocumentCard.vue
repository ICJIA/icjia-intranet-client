<template>
  <div class="markdown-body my-5 mx-2">
    <v-card color="white" elevation="0" class="px-8 py-8 mx-2">
      <h2
        style="
          border-bottom: 1px solid #ccc;
          padding-bottom: 6px;
          margin-bottom: 20px;
        "
      >
        {{ item.title }}
        <router-link
          :to="`/documents/${item.slug}`"
          style="background: none !important"
          class=""
          :aria-label="item.title"
          v-if="getLastItem($route.path) === '/documents/'"
        >
          &nbsp;

          <v-icon small>link</v-icon>
        </router-link>
      </h2>

      <div
        class="text-left"
        style="
          color: #555;

          margin-top: -10px;
          margin-bottom: 25px;
        "
      >
        <PostedMeta
          :meta="item"
          class=""
          :showUpdatedInText="true"
        ></PostedMeta>
      </div>

      <div
        class="mb-5"
        v-if="item.tags && item.tags.length"
        style="font-size: 14px; margin-top: -10px"
      >
        <span v-for="(tag, index) in item.tags" :key="index">
          <v-chip
            small
            style="font-weight: 700"
            class="mr-1"
            @click.stop.prevent="
              $router.push(`/tags/${tag.slug}/`).catch((err) => {
                $vuetify.goTo(0);
              })
            "
          >
            {{ tag.title }}
          </v-chip>
        </span>
      </div>

      <div
        v-if="item.body"
        class="mb-6 markdown-body"
        v-html="render(item.body)"
      ></div>
      <div
        v-html="render(item.summary)"
        v-if="item.summary && !item.body"
        class="mb-2"
      ></div>

      <div class="mt-3" v-if="item.file">
        <ul>
          <li
            @click.stop.prevent="download(item.file)"
            class="download-link hover"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  {{ item.title }}<v-icon right small>cloud_download</v-icon>
                  <!-- <v-icon small>cloud_download</v-icon> -->
                </span>
              </template>
              <span style="font-size: 12px">{{ item.file.name }} </span>
            </v-tooltip>
          </li>
        </ul>
      </div>
      <div
        class="mt-3 hover"
        v-if="item.externalURL"
        @click.stop.prevent="goToExternal(item.externalURL)"
      >
        <ul>
          <li class="download-link hover" style="margin-left: -10px">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  {{ item.title }}&nbsp;&nbsp;

                  <v-icon right small>open_in_new</v-icon>
                </span>
              </template>
              <span style="font-size: 12px">{{ item.externalURL }}</span>
            </v-tooltip>
          </li>
        </ul>
      </div>
    </v-card>
  </div>
</template>

<script>
//TODO: Fix to avoid mutating props
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
export default {
  mixins: [handleClicks],
  data() {
    return {
      error: null,
      expanded: [],
      search: "",
      singleExpand: true,
      loading: true,
    };
  },
  methods: {
    getLastItem(path) {
      let target = "documents/";
      return path.substring(path.lastIndexOf("/") - target.length);
    },
    render(content) {
      return renderToHtml(content);
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
    item: {
      type: Object,
      default: () => {},
    },
    showLink: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
