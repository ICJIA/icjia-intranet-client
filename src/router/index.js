/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
import NProgress from "nprogress";
import appConfig from "@/config.json";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about/",
    name: "About",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login/",
    name: "Login",
    meta: {
      hideAlert: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/success/",
    name: "Success",
    meta: {
      hideAlert: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Success.vue"),
  },
  {
    path: "/logout/",
    name: "Logout",
    meta: {
      hideAlert: true,
    },
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/Logout.vue"),
  },
  {
    path: "/register/",
    name: "Register",
    meta: {
      hideAlert: true,
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/forgot/",
    name: "Forgot",
    meta: {
      hideAlert: true,
    },
    component: () =>
      import(/* webpackChunkName: "forgot" */ "../views/Forgot.vue"),
  },
  {
    path: "/web-support/",
    name: "WebSupport",
    meta: {
      hideAlert: true,
      hideScrollButton: true,
    },
    component: () =>
      import(/* webpackChunkName: "support" */ "../views/Forms/webSupport.vue"),
  },
  {
    path: "/reset/",
    name: "Reset",
    meta: {
      hideAlert: true,
      hideScrollButton: true,
    },
    component: () =>
      import(/* webpackChunkName: "reset" */ "../views/Reset.vue"),
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox.vue"),
  },
  {
    path: "/sandbox2",
    name: "Sandbox2",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox2.vue"),
  },
  {
    path: "/sandbox3",
    name: "Sandbox3",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox3.vue"),
  },
  {
    path: "/news/",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/news/:slug/",
    name: "NewsSingle",
    component: () =>
      import(/* webpackChunkName: "news" */ "../views/NewsSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/documents/",
    name: "Documents",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Documents.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/documents/:slug/",
    name: "DocumentsSingle",
    component: () =>
      import(
        /* webpackChunkName: "documents" */ "../views/DocumentsSingle.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/events/",
    name: "EventCalendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Events.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/events/:slug/",
    name: "EventSingle",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/EventSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: "/support/",
  //   name: "Support",
  //   component: () =>
  //     import(/* webpackChunkName: "support" */ "../views/Support.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/support/:slug/",
  //   name: "SupportSingle",
  //   component: () =>
  //     import(/* webpackChunkName: "support" */ "../views/SupportSingle.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/forms/",
    name: "Forms",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/support/",
    name: "FormSupport",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/support.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/hr/",
    name: "FormHR",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/hr.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/laptop/",
    name: "FormLaptop",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/laptop.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/vehicle/",
    name: "FormVehicleRequest",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/vehicle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/conference/",
    name: "FormConference",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/conference.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/supplies/",
    name: "FormSupplyRequest",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms/supplies.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/search/",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/Search.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/social/facebook/",
    name: "Facebook",
    component: () =>
      import(/* webpackChunkName: "social" */ "../views/SocialFacebook.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/social/twitter/",
    name: "Twitter",
    component: () =>
      import(/* webpackChunkName: "social" */ "../views/SocialTwitter.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/units/",
    name: "UnitPages",
    component: () =>
      import(/* webpackChunkName: "units" */ "../views/Units.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/units/:slug/",
    name: "UnitPageList",
    component: () =>
      import(/* webpackChunkName: "units" */ "../views/UnitSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tags/",
    name: "TagPages",
    component: () => import(/* webpackChunkName: "tags" */ "../views/Tags.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/tags/:slug/",
    name: "TagPageList",
    component: () =>
      import(/* webpackChunkName: "tags" */ "../views/TagSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  // {
  //   path: "/coming-soon",
  //   name: "ComingSoon",
  //   component: () =>
  //     import(/* webpackChunkName: "comingSoon" */ "../views/ComingSoon.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  {
    path: "/forms/profile/",
    name: "UserProfile",
    component: () =>
      import(
        /* webpackChunkName: "UserProfile" */ "../views/Forms/profile.vue"
      ),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "*",
    name: "FourOhFour",
    component: () => import(/* webpackChunkName: '404' */ "../views/404.vue"),
    meta: {
      hideAlert: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: appConfig.publicPath,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// console.log(appConfig.underConstruction);

router.beforeEach((to, from, next) => {
  window.NProgress.start();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let jwt = localStorage.getItem("jwt");

  if (requiresAuth && !store.state.auth.isAuthenticated) {
    return next({
      path: "/login/",
      query: { redirect: to.fullPath },
    });
  }

  next();
});

router.afterEach((routeTo, routeFrom) => {
  window.NProgress.done();
});

export default router;
