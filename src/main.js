import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/components/_globals";
// import "@/assets/css/github-markdown.css";
// import "@/assets/css/app.css";
// import "@/filters";
// import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;

// Set up app wide read-only configs and install as plugin
import { myApp } from "./services/AppInit";
myApp.install = function () {
  Object.defineProperty(Vue.prototype, "$myApp", {
    get() {
      return myApp;
    },
  });
};
Vue.use(myApp);

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import VueMeta from "vue-meta";
Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});

// import VueAnalytics from "vue-analytics";
// Vue.use(VueAnalytics, {
//   id: "UA-150082887-6",
//   debug: {
//     sendHitTask: process.env.NODE_ENV === "production"
//   }
// });

// import AOS from "aos";
// AOS.init();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
