<template>
  <div>
    <Breadcrumb
      v-if="posts && posts.length"
      :key="$route.path"
      :title="posts[0]['title']"
      subPath="News"
      subPathURL="/news/"
    ></Breadcrumb>
    <v-container v-if="!$apollo.loading">
      <v-row>
        <v-col cols="12" md="9">
          <v-card
            style="min-height: 100vh"
            elevation="1"
            class="pl-5 pr-5 pt-10 pb-10"
            color="white"
          >
            <div v-if="posts && posts.length && posts[0]['splash']">
              <SplashNews
                :splash="posts[0]['splash']"
                style="margin-top: -25px; margin-left: 0px"
              ></SplashNews>
            </div>
            <v-row>
              <v-col class="mb-3">
                <h1
                  class="mb-4"
                  v-if="posts && posts.length"
                  style="
                    font-size: 36px;
                    line-height: 40px;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 10px;
                  "
                >
                  {{ posts[0]["title"] }}
                </h1>
                <PostedMeta
                  :meta="meta"
                  style="font-size: 12px"
                  v-if="posts && posts.length"
                ></PostedMeta>
                |
                <span
                  @click="routeToUnit(posts[0].units[0])"
                  class="hover unit-link"
                  style="font-weight: bold; color: #0d4474; font-size: 12px"
                >
                  {{ getUnitTitle(posts[0]) }}</span
                >
              </v-col>
            </v-row>

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

                <DocumentList
                  :documents="posts[0]['documents']"
                  heading="Related Resources"
                  v-if="
                    posts &&
                    posts[0]['documents'] &&
                    posts[0]['documents'].length
                  "
                  class="mt-8"
                ></DocumentList>

                <div
                  class="mt-8"
                  v-if="posts && posts[0]['tags'] && posts[0]['tags'].length"
                  style="font-size: 14px"
                >
                  <span v-for="(tag, index) in posts[0]['tags']" :key="index">
                    <v-chip
                      small
                      class="mr-1"
                      @click.stop.prevent="
                        $router.push(`/tags/${tag.slug}/`).catch((err) => {
                          $vuetify.goTo(0);
                        })
                      "
                    >
                      {{ tag.title }}
                    </v-chip>
                  </span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3" style="margin: 0; padding: 0">
          <v-sheet color="grey lighten-4" elevation="0" class="mt-3 pb-4">
            <popular-posts></popular-posts>
          </v-sheet>
          <v-sheet
            color="white"
            elevation="0"
            class="pt-3 pb-12 clapBox"
            style="margin-top: 20px"
          >
            <div class="text-center">
              <ClapsV2
                :key="getPageID()"
                :pageID="getPageID()"
                :id="posts[0]['id']"
              ></ClapsV2>
              <div style="font-size: 12px; font-weight: 300" class="mt-5">
                Like this page? Find it useful? Give it a clap!<br />(Or two or
                three ...)
              </div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-col class="text-center">
        <Loader></Loader>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_POST_QUERY } from "@/graphql/queries/posts";
import { MD5 } from "@/utils";
import PopularPosts from "../components/PopularPosts.vue";
export default {
  name: "Home",
  mixins: [handleClicks],
  components: { PopularPosts },

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
    getPageID() {
      let url = this.$myApp.config.api.baseClient + this.$route.fullPath + "/";
      console.log(url + ": " + MD5(url));
      return MD5(url);
    },
    render(content) {
      return renderToHtml(content);
    },
    routeToUnit(unit) {
      if (unit) {
        this.$router.push(`/units/${unit.slug}`).catch(() => {
          this.$vuetify.goTo(0);
        });
      } else {
        this.$router.push("/units/");
      }
    },
    getUnitTitle(item) {
      if (item.units && item.units.length) {
        return item.units[0].title;
      } else {
        return "General";
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
            published_at: ApolloQueryResult.data.posts[0]["published_at"],
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

.clapBox {
  position: sticky;
  top: 80px;
}
</style>
