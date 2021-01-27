<template>
  <v-list v-if="menuItems && menuItems.length">
    <div v-for="item in menuItems" :key="item.title">
      <div v-if="item.items.length">
        <v-list-group v-model="item.active" no-action>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                v-text="item.title"
                style="font-size: 22px; font-weight: bold"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="child in item.items"
            :key="child.title"
            :to="child.url"
          >
            <v-list-item-content style="margin-left: -30px">
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
        <v-list-item style="margin-bottom: -5px" :to="item.url">
          <v-list-item-title style="font-size: 22px; font-weight: bold">
            {{ item.title }}</v-list-item-title
          >
        </v-list-item>
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
  mounted() {
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
    this.menuItems = [...this.items, units, events];
    //console.log(this.menuItems);
  },

  data: () => ({
    menuItems: null,
    items: [
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
          { title: "Technical Support Request", url: "/forms/support/" },
        ],
        title: "Online Forms",
      },
      {
        items: [
          { title: "All", url: "/documents/" },
          { title: "Grouped", url: "/documents/clusters/" },
        ],
        title: "Documents & Resources",
      },
    ],
  }),
};
</script>
