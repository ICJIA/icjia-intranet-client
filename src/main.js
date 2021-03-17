import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/app.css";
import "@/components/_globals";
import "@/assets/github-markdown.css";
import "@/assets/app.css";
import "@/filters";
// import "material-design-icons-iconfont/dist/material-design-icons.css";
// import Masonry from "masonry-layout";

import "@fortawesome/fontawesome-free/css/all.css";

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

// let VueMasonryPlugin = window["vue-masonry-plugin"].VueMasonryPlugin;
// Vue.use(VueMasonryPlugin);

import browserDetect from "vue-browser-detect-plugin";
Vue.use(browserDetect);

import { createProvider } from "./vue-apollo";
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
// import "aos/dist/aos.css"; // You can also use <link> for styles
// AOS.init();

// import { VueReCaptcha } from "vue-recaptcha-v3";

// Vue.use(VueReCaptcha, {
//   siteKey: "6LdufUEaAAAAAMWt_78I8Z9crd5QLzJmRpaf1cVo",
//   loaderOptions: {
//     useRecaptchaNet: true,
//   },
// });

import VueDummy from "vue-dummy";
Vue.use(VueDummy);

import LoadScript from "vue-plugin-load-script";
Vue.use(LoadScript);

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),

  render: (h) => h(App),
}).$mount("#app");
