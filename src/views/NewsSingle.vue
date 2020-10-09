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
      <template v-slot:content>
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="9">
              <div
                v-if="posts && posts.length"
                v-html="render(posts[0]['body'])"
                @click="handleClicks"
                class="dynamic-content"
              ></div>
            </v-col>
            <v-col cols="12" md="3">
              <div v-if="posts && posts.length && isMounted">
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
    };
  },
  mounted() {
    this.isMounted = true;
  },

  methods: {
    render(content) {
      return renderToHtml(content);
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
