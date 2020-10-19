<template>
  <div>
    <v-container fluid>
      <v-card color="gray lighten-4 px-10" style="min-height: 100vh">
        <base-content :loading="false">
          <template v-slot:title>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h1
                    style="font-size: 36px; line-height: 40px"
                    class="text-center"
                  >
                    Search
                  </h1>
                </v-col>
              </v-row>
            </v-container>
          </template>

          <template v-slot:content>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                  order-md="1"
                  order="2"
                  order-sm="2"
                  class="markdown-body"
                >
                  <MySearch></MySearch>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </base-content>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Search",

  components: {},

  data() {
    return {};
  },
  mounted() {},

  methods: {},
};
</script>

<style></style>
