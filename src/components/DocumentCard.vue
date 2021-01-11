<template>
  <div class="markdown-body my-7 mx-5 reduce-90">
    <v-card color="white" class="px-5 py-5 mx-2 my-2 pb-10">
      <h2
        style="
          border-bottom: 1px solid #ccc;
          padding-bottom: 6px;
          margin-bottom: 20px;
        "
      >
        {{ item.title }}
      </h2>
      <div
        class="text-left"
        style="
          color: #555;

          margin-top: -10px;
          margin-bottom: 25px;
        "
      >
        <PostedMeta :meta="item"></PostedMeta>
      </div>

      <div
        v-if="item.body"
        class="mb-2 markdown-body"
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
            {{ item.title }}&nbsp;&nbsp;
            <v-avatar color="grey lighten-2" size="30">
              <span
                style="
                  font-weight: 900;
                  font-size: 8px;
                  text-transform: uppercase;
                "
                >{{ item.file.ext.substring(1) }}</span
              >
            </v-avatar>
          </li>
        </ul>
      </div>
      <div
        class="mt-3 hover"
        v-if="item.externalURL"
        @click.stop.prevent="goToExternal(item.externalURL)"
      >
        <ul>
          <li class="download-link hover">
            {{ item.externalURL }}&nbsp;&nbsp;<v-icon right small
              >open_in_new</v-icon
            >
          </li>
        </ul>
      </div>

      <div v-if="item.clusters && item.clusters.length">
        <v-sheet class="mt-8 px-5 py-5">
          <div
            style="
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
              font-weight: bold;
            "
            class="mb-5"
          >
            Related Groups
          </div>

          <div
            v-for="(cluster, index) in item.clusters"
            :key="`cluster-${index}`"
            class="ml-5 mt-5 px-3 py-3"
            style="background: #f3f5f7"
          >
            <router-link
              :to="`/documents/clusters/${cluster.slug}`"
              style="background: none !important"
              class="download-link"
            >
              <span style="font-weight: bold">{{ cluster.title }}</span>
              &nbsp;

              <v-icon small>link</v-icon>
            </router-link>
            <div style="" class="mt-2">{{ cluster.summary }}</div>
            <div
              v-for="(clusterItem, index) in cluster.documents"
              :key="`clusterItem-${index}`"
            >
              <ul class="mt-3">
                <li
                  class="download-link hover"
                  v-if="item.id !== clusterItem.id"
                >
                  <span
                    v-if="!clusterItem.externalURL"
                    @click.stop.prevent="download(clusterItem.file)"
                  >
                    {{ clusterItem.title }}
                  </span>

                  <span
                    v-if="clusterItem.file"
                    @click.stop.prevent="download(clusterItem.file)"
                  >
                    <v-avatar color="grey lighten-2" size="30">
                      <span
                        style="
                          font-weight: 900;
                          text-transform: uppercase;
                          font-size: 8px;
                        "
                        >{{ clusterItem.file.ext.substring(1) }}</span
                      >
                    </v-avatar>
                  </span>
                  <span
                    v-if="clusterItem.externalURL"
                    class="hover"
                    @click.stop.prevent="goToExternal(clusterItem.externalURL)"
                  >
                    {{ clusterItem.externalURL }}
                    <v-icon small style="font-weight: 900">open_in_new</v-icon>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </v-sheet>
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
    hideClusters: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
