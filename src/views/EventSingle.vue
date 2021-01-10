<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subpath="Events"
      subpathURL="`/events/`"
      :title="`${events[0].name}`"
      v-if="events && events.length"
    ></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div v-if="events && events.length" class="mt-4">
            <v-card>
              <EventCard :item="events[0]" :showURL="false"></EventCard>
            </v-card>
          </div>
          <div v-else>
            <Loader></Loader>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_SINGLE_EVENT } from "@/graphql/queries/events";
export default {
  data() {
    return {
      item: null,
    };
  },
  apollo: {
    events: {
      prefetch: true,
      query: GET_SINGLE_EVENT,
      variables() {
        return {
          slug: this.$route.params.slug,
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
      result(ApolloQueryResult) {
        if (
          ApolloQueryResult &&
          ApolloQueryResult.data &&
          ApolloQueryResult.data.events.length > 0 === false
        ) {
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
