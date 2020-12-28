<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>Documents</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        {{ documents }}
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { GET_ALL_DOCUMENTS } from "@/graphql/queries/documents";
export default {
  data() {
    return {
      error: null,
    };
  },
  created() {},
  mounted() {},
  methods: {},
  apollo: {
    documents: {
      prefetch: true,
      query: GET_ALL_DOCUMENTS,
      variables() {
        return {};
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      },
    },
  },
};
</script>

<style></style>
