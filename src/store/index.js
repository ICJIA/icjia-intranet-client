/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import config from "@/config";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    jwt: localStorage.getItem("jwt") || "",
    userMeta: JSON.parse(localStorage.getItem("userMeta")) || "",
    user: {}
  },
  mutations: {
    logout(state) {
      state.status = "";
      state.jwt = "";
      state.user = {};
      console.log("logged out");
    }
  },
  actions: {
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userMeta");
        delete axios.defaults.headers.common["Authorization"];
        commit("logout");
        resolve();
      });
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: `${config.api.base}${config.api.login}`,
          data: payload,
          method: "POST"
        })
          .then(resp => {
            const jwt = resp.data.jwt;
            const userMeta = resp.data.user;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("userMeta", JSON.stringify(userMeta));
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            console.log(jwt, userMeta);
            // commit("auth_success", { jwt, userMeta });
            resolve(resp);
          })
          .catch(err => {
            console.log("error");
            // let message = JSON.parse(JSON.stringify(err.response.data.message));
            // commit("auth_error", message);
            // localStorage.removeItem("jwt");
            // localStorage.removeItem("userMeta");
            reject(err);
          });
      });
    }
  },
  modules: {},
  getters: {
    isLoggedIn: state => !!state.jwt,
    authStatus: state => state.status,
    userMeta: state => state.userMeta
  }
});
