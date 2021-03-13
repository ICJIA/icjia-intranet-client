<template>
  <div>
    <div style="background: #f3f3f3" class="px-4 py-2">
      <v-row>
        <v-col>
          <h2>Most Popular</h2>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-col>
        <div v-if="posts">
          <div v-for="(post, index) in posts" :key="`top-${index}`">
            <v-card
              class="mb-3 px-2 py-2 info-card"
              elevation="0"
              style="font-size: 14px"
              @click="route(post)"
            >
              <div style="font-size: 10px; color: #666" class="mb-1">
                {{ post.published_at | format }}
              </div>
              <!-- <v-chip
                dark
                label
                x-small
                color="#2296F3"
                v-if="isItNew(post)"
                style="margin-top: -2px; font-size: 8px !important"
                >NEW!</v-chip
              >&nbsp; -->
              <strong>{{ post.title }}</strong>
              <div class="text-right" style="font-size: 12px">
                {{ post.claps }}
              </div>
            </v-card>
          </div>
        </div>
        <div v-else>
          <Loader></Loader>
        </div>
      </v-col>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
import moment from "moment";
import { GET_POPULAR_POSTS_QUERY } from "@/graphql/queries/posts";
export default {
  mounted() {
    EventBus.$on("updateClaps", () => {
      this.refetch();
    });
  },
  methods: {
    refetch() {
      this.$apollo.queries.posts.refetch();
    },
    route(post) {
      this.$router.push(`/news/${post.slug}`).catch(() => {
        this.$vuetify.goTo(0);
      });
    },
    isItNew(item) {
      let now = moment(new Date()); //todays date
      let end = moment(item.published_at); // another date
      let duration = moment.duration(now.diff(end));
      let days = duration.asDays();
      if (days <= this.$myApp.config.daysToShowNew) {
        return true;
      } else {
        return false;
      }
    },
  },
  apollo: {
    posts: {
      prefetch: true,
      fetchPolicy: "no-cache",
      query: GET_POPULAR_POSTS_QUERY,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        console.log(ApolloQueryResult);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
