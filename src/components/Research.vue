<template>
  <v-sheet class="px-2 py-2" elevation="3">
    <v-container fluid class="mb-8" style="margin: 0; padding: 0;">
      <div style="background: #225b89;" class="px-3 py-3">
        <v-row no-gutters>
          <v-col>
            <h2 style="color: #fff;">
              Latest ICJIA Research
            </h2>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn outlined x-small color="white" to="/news"
              >ResearchHub&nbsp;<v-icon right x-small
                >open_in_new</v-icon
              ></v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-slide-group v-model="model" class="pa-4" show-arrows>
      <v-slide-item
        v-for="n in 100"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="300"
          @click="toggle"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    model: null,
  }),
};
</script>
