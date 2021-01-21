//import { EventBus } from "@/event-bus";
import NProgress from "nprogress";
const axios = require("axios");

const api = axios.create({
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

api.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

// eslint-disable-next-line no-unused-vars
const dbInsert = async function (jwt, formData) {
  let axiosDBSubmit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  let axiosDBSubmitData = {
    type: formData.type || "undefined",
    email: formData.email || "undefined",
    form: formData || {},
  };
  try {
    return await api.post(
      `https://dev.icjia-api.cloud/forms`,
      JSON.stringify(axiosDBSubmitData),
      axiosDBSubmit
    );
  } catch (e) {
    console.log(e);
    NProgress.done();
    return `dbInsert error: ${e}`;
  }
};

// eslint-disable-next-line no-unused-vars
const emailStaff = async function (endpoint, formData) {
  let axiosEmailStaff = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    return await api.post(
      `http://localhost:5050/${endpoint}`,
      formData,
      axiosEmailStaff
    );
  } catch (e) {
    console.log(e);
    NProgress.done();
    return `mail error: ${e}`;
  }
};

export { dbInsert, emailStaff };
