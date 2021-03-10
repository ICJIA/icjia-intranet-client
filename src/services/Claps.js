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

const getClaps = async function (jwt, pageID) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    return await api.get(
      `https://dev.icjia-api.cloud/claps?pageID=${pageID}`,
      axiosHeaders
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

const createClapEntry = async function (jwt, data) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    return await api.post(
      `https://dev.icjia-api.cloud/claps`,
      JSON.stringify(data),
      axiosHeaders
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

const updateClapEntry = async function (jwt, data, id) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    return await api.put(
      `https://dev.icjia-api.cloud/claps/${id}`,
      JSON.stringify(data),
      axiosHeaders
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

export { getClaps, createClapEntry, updateClapEntry };
