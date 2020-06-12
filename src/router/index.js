/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";
import NProgress from "nprogress";

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
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/Logout.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: () =>
      import(/* webpackChunkName: "forgot" */ "../views/Forgot.vue"),
  },
  {
    path: "/reset",
    name: "Reset",
    component: () =>
      import(/* webpackChunkName: "reset" */ "../views/Reset.vue"),
  },
  {
    path: "/sandbox",
    name: "Sandbox",
    component: () =>
      import(/* webpackChunkName: "sandbox" */ "../views/Sandbox.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import(/* webpackChunkName: "news" */ "../views/News.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/Calendar.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/news/:slug",
    name: "NewsSingle",
    component: () =>
      import(/* webpackChunkName: "news" */ "../views/NewsSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/documents",
    name: "Documents",
    component: () =>
      import(/* webpackChunkName: "documents" */ "../views/Documents.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/documents/:slug",
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
    path: "/support",
    name: "Support",
    component: () =>
      import(/* webpackChunkName: "support" */ "../views/Support.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/support/:slug",
    name: "SupportSingle",
    component: () =>
      import(/* webpackChunkName: "support" */ "../views/SupportSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms",
    name: "Forms",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/Forms.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/forms/:slug",
    name: "FormsSingle",
    component: () =>
      import(/* webpackChunkName: "forms" */ "../views/FormsSingle.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "*",
    name: "FourOhFour",
    component: () => import(/* webpackChunkName: '404' */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  let jwt = localStorage.getItem("jwt");

  if (requiresAuth && !store.state.auth.isAuthenticated) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
  next();
});

router.afterEach((routeTo, routeFrom) => {
  NProgress.done();
});

export default router;
