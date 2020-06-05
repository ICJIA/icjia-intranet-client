/* eslint-disable no-unused-vars */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue")
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: () =>
      import(/* webpackChunkName: "forgot" */ "../views/Forgot.vue")
  },
  {
    path: "/reset",
    name: "Reset",
    component: () =>
      import(/* webpackChunkName: "reset" */ "../views/Reset.vue")
  },

  {
    path: "*",
    name: "FourOhFour",
    component: () => import(/* webpackChunkName: '404' */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let jwt = localStorage.getItem("jwt");

  if (requiresAuth && !jwt && !store.getters.isLoggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
  next();
});

export default router;
