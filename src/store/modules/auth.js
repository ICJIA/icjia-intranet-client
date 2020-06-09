/* eslint-disable no-unused-vars */
import config from "@/config.json";
import axios from "axios";
// import { ApolloClient } from "apollo-client";
// import { onLogout } from "@/vue-apollo";

const namespaced = true;

const state = {
  status: null,
  authError: null,
  errorMsg: null,
  jwt: localStorage.getItem("jwt") || null,
  userMeta: JSON.parse(localStorage.getItem("userMeta")) || null,
  user: null,
};

const mutations = {
  AUTH_LOGOUT(state) {
    state.status = null;
    state.jwt = null;
    state.user = null;
    console.log("AUTH_LOGOUT");
  },
  AUTH_LOGIN(state) {
    console.log("AUTH_LOGIN");
  },

  CLEAR_STATUS(state) {
    state.status = "";
    console.log("CLEAR_STATUS");
  },
  SET_STATUS(state, message) {
    state.status = message;
    console.log("SET_STATUS:", message);
  },
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  logout({ commit, state }) {
    commit("CLEAR_STATUS");
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      //onLogout(ApolloClient);
      localStorage.removeItem("jwt");
      localStorage.removeItem("userMeta");
      delete axios.defaults.headers.common["Authorization"];
      commit("AUTH_LOGOUT");
      resolve("logged out successfully");
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
        method: "POST",
      })
        .then((resp) => {
          commit(
            "SET_STATUS",
            `Success! Please check your email for your reset link. If you don't see the verification email, please also check inside your junk/spam folder. Please give it a few minutes.`
          );

          resolve(resp);
        })
        .catch((err) => {
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
      axios({
        url: `${config.api.base}${config.api.login}`,
        data: payload,
        method: "POST",
        timeout: `${config.api.timeout}`,
      })
        .then((resp) => {
          const jwt = resp.data.jwt;
          const userMeta = resp.data.user;
          localStorage.setItem("jwt", jwt);
          localStorage.setItem("userMeta", JSON.stringify(userMeta));
          axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
          commit("AUTH_LOGIN");
          resolve(resp);
        })
        .catch((err) => {
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

          commit("SET_STATUS", `${message}`);
          reject(err);
        });
    });
  },
  register({ commit }, payload) {
    commit("CLEAR_STATUS");

    return new Promise((resolve, reject) => {
      axios({
        url: `${config.api.base}${config.api.register}`,
        data: payload,
        method: "POST",
        timeout: `${config.api.timeout}`,
      })
        .then(() => {
          commit(
            "SET_STATUS",
            `Success! Please check your email for your verification link. If you don't see the verification email, please also check inside your junk/spam folder. Please give it a few minutes.`
          );

          resolve();
        })
        .catch((err) => {
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

          reject(err);
        });
    });
  },
};

const getters = {
  isLoggedIn: (state) => !!state.jwt,
  authStatus: (state) => state.status,
  userMeta: (state) => state.userMeta,
};

export { namespaced, state, mutations, actions, getters };
