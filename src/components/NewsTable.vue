<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="posts"
      :items-per-page="15"
      class="elevation-3 my-8 hover"
      item-key="title"
      :search="search"
      @click:row="rowClick"
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
      <template v-slot:item.updated_at="{ item }">
        <div>
          <strong>{{ item.updated_at | dateFormat }}</strong>
        </div>
      </template>
      <template v-slot:item.units="{ item }">
        <div
          style="color: #aaa; font-weight: bold"
          class="hover"
          v-if="item.units && item.units.length"
        >
          {{ item.units[0]["shortname"] }}
        </div>
        <div v-else style="color: #aaa; font-weight: bold">General</div>
      </template>
      <template v-slot:item.slug="{}">
        <v-avatar color="grey lighten-2" size="35" class="my-3 hover">
          <v-icon small style="font-weight: 900">link</v-icon>
        </v-avatar>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
export default {
  mixins: [handleClicks],
  props: {
    posts: {
      type: Array,
      default: () => [],
    },

    searchLabel: {
      type: String,
      default: "Search",
    },
  },
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
          sortable: false,
          value: "units",
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
    rowClick(item) {
      if (item.slug) {
        this.$router.push(`/news/${item.slug}`);
      } else {
        this.$router.push(`/`);
      }
    },
  },
};
</script>
