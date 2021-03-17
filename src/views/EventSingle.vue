<template>
  <div>
    <Breadcrumb
      :key="$route.path"
      subPath="Events"
      subPathURL="/events/"
      :title="`${events[0].name}`"
      v-if="events && events.length"
    ></Breadcrumb>
    <v-container :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
      <v-row>
        <v-col>
          <div v-if="events && events.length" class="mt-4">
            <v-card class="mb-4">
              <EventCard
                :item="events[0]"
                :showURL="false"
                :showClose="false"
                :showColor="false"
              ></EventCard>
            </v-card>
            <div class="text-center">
              <v-btn x-small to="/events/" exact
                >All events<v-icon right x-small>calendar_today</v-icon></v-btn
              >
            </div>
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
