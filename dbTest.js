//import { EventBus } from "@/event-bus";
// import NProgress from "nprogress";
// const axios = require("axios");
// const dotenv = require("dotenv").config();

// const api = axios.create({
//   timeout: 15000,
// });

// api.interceptors.request.use((config) => {
//   window.NProgress.start();
//   return config;
// });

// api.interceptors.response.use((response) => {
//   window.NProgress.done();
//   return response;
// });

// const getUserProfile = async function (email) {
//   let axiosHeaders = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.JWT}`,
//     },
//   };

//   try {
//     let res = await api.get(
//       `https://dev.icjia-api.cloud/biographies?email=${email}`,
//       axiosHeaders
//     );
//     console.log(res.data);
//   } catch (e) {
//     console.log(e);
//   }
// };
