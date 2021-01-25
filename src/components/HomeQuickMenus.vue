<template>
  <v-container fluid>
    <v-sheet style="background: #eee" v-if="!$apollo.loading">
      <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
      <v-row fill-height>
        <v-col
          v-for="(menu, index) in menus"
          :key="index"
          cols="12"
          :sm="getWidth('sm')"
          :md="getWidth('md')"
          style="min-height: 100px"
        >
          <v-card
            class="mx-auto px-2 py-5 mb-8"
            style="background: #f3f5f7"
            elevation="1"
            height="150"
          >
            <v-card-text>
              <!-- <router-link
                :to="menu.baseURL"
                style="font-size: 12px"
                v-if="menu.baseURL"
              >
                {{ menu.baseName | upperCase }}
              </router-link> -->
              <h2 style="color: #333" class="mt-1 mb-4">
                {{ menu.title }}
              </h2>

              <div style="color: #333">
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
                  aria-label="Activate quick menu"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3" v-if="menu.menuItem">
                <div
                  v-for="(item, index) in menu.menuItem"
                  :key="index + item"
                  class="px-2 py-2 menuLink hover"
                  @click="goToURL(item.url)"
                >
                  {{ item.text }}
                  <!-- <router-link
                    :to="item.url"
                    style="font-size: 12px"
                    class="menuLink"
                  >
                    {{ item.text }}
                  </router-link> -->
                </div>
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
    goToURL(url) {
      if (url.indexOf("://") > 0 || url.indexOf("//") === 0) {
        window.open(url);
        //console.log("absolute: ", url);
      } else {
        this.$router.push(url);
        //console.log("relative: ", url);
      }
    },
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

<style>
.menuLink:hover {
  background: #fafafa !important;
}
</style>
