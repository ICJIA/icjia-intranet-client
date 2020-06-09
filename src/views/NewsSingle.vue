<template>
  <div>
    <ApolloQuery
      :query="GET_SINGLE_POST_QUERY"
      :variables="{ slug }"
      notifyOnNetworkStatusChange
      class="mt-3"
    >
      <template slot-scope="{ result }">
        <v-container>
          <v-row>
            <v-row>
              <div v-if="isLoading(result.loading, result.error)">
                <Loader></Loader>
              </div>

              <div
                v-if="!isLoading(result.loading, result.error) && !result.error"
              >
                <h1>{{ result.data.posts[0]["title"] }}</h1>
                <div v-html="render(result.data.posts[0]['body'])"></div>
              </div>
              <div v-if="result.error" class="text-center error apollo">
                {{ result.error }}
              </div>
            </v-row>
          </v-row>
        </v-container>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { GET_SINGLE_POST_QUERY } from "@/graphql/queries/getPosts.js";
import { renderToHtml } from "@/services/Markdown";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      GET_SINGLE_POST_QUERY,
      slug: this.$route.params.slug,
    };
  },
  methods: {
    render(content) {
      return renderToHtml(content);
    },
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0px 0px 15px #000000;
  z-index: 2;
  -webkit-transition: all 100ms ease-in;
  -webkit-transform: scale(1.01);
  -ms-transition: all 100ms ease-in;
  -ms-transform: scale(1.01);
  -moz-transition: all 100ms ease-in;
  -moz-transform: scale(1.01);
  transition: all 100ms ease-in;
  transform: scale(1.01);
  cursor: pointer;
}
</style>
