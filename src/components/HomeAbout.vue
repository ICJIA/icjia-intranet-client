<template>
  <div>
    <ApolloQuery :query="getHomeAbout" notifyOnNetworkStatusChange class="mt-3">
      <template slot-scope="{ result }">
        <div v-if="isLoading(result.loading, result.error)" class="text-center">
          <Loader></Loader>
        </div>

        <div v-if="!isLoading(result.loading, result.error) && !result.error">
          <h1>{{ result.data.homeAbout.title }}</h1>
          <div
            v-html="render(result.data.homeAbout.body)"
            @click="handleClicks"
            class="dynamic-content"
          ></div>
        </div>
        <div v-if="result.error" class="text-center error apollo">
          {{ result.error }}
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>
<script>
import { handleClicks } from "@/mixins/handleClicks";
import { renderToHtml } from "@/services/Markdown";
import { GET_HOME_ABOUT } from "@/graphql/queries/getHome.js";
export default {
  name: "Home",
  components: {},
  mixins: [handleClicks],
  data() {
    return {
      getHomeAbout: GET_HOME_ABOUT,
      loading: null,
    };
  },
  mounted() {},
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
