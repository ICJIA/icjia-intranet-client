<template>
  <div>
    <base-content :loading="$apollo.loading" :error="error">
      <template v-slot:title>
        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <h1 v-if="posts && posts.length">{{ posts[0]["title"] }}</h1>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <template v-slot:splash>
        <div v-if="posts && posts.length && posts[0]['splash']">
          <SplashNews :splash="posts[0]['splash']['formats']"></SplashNews>
        </div>
      </template>
      <template v-slot:content>
        <v-container fluid v-if="posts && posts.length">
          <v-row>
            <v-col
              cols="12"
              :md="dynamicFlex(posts[0]['showToc'])"
              order-md="1"
              order="2"
              order-sm="2"
              class="markdown-body"
            >
              <div
                v-if="posts && posts.length"
                v-html="render(posts[0]['body'])"
                @click="handleClicks"
                class="dynamic-content"
              ></div>
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="3"
              order-md="2"
              order="1"
              order-sm="1"
              v-if="posts && posts.length && posts[0]['showToc']"
            >
              <div v-if="posts && posts.length && isMounted" class="mainToc">
                <Toc></Toc>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </base-content>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_POST_QUERY } from "@/graphql/queries/getPosts";
export default {
  name: "Home",
  mixins: [handleClicks],
  components: {},

  data() {
    return {
      posts: null,
      error: null,
      isMounted: false,
      tocAble: null,
    };
  },
  mounted() {
    this.isMounted = true;
    const sections = Array.from(document.querySelectorAll("h2, h3"));
    this.tocAble = sections.length ? true : false;
  },

  methods: {
    render(content) {
      return renderToHtml(content);
    },
    dynamicFlex(showToc) {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return "12";
      } else {
        return showToc ? "9" : "12";
      }
    },
  },
  apollo: {
    posts: {
      query: GET_SINGLE_POST_QUERY,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        if (!ApolloQueryResult.data && !ApolloQueryResult.data.posts.length) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        }
      },
    },
  },
};
</script>

<style>
.mainToc {
  position: -webkit-sticky !important; /* Safari */
  position: sticky !important;
  top: 115px !important;
  font-size: 13px;
}
</style>
