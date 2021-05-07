//import { EventBus } from "@/event-bus";
//import NProgress from "nprogress";
let axios = require("axios");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

const api = axios.create({
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  //NProgress.start();
  return config;
});

api.interceptors.response.use((response) => {
  //NProgress.done();
  return response;
});

async function queryEndpoint(query, jwt) {
  let content = await api({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    baseURL: "https://intranet.icjia-api.cloud/graphql",
    method: "post",
    data: {
      query,
    },
  });
  return content;
}

const getClapCountQuery = (id) => {
  return `{
      posts (limit: 10, where: {id: ${id}}) {
        id
        title
        slug
        claps
      }
    }`;
};

const getClapCount = async (id) => {
  try {
    let res = await queryEndpoint(getClapCountQuery(id), process.env.JWT);
    //   console.log(res);
    return res;
  } catch (e) {
    console.error(" error: ", e.toString());
  }
};

const init = async () => {
  let result = await getClapCount(145);
  console.log(result.data.data.posts[0].claps);
};

init();
