<template>
  <div>
    <Breadcrumb
      v-if="posts && posts.length"
      :key="$route.path"
      title="News"
    ></Breadcrumb>
    <v-container class="mb-0">
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>ICJIA News & Updates</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid v-if="posts">
      <v-row>
        <v-col cols="12">
          <div class="text-center">
            <NewsToggle
              @toggle="toggle"
              class="mb-0"
              v-if="
                $vuetify.breakpoint.md ||
                $vuetify.breakpoint.lg ||
                $vuetify.breakpoint.xl
              "
            ></NewsToggle>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-8 mb-5" v-if="posts">
      <v-row>
        <v-col>
          <v-text-field
            filled
            dense
            label="Filter news"
            append-icon="search"
            v-model="query"
            @input="instantSearch"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-container v-if="posts" class="view-container" fluid>
      <v-row v-if="view === 'block'" class="masonry">
        <v-col
          v-for="(item, index) in filteredPosts"
          :key="index"
          class="child"
          cols="12"
          md="6"
        >
          <news-card
            :item="item"
            :text-only="false"
            read-more-text="Read News"
            @init="resize"
            @imageLoaded="resize"
          ></news-card>
        </v-col>
      </v-row>
      <v-row v-if="view === 'list'" style="margin-top: -20px" class="masonry">
        <v-col cols="12" sm="12" class="child">
          <div
            v-for="(item, index) in filteredPosts"
            :key="`list-${index}`"
            class="px-5"
          >
            <news-card
              :item="item"
              :text-only="true"
              read-more-text="Read News"
              @init="resize"
              @imageLoaded="resize"
              class="mb-4"
            ></news-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-col class="text-center" style="margin-top: -40px">
        <Loader loadingText="Loading news..."></Loader>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { GET_ALL_POSTS_QUERY } from "@/graphql/queries/posts";
import moment from "moment";
import _ from "lodash";
export default {
  data() {
    return {
      view: "block",
      filteredPosts: null,
      query: null,
    };
  },

  methods: {
    instantSearch() {
      //console.log(this.query);
      this.filteredPosts = this.posts.filter((p) => {
        if (_.includes(p.search, this.query)) {
          return p;
        }
      });
    },
    toggle(e) {
      this.view = e;
      // console.log('view: ', this.view)
      this.resize();
    },
    resize() {
      return null;
      // const elem = document.querySelector(".masonry");
      // const masonry = new window.Masonry(elem, {
      //   itemSelector: ".child",
      // });
      // masonry.layout();
      // console.log("layout resized");
    },
  },
  apollo: {
    posts: {
      prefetch: true,
      query: GET_ALL_POSTS_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        // this.filteredPosts = ApolloQueryResult.data.posts;
        this.posts = ApolloQueryResult.data.posts.map((p) => {
          return {
            ...p,
            search: `${p.title.toLowerCase()} ${p.summary.toLowerCase()} ${p.units[0][
              "title"
            ].toLowerCase()} ${p.units[0]["shortname"].toLowerCase()} ${moment(
              p.published_at
            )
              .format("MMMM DD, YYYY")
              .toLowerCase()}`,
          };
        });
        this.filteredPosts = this.posts;
      },
    },
  },
};
</script>
