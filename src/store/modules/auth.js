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
  isAuthenticated: null,
};

const mutations = {
  AUTH_LOGOUT(state) {
    state.status = null;
    state.jwt = null;
    state.user = null;
    state.isAuthenticated = null;
    state.userMeta = null;
    console.log("AUTH_LOGOUT");
  },
  AUTH_LOGIN(state, payload) {
    state.isAuthenticated = true;
    state.jwt = payload.jwt;
    state.userMeta = payload.userMeta;
    console.log("AUTH_LOGIN");
  },
  AUTH_RESET(state, payload) {
    state.status = null;
    state.jwt = null;
    state.user = null;
    state.isAuthenticated = null;
    state.userMeta = null;
    console.log("AUTH_RESET");
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
  reset({ commit }, payload) {
    return new Promise((resolve, reject) => {
      //console.log("reset payload: ", payload);
      // resolve(payload);
      // commit("AUTH_RESET");
      axios
        .post(`${config.api.base}${config.api.resetPassword}`, {
          code: payload.code,
          password: payload.password,
          passwordConfirmation: payload.passwordConfirmation,
        })
        .then((response) => {
          commit("AUTH_RESET");
          resolve(response);
        })
        .catch((error) => {
          console.log("An error occurred:", error.response);
          commit("SET_STATUS", "Network Error: Password Not Reset");
          reject(error);
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
          let payload = {
            jwt,
            userMeta,
          };
          commit("AUTH_LOGIN", payload);

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
