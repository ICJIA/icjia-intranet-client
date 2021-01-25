<template>
  <div>
    <Breadcrumb :key="$route.path" title="Document Groups"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>Document Groups</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="clusters">
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="clusters"
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
                  label="Search for a Document Group"
                  class="mx-4"
                ></v-text-field>
              </div>
            </template>
            <template v-slot:item.updated_at="{ item }">
              <div style="font-size: 14px !important">
                {{ item.updated_at | dateFormat }}
              </div>
            </template>

            <template v-slot:item.title="{ item }">
              <div style="font-size: 14px !important">
                <strong> {{ item.title }}</strong>
              </div>
            </template>

            <template v-slot:item.slug="{ item }">
              <v-icon
                @click.stop.prevent="
                  $router.push(`/documents/clusters/${item.slug}`)
                "
                >link</v-icon
              >
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td
                :colspan="headers.length"
                style="padding: 0 !important; margin: 0 !important"
              >
                <DocumentClusterCard :item="item"></DocumentClusterCard>
              </td>
            </template>
          </v-data-table>
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
import { GET_ALL_CLUSTERS } from "@/graphql/queries/clusters";
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
          text: "Group Title",
          align: "start",
          sortable: true,
          value: "title",
          width: "300px",
        },

        {
          text: "Last updated",
          align: "start",
          sortable: true,
          value: "updated_at",
          width: "200px",
        },

        {
          text: "Link",
          align: "center",
          sortable: false,
          value: "slug",
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
  apollo: {
    clusters: {
      prefetch: true,
      query: GET_ALL_CLUSTERS,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      // eslint-disable-next-line no-unused-vars
      result(ApolloQueryResult) {
        this.loading = false;
        //console.log(ApolloQueryResult);
      },
    },
  },
};
</script>
