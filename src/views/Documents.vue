<template>
  <div>
    <Breadcrumb :key="$route.path" title="Documents"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>Documents</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
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
            :loading="loading"
            loading-text="Loading..."
          >
            <template v-slot:top>
              <div class="pt-5">
                <v-text-field
                  v-model="search"
                  label="Search All Documents"
                  class="mx-4"
                ></v-text-field>
              </div>
            </template>
            <template v-slot:item.updated_at="{ item }">
              <div style="font-size: 14px !important">
                <strong>{{ item.updated_at | dateFormat }}</strong>
              </div>
            </template>
            <template v-slot:item.unit.title="{ item }">
              <div
                style="color: #aaa; font-weight: bold"
                v-if="item.unit && item.unit.title"
              >
                {{ item.unit.title }}
              </div>
              <div v-else style="color: #aaa; font-weight: bold">General</div>
            </template>
            <template v-slot:item.file="{ item }">
              <v-avatar
                color="grey lighten-2"
                size="40"
                class="my-3"
                @click.stop.prevent="download(item.file)"
                v-if="item.file"
              >
                <span
                  style="
                    font-size: 10px !important;
                    font-weight: 900;
                    text-transform: uppercase;
                  "
                  >{{ item.file.ext.substring(1) }}</span
                >
              </v-avatar>

              <v-avatar
                color="grey lighten-2"
                size="40"
                class="my-3"
                v-else
                @click.stop.prevent="goToExternal(item.externalURL)"
              >
                <v-icon small style="font-weight: 900">open_in_new</v-icon>
              </v-avatar>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td
                :colspan="headers.length"
                style="padding: 0 !important; margin: 0 !important"
              >
                <v-card
                  color="grey lighten-4"
                  class="px-5 py-5 mx-2 my-2 pb-10"
                >
                  <h2
                    style="
                      font-size: 30px;
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
                      font-size: 12px;
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
                        class="download-link"
                      >
                        {{ item.title }}&nbsp;&nbsp;
                        <v-avatar color="grey lighten-2" size="25">
                          <span
                            style="
                              font-size: 8px !important;
                              font-weight: 900;
                              text-transform: uppercase;
                            "
                            >{{ item.file.ext.substring(1) }}</span
                          >
                        </v-avatar>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="mt-3"
                    v-if="item.externalURL"
                    @click.stop.prevent="goToExternal(item.externalURL)"
                  >
                    <ul>
                      <li class="download-link">
                        {{ item.externalURL }}&nbsp;&nbsp;<v-icon right small
                          >open_in_new</v-icon
                        >
                      </li>
                    </ul>
                  </div>

                  <div v-if="item.clusters && item.clusters.length">
                    <v-sheet color="grey lighten-3" class="mt-8 px-5 py-5">
                      <div
                        style="
                          border-bottom: 1px solid #ccc;
                          padding-bottom: 5px;
                          font-weight: bold;
                        "
                        class="mb-5"
                      >
                        Related Documents
                      </div>

                      <div
                        v-for="(cluster, index) in item.clusters"
                        :key="`cluster-${index}`"
                        class="ml-5 mt-5"
                      >
                        <div style="font-weight: bold">{{ cluster.title }}</div>
                        <div style="" class="mt-2">{{ cluster.summary }}</div>
                        <div
                          v-for="(clusterItem, index) in cluster.documents"
                          :key="`clusterItem-${index}`"
                        >
                          <ul class="mt-3">
                            <li
                              class="download-link"
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
                                <v-avatar color="grey lighten-2" size="25">
                                  <span
                                    style="
                                      font-size: 8px !important;
                                      font-weight: 900;
                                      text-transform: uppercase;
                                    "
                                    >{{
                                      clusterItem.file.ext.substring(1)
                                    }}</span
                                  >
                                </v-avatar>
                              </span>
                              <span
                                v-if="clusterItem.externalURL"
                                @click.stop.prevent="
                                  goToExternal(clusterItem.externalURL)
                                "
                              >
                                {{ clusterItem.externalURL }}
                                <v-icon small style="font-weight: 900"
                                  >open_in_new</v-icon
                                >
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </v-sheet>
                  </div>
                </v-card>
              </td>
            </template></v-data-table
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_ALL_DOCUMENTS } from "@/graphql/queries/documents";
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
          width: "200px",
        },
        {
          text: "Title",
          align: "start",
          sortable: true,
          value: "title",
          width: "300px",
        },
        {
          text: "Unit",
          align: "start",
          sortable: true,
          value: "unit.title",
        },
        // {
        //   text: "External",
        //   align: "start",
        //   sortable: false,
        //   value: "externalURL",
        // },
        {
          text: "Download/Link",
          align: "center",
          sortable: false,
          value: "file",
        },
      ],
    };
  },

  created() {},
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
  apollo: {
    documents: {
      prefetch: true,
      query: GET_ALL_DOCUMENTS,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      // eslint-disable-next-line no-unused-vars
      result(ApolloQueryResult) {
        this.loading = false;
      },
    },
  },
};
</script>

<style>
.download-link {
  color: rgb(38, 38, 155);
  font-weight: bold;
}
.download-link:hover {
  color: #555;

  text-decoration: underline;
}
</style>
