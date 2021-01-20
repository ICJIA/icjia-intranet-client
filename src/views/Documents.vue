<template>
  <div>
    <Breadcrumb :key="$route.path" title="Documents"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>All Documents</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="documents">
      <v-row>
        <v-col v-if="documents.length">
          <DocumentTable :documents="documents"></DocumentTable>
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
