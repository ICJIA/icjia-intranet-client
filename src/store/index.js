/* eslint-disable no-unused-vars */
import Vue from "vue";
import Vuex from "vuex";
import config from "@/config";
import axios from "axios";

Vue.use(Vuex);

// const $http = axios.create({
//   baseURL: `${config.api.base}`,
//   timeout: `${config.api.timeout}`
// });

export default new Vuex.Store({
  state: {
    status: null,
    authError: null,
    errorMsg: null,
    jwt: localStorage.getItem("jwt") || null,
    userMeta: JSON.parse(localStorage.getItem("userMeta")) || null,
    user: null
  },
  mutations: {
    AUTH_LOGOUT(state) {
      state.status = null;
      state.jwt = null;
      state.user = null;
      console.log("logged out");
    },
    AUTH_REGISTER(state, message) {
      state.status = message;
      console.log(message);
    },
    CLEAR_STATUS(state) {
      state.status = "";
      console.log("CLEAR_STATUS");
    },
    SET_STATUS(state, message) {
      state.status = message;
      console.log("SET_STATUS:", message);
    }
  },
  actions: {
    logout({ commit, state }) {
      commit("CLEAR_STATUS");
      return new Promise((resolve, reject) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("userMeta");
        delete axios.defaults.headers.common["Authorization"];
        commit("AUTH_LOGOUT");
        resolve();
      });
    },
    forgot({ commit }, email) {
      commit("CLEAR_STATUS");

      return new Promise((resolve, reject) => {
        let data = {};
        data.email = email;
        data.url = `${config.api.baseClient}${config.api.resetPasswordCallback}`;

        axios({
          url: `${config.api.base}${config.api.forgetPassword}`,
          data: data,
          method: "POST"
        })
          .then(resp => {
            commit(
              "SET_STATUS",
              `Success! Please check your email for your reset link. If you don't see the verification email, please also check inside your junk/spam folder.`
            );

            resolve(resp);
          })
          .catch(err => {
            let message;
            try {
              message = JSON.parse(
                JSON.stringify(
                  err.response.data.message[0]["messages"][0]["message"]
                )
              );
            } catch {
              message = "NETWORK ERROR: Cannot access the API";
            }
            console.log(message);
            commit("SET_STATUS", `${message}`);
            localStorage.removeItem("jwt");
            localStorage.removeItem("userMeta");

            reject(err);
          });
      });
    },
    login({ commit }, payload) {
      commit("CLEAR_STATUS");
      return new Promise((resolve, reject) => {
        //commit("auth_request");
        axios({
          url: `${config.api.base}${config.api.login}`,
          data: payload,
          method: "POST",
          timeout: `${config.api.timeout}`
        })
          .then(resp => {
            const jwt = resp.data.jwt;
            const userMeta = resp.data.user;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("userMeta", JSON.stringify(userMeta));
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
            //console.log(jwt, userMeta);
            // commit("auth_success", { jwt, userMeta });
            resolve(resp);
          })
          .catch(err => {
            let message;
            //console.log(err);
            try {
              message = JSON.parse(
                JSON.stringify(
                  err.response.data.message[0]["messages"][0]["message"]
                )
              );
            } catch {
              message = "NETWORK ERROR: Cannot access the API";
            }
            console.log(message);
            commit("SET_STATUS", `${message}`);
            reject(err);
          });
      });
    },
    register({ commit }, payload) {
      commit("CLEAR_STATUS");
      // commit("CLOSE_EVENT_DRAWER");
      // commit("CLOSE_CATEGORY_DRAWER");

      return new Promise((resolve, reject) => {
        axios({
          url: `${config.api.base}${config.api.register}`,
          data: payload,
          method: "POST",
          timeout: `${config.api.timeout}`
        })
          .then(() => {
            commit(
              "AUTH_REGISTER",
              `Success! Please check your email for your verification link. If you don't see the verification email, please also check inside your junk/spam folder.`
            );

            resolve();
          })
          .catch(err => {
            // console.log("Register error: ", JSON.stringify(err));
            let message;
            //console.log(err);
            try {
              message = JSON.parse(
                JSON.stringify(
                  err.response.data.message[0]["messages"][0]["message"]
                )
              );
            } catch {
              message = "NETWORK ERROR: Cannot access the API";
            }
            console.log(message);
            // commit("SET_ERROR", true);
            // commit("AUTH_ERROR", `ERROR: ${message}`);
            commit("SET_STATUS", `${message}`);

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
