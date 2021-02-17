//import { EventBus } from "@/event-bus";
// import NProgress from "nprogress";
let axios = require("axios");

const api = axios.create({
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  window.NProgress.start();
  return config;
});

api.interceptors.response.use((response) => {
  window.NProgress.done();
  return response;
});

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
      `https://dev.icjia-api.cloud/forms`,
      JSON.stringify(axiosDBSubmitData),
      axiosDBSubmit
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

const getUserProfile = async function (jwt, email) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    return await axios.get(
      `https://dev.icjia-api.cloud/biographies?email=${email}`,
      axiosHeaders
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

export { dbInsert, getUserProfile };
