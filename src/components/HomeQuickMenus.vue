<template>
  <v-container fluid>
    <v-sheet style="background: #eee;" v-if="!$apollo.loading">
      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row fill-height>
        <v-col
          v-for="(menu, index) in menus"
          :key="index"
          cols="12"
          :sm="getWidth('sm')"
          :md="getWidth('md')"
          style="min-height: 150px;"
        >
          <v-card
            class="mx-auto px-2 py-5 mb-8"
            style="background: #fff;"
            elevation="0"
            height="250"
          >
            <v-card-text>
              <router-link
                :to="menu.baseURL"
                style="font-size: 12px;"
                v-if="menu.baseURL"
              >
                {{ menu.baseName | upperCase }}
              </router-link>
              <h2 style="color: #333;" class="mt-1 mb-4">
                {{ menu.title }}
              </h2>

              <div style="color: #333;">
                {{ menu.summary }}
              </div>
            </v-card-text>

            <v-menu
              right
              top
              offset-y
              nudge-left="70"
              nudge-bottom="30"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="blue darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3" v-if="menu.menuItem">
                <v-list-item
                  v-for="(item, index) in menu.menuItem"
                  :key="index + item"
                  :to="`${item.url}`"
                >
                  <v-list-item-title style="font-size: 12px;">{{
                    item.text
                  }}</v-list-item-title>
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item :to="menu.baseURL">
                  <v-list-item-title
                    style="font-size: 12px; font-weight: bold; color: #aaa;"
                    class="py-2 text-center"
                    >All {{ menu.baseName }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
    <div v-else>
      <Loader></Loader>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    items() {
      if (this.menus) {
        return this.menus.length;
      } else {
        return 0;
      }
    },
  },
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    getWidth() {
      if (this.$vuetify.breakpoint.xs) {
        return 12;
      } else if (this.$vuetify.breakpoint.sm) {
        if (this.items <= 1) {
          return 12;
        } else {
          return 6;
        }
      } else {
        if (this.items <= 1) {
          return 12;
        } else {
          if (this.items > 2) {
            return 4;
          } else {
            return 6;
          }
        }
      }
    },
  },
};
</script>
