<template>
  <div>
    <Breadcrumb :key="$route.path" title="Documents"></Breadcrumb>
    <v-container fluid>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>ICJIA Documents & Resources</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="documents" fluid>
      <v-row>
        <v-col class="text-center">
          <div
            class="mb-2"
            style="font-size: 12px; font-weight: 900; color: #666"
          >
            Show:
          </div>
          <DocumentToggle></DocumentToggle>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="documents.length">
          <DocumentTable
            :documents="filteredDocuments"
            style="border: 1px solid #eee"
          ></DocumentTable>
        </v-col>
        <v-col v-else>
          <div class="text-center">
            <h2>No documents found</h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <loader></loader>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_ALL_DOCUMENTS } from "@/graphql/queries/documents";
import { EventBus } from "@/event-bus";
import Loader from "../components/Loader.vue";
export default {
  components: { Loader },
  mixins: [handleClicks],
  data() {
    return {
      error: null,
      expanded: [],
      search: "",
      singleExpand: true,
      loading: true,
      documentFilter: "all",
      documents: null,
      filteredDocuments: [],
      headers: [
        {
          text: "Last updated",
          align: "start",
          sortable: true,
          value: "updated_at",
        },
        {
          text: "",
          align: "start",
          sortable: false,
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
  watch: {
    documentFilter(newValue) {
      if (newValue === "all") {
        this.filteredDocuments = this.documents;
      }
      if (newValue === "files") {
        this.filteredDocuments = this.documents.filter((doc) => {
          if (doc.file) {
            return doc;
          }
        });
      }

      if (newValue === "links") {
        this.filteredDocuments = this.documents.filter((doc) => {
          if (doc.externalURL) {
            return doc;
          }
        });
      }
    },
  },

  mounted() {
    EventBus.$on("toggleDocuments", (val) => {
      this.documentFilter = val;
    });
  },
  methods: {
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
        this.documents = this.documents.map((d) => ({
          ...d,
          show: false,
        }));
        this.filteredDocuments = this.documents;
        this.loading = false;
      },
    },
  },
};
</script>
