<template>
  <div>
    <ApolloQuery :query="getHomeAbout" notifyOnNetworkStatusChange class="mt-3">
      <template slot-scope="{ result }">
        <div v-if="isLoading(result.loading, result.error)" class="text-center">
          <Loader></Loader>
        </div>

        <div v-if="!isLoading(result.loading, result.error) && !result.error">
          <h1>{{ result.data.homeAbout.title }}</h1>
          <div v-html="render(result.data.homeAbout.body)"></div>
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { renderToHtml } from "@/services/Markdown";
import { GET_HOME_ABOUT } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      getHomeAbout: GET_HOME_ABOUT,
      loading: null,
    };
  },
  methods: {
    render(content) {
      return renderToHtml(content);
    },
    isLoading(loading) {
      //this.loading = loading;
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
  },
};
</script>
