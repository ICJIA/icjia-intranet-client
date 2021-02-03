//import { EventBus } from "@/event-bus";
// import NProgress from "nprogress";
const axios = require("axios");

const api = axios.create({
  timeout: 15000,
});

// api.interceptors.request.use((config) => {
//   NProgress.start();
//   return config;
// });

// api.interceptors.response.use((response) => {
//   NProgress.done();
//   return response;
// });

// eslint-disable-next-line no-unused-vars
const dbInsert = async function (jwt, { type, email, ...form }) {
  let axiosDBSubmit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  let axiosDBSubmitData = {
    type,
    email,
    form,
  };
  try {
    return await api.post(
      `${this.$myApp.config.api.base}/forms`,
      JSON.stringify(axiosDBSubmitData),
      axiosDBSubmit
    );
  } catch (e) {
    console.log(e);
    //NProgress.done();
    return `${e}`;
  }
};

export { dbInsert };
