<template>
  <div>
    <v-container fluid>
      <v-card color="gray lighten-4" style="min-height: 100vh">
        <base-content :loading="$apollo.loading" :error="error">
          <template v-slot:readingProgress>
            <ReadProgress></ReadProgress>
          </template>
          <template v-slot:title>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <div class="kicker">
                    {{ posts[0]["kicker"] }}
                  </div>
                  <h1
                    v-if="posts && posts.length"
                    style="font-size: 36px; line-height: 40px"
                  >
                    {{ posts[0]["title"] }}
                  </h1>
                </v-col>
              </v-row>
            </v-container>
          </template>
          <template v-slot:postedMeta>
            <v-container
              fluid
              style="
                padding: 0px 15px 0 15px;
                margin-top: -20px;
                font-size: 14px;
                color: #888;
              "
            >
              <v-row>
                <v-col>
                  <PostedMeta
                    :meta="meta"
                    v-if="posts && posts.length"
                  ></PostedMeta>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:splash>
            <div v-if="posts && posts.length && posts[0]['splash']">
              <SplashNews :splash="posts[0]['splash']['formats']"></SplashNews>
            </div>
            <div v-else>
              <v-container fluid> <hr /></v-container>
            </div>
          </template>
          <template v-slot:content>
            <v-container fluid v-if="posts && posts.length">
              <v-row>
                <v-col
                  cols="12"
                  md="12"
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
                <!-- <v-col
                  cols="12"
                  sm="12"
                  md="3"
                  order-md="2"
                  order="1"
                  order-sm="1"
                  v-if="posts && posts.length && posts[0]['showToc']"
                >
                  <div
                    v-if="posts && posts.length && isMounted"
                    class="mainToc"
                  >
                    <Toc></Toc>
                  </div>
                </v-col> -->
              </v-row>
            </v-container>
          </template>
        </base-content>
      </v-card>
    </v-container>
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
      meta: null,
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
      prefetch: true,
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
        // console.log(
        //   ApolloQueryResult.data && ApolloQueryResult.data.posts.length > 0
        // );

        if (
          ApolloQueryResult.data &&
          ApolloQueryResult.data.posts.length > 0 === false
        ) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push("/404").catch((err) => {
            console.log(err);
          });
        } else {
          this.meta = {
            created_at: ApolloQueryResult.data.posts[0]["created_at"],
            updated_at: ApolloQueryResult.data.posts[0]["updated_at"],
            updated_by: ApolloQueryResult.data.posts[0]["updated_by"],
            created_by: ApolloQueryResult.data.posts[0]["created_by"],
          };

          //console.log(this.meta);
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

.kicker {
  font-weight: 900;
  color: #0d4474;
  text-transform: uppercase;
  font-size: 12px;
}
</style>
