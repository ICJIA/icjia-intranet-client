<template>
  <div>
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
              <div style="color: #aaa; font-weight: bold" v-if="item.file">
                {{ item.file.ext }}
              </div>
              <div style="color: #aaa; font-weight: bold" v-else>
                {{ item.externalURL }}
              </div>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td
                :colspan="headers.length"
                style="padding: 0 !important; margin: 0 !important"
              >
                <v-card color="grey lighten-4" class="px-5 py-5 mx-2 my-2">
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
                    v-if="item.body"
                    class="mb-2 markdown-body"
                    v-html="render(item.body)"
                  ></div>
                  <div
                    v-html="render(item.summary)"
                    v-if="item.summary && !item.body"
                    class="mb-2"
                  ></div>

                  <div
                    class="mt-3 hover file-download"
                    style="font-weight: bold"
                    @click="download(item.file)"
                  >
                    {{ item }}
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
        {
          text: "Download",
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
.file-download {
  color: rgb(38, 38, 155);
}
.file-download:hover {
  color: #555;
  text-decoration: underline;
}
</style>
