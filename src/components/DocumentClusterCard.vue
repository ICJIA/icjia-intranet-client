<template>
  <div class="markdown-body my-7 mx-5 reduce-90">
    <v-card color="white" class="px-5 py-5 mx-2 my-2 pb-10">
      <div>
        <h2 style="font-size: 22px">
          {{ item.title }}
          <router-link
            :to="`/documents/clusters/${item.slug}`"
            style="background: none !important"
            class="download-link"
            v-if="getLastItem($route.path) === '/clusters/'"
            ><v-icon>link</v-icon></router-link
          >
        </h2>
        &nbsp;

        <div style="" class="mt-2">{{ item.summary }}</div>
        <div
          v-for="(clusterItem, index) in item.documents"
          :key="`clusterItem-${index}`"
        >
          <ul class="mt-3">
            <li class="download-link hover" v-if="!clusterItem.externalURL">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    @click.stop.prevent="download(clusterItem.file)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ clusterItem.title }}
                    <!-- <v-icon small right>cloud_download</v-icon> -->
                  </span>
                </template>
                <span
                  style="font-size: 12px"
                  v-if="
                    clusterItem && clusterItem.file && clusterItem.file.name
                  "
                  >{{ clusterItem.file.name }}</span
                >
              </v-tooltip>
            </li>
            <li class="download-link hover" v-if="clusterItem.externalURL">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    @click.stop.prevent="download(clusterItem.file)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ clusterItem.title }}
                    <v-icon small right>open_in_new</v-icon>
                  </span>
                </template>
                <span
                  style="font-size: 12px"
                  v-if="clusterItem && clusterItem.externalURL"
                  >{{ clusterItem.externalURL }}</span
                >
              </v-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
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
      let target = "clusters/";
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
      let download = `https://dev.icjia-api.cloud${file.url}`;
      //console.log("download: ", download);
      if (file.ext === ".pdf") {
        window.open(download);
      } else {
        location.href = download;
      }
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
.download-link {
  color: rgb(38, 38, 155) !important;
  font-weight: bold;
}
.download-link:hover {
  color: #555;

  text-decoration: underline;
}
</style>
