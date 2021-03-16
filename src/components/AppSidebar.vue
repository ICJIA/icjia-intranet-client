<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      disable-resize-watcher
      color="white"
      ><v-list v-if="menuItems && menuItems.length" class="mt-5">
        <div v-for="item in menuItems" :key="item.title">
          <div v-if="item.items.length">
            <v-list-group v-model="item.active" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.title"
                    style="font-size: 18px; font-weight: bold"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="child in item.items"
                :key="child.title"
                :to="child.url"
                exact
                @click="drawer = false"
              >
                <v-list-item-content style="margin-left: -40px">
                  <v-list-item-title
                    v-text="child.title"
                    style="
                      font-size: 14px !important;
                      font-weight: bold;
                      color: #555;
                    "
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </div>
          <div v-else>
            <v-list-item
              style="margin-bottom: -5px"
              :to="item.url"
              exact
              @click="drawer = false"
            >
              <v-list-item-title style="font-size: 18px; font-weight: bold">
                {{ item.title }}</v-list-item-title
              >
            </v-list-item>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { EventBus } from "@/event-bus";
export default {
  data: () => ({
    drawer: false,
    menuItems: null,
    items: [
      {
        url: "/tags/new-hires/",
        items: [],
        title: "New Hires",
      },
      {
        url: "/tags/training/",
        items: [],
        title: "Training",
      },
      {
        url: "/news/",
        items: [],
        title: "News & Updates",
      },
      {
        items: [
          { title: "Conference Room Reservation", url: "/forms/conference/" },
          { title: "Laptop Request", url: "/forms/laptop/" },
          { title: "Office Supply Request", url: "/forms/supplies/" },

          { title: "Your User Profile", url: "/forms/profile/" },
          { title: "Contact Technical Support", url: "/forms/support/" },
          { title: "Contact Human Resources", url: "/forms/hr/" },
        ],
        title: "Online Forms",
      },
      {
        items: [
          { title: "All", url: "/documents/" },
          { title: "Grouped", url: "/documents/clusters/" },
        ],
        title: "Documents",
      },
    ],
  }),
  methods: {
    // eslint-disable-next-line no-unused-vars
    routeToPage(item) {
      //console.log(item);
      this.drawer = false;
      //   this.$router.push(item.path).catch(() => {
      //     this.$vuetify.goTo(0);
      //   });
    },
  },
  mounted() {
    EventBus.$on("toggleDrawer", () => {
      this.drawer = !this.drawer;
    });
    EventBus.$on("closeDrawer", () => {
      this.drawer = false;
      console.log("close drawer");
    });
    let unitArray = this.$myApp.units.map((unit) => {
      let obj = {};
      obj.title = unit.title;
      obj.url = unit.path;
      return obj;
    });

    let units = {
      title: "Units",
      items: unitArray,
    };

    let events = {
      url: "/events/",
      items: [],
      title: "Events",
    };

    let search = {
      url: "/search/",
      items: [],
      title: "Search",
    };
    this.menuItems = [...this.items, units, events, search];
    //console.log(this.menuItems);
  },
};
</script>
