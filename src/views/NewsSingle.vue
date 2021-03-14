<template>
  <div>
    <Breadcrumb
      v-if="posts && posts.length"
      :key="$route.path"
      :title="posts[0]['title']"
      subPath="News"
      subPathURL="/news/"
    ></Breadcrumb>
    <v-container>
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
                  v-if="posts && posts.length"
                  @click="routeToUnit(posts[0].units[0])"
                  class="hover unit-link"
                  style="font-weight: bold; color: #0d4474; font-size: 12px"
                >
                  {{ getUnitTitle(posts[0]) }}</span
                >
                |

                <v-tooltip right style="font-size: 12px !important">
                  <template v-slot:activator="{ on, attrs }">
                    <button>
                      <span
                        class="clap--mini ml-1"
                        id="clap--mini"
                        @click="updateTotalClaps"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span>
                          <!--  SVG Created by Luis Durazo from the Noun Project  -->
                          <svg
                            id="clap--icon--mini "
                            class="clap--icon--mini"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-549 338 100.1 125"
                          >
                            <path
                              d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z"
                            />
                            <path
                              d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9"
                            />
                          </svg>
                        </span>
                        <span
                          class="claps ml-1"
                          style="font-size: 12px !important"
                        >
                          {{ totalClaps }}
                        </span>
                      </span>
                    </button>
                  </template>
                  <span
                    v-if="getClapCount() === 0"
                    style="font-size: 12px !important"
                    >Like this page? Give it a clap! (Or two. Or three...)</span
                  >
                  <span
                    v-if="getClapCount() < maxClaps && getClapCount() > 0"
                    style="font-size: 12px !important"
                    >You've given this article {{ getClapCount() }} claps. Keep
                    going!</span
                  >
                  <span
                    v-if="getClapCount() >= maxClaps"
                    style="font-size: 12px !important"
                    >You've maxed out your applause. Thank you!</span
                  >
                </v-tooltip>
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
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_SINGLE_POST_QUERY } from "@/graphql/queries/posts";
import { MD5 } from "@/utils";
import _ from "lodash";
import PopularPosts from "../components/PopularPosts.vue";
// eslint-disable-next-line no-unused-vars
import { EventBus } from "@/event-bus";
// eslint-disable-next-line no-unused-vars
import { getClapCount, updateClapCount } from "@/services/ClapsV2";

export default {
  name: "Home",
  mixins: [handleClicks],
  components: { PopularPosts },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      console.log("route change");
      this.$apollo.queries.posts.refetch();
      this.userClaps = null;
    },
  },

  data() {
    return {
      error: null,
      id: null,
      isMounted: false,
      tocAble: null,
      meta: null,
      clapKey: 0,
      claps: null,
      totalClaps: null,
      isLoaded: false,
      numberOfUserClaps: null,
      maxClaps: 25,
      userClaps: null,
      userClapArray: null,
    };
  },
  async mounted() {
    console.log("mounted");
    this.userClapArray = await this.getUserClaps();
  },

  methods: {
    getClapCount() {
      let alreadyClapped = _.find(this.userClapArray, { id: this.id });
      let count;
      if (alreadyClapped) {
        count = alreadyClapped.claps;
      } else {
        count = 0;
      }
      return count;
    },
    getUserClaps() {
      console.log("get user claps from session storage");
      let clapArray = JSON.parse(localStorage.getItem("claps") || "[]");
      return clapArray;
    },
    async updateTotalClaps() {
      let alreadyClapped = _.find(this.userClapArray, { id: this.id });
      if (alreadyClapped) {
        this.userClaps = alreadyClapped.claps;
      } else {
        this.userClaps = 0;
      }
      if (this.userClaps >= this.maxClaps) return;
      this.userClaps = this.userClaps + 1;
      this.totalClaps = this.totalClaps + 1;
      const clapMini = document.getElementById("clap--mini");
      const circleBurst = new window.mojs.Burst({
        parent: clapMini,
        radius: { 10: 75 },
        angle: 25,
        duration: 300,
        children: {
          shape: "circle",
          fill: "rgba(149,165,166 ,0.5)",
          delay: 30,
          speed: 0.2,
          radius: { 3: 0 },
          easing: window.mojs.easing.bezier(0.1, 1, 0.3, 1),
        },
      });
      const triangleBurst = new window.mojs.Burst({
        parent: clapMini,
        radius: { 10: 95 },
        count: 5,
        angle: 30,
        children: {
          shape: "polygon",
          radius: { 6: 0 },
          scale: 1,
          stroke: "rgba(211,84,0 ,0.5)",
          strokeWidth: 2,
          angle: 210,
          delay: 30,
          speed: 0.2,
          easing: window.mojs.easing.bezier(0.1, 1, 0.3, 1),
          duration: 300,
        },
      });
      const miniTimeline = new window.mojs.Timeline();
      miniTimeline.add([triangleBurst, circleBurst]);
      miniTimeline.replay();

      let dbObj = {
        id: this.id,
        claps: Number(this.totalClaps),
      };

      //console.table(dbObj);
      let res = await updateClapCount(
        this.$store.state.auth.jwt,
        dbObj,
        this.id
      );

      let isPostStored = _.find(this.userClapArray, { id: this.id });
      if (isPostStored) {
        console.log("already there", isPostStored);
        let index = _.findIndex(this.userClapArray, ["id", this.id]);
        console.log("index: ", index);
        let claps = this.userClapArray[index]["claps"] + 1;
        let clapsForPage = {
          id: this.id,
          claps,
        };
        this.userClapArray[index] = clapsForPage;
        localStorage.setItem("claps", JSON.stringify(this.userClapArray));
        this.userClapArray = await this.getUserClaps();
      } else {
        let clapsForPage = {
          id: this.id,
          claps: Number(this.userClaps),
        };
        this.userClapArray.push(clapsForPage);
        console.log("added");
        localStorage.setItem("claps", JSON.stringify(this.userClapArray));
      }
      //EventBus.$emit("refetchPosts");
      this.refetch();
    },
    async refetch() {
      // const clapTotalCount = document.getElementById("clap--count-total");
      // clapTotalCount.innerHTML = "";
      this.$apollo.queries.posts.refetch();
      this.userClapArray = await this.getUserClaps();
      let alreadyClapped = _.find(this.userClapArray, { id: this.id });
      if (alreadyClapped) {
        this.userClaps = alreadyClapped.claps;
      } else {
        this.userClaps = 0;
      }
      EventBus.$emit("refetchPosts", this.id);
      console.log("refetch user claps", this.userClaps);
    },
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
      fetchPolicy: "no-cache",
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
          this.totalClaps = ApolloQueryResult.data.posts[0]["claps"];
          this.id = ApolloQueryResult.data.posts[0]["id"];
          console.log(this.id);
          this.isLoaded = true;
          //console.log(this.meta);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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

/*========================
    SASS definitions
  =======================*/
$btn-dimension: 80px;
$primary-color: rgba(189, 195, 199, 1);
$secondary-color: rgb(28, 49, 168);
@mixin debug {
  outline: 1px solid red;
}

/*========================
    BUTTON styles
  =======================*/

.clap--mini {
  position: relative;
  // outline: 1px solid transparent;
  // border-radius: 50%;
  // border: 1px solid $primary-color;
  // width: $btn-dimension;
  // height: $btn-dimension;
  background: none;
  // &:after {
  //   content: "";
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   display: block;
  //   border-radius: 50%;
  //   //border: 1px solid $primary-color;
  //   width: $btn-dimension - 1px;
  //   height: $btn-dimension - 1px;
  // }
  &:hover {
    cursor: pointer;
    // border: 1px solid $secondary-color;
    // transition: border-color 0.3s ease-in;
    // &:after {
    //   animation: shockwave 1s ease-in infinite;
    // }
  }

  svg.clap--icon--mini {
    width: 20px;
    fill: none;
    stroke: $secondary-color;
    stroke-width: 2px;
    &.checked {
      fill: $secondary-color;
      stroke: #fff;
      stroke-width: 1px;
    }
  }
}

.clap--icon--mini,
.claps {
  vertical-align: middle;
  display: inline-block;
  font-size: 12px;
}

@keyframes shockwave {
  0% {
    transform: scale(1);
    box-shadow: 0 0 2px $secondary-color;
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
    box-shadow: 0 0 50px darken($secondary-color, 20%),
      inset 0 0 10px $secondary-color;
  }
}

*:focus {
  outline: none !important;
}
</style>
