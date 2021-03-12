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

async function queryEndpoint(jwt, query) {
  let content = await api({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    baseURL: "https://dev.icjia-api.cloud/graphql",
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

const getClapCount = async (jwt, id) => {
  try {
    //let res =
    //   console.log(res);
    return await queryEndpoint(jwt, getClapCountQuery(id));
  } catch (e) {
    console.error(" error: ", e.toString());
  }
};

const updateClapCount = async function (jwt, data, id) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    return await api.put(
      `https://dev.icjia-api.cloud/posts/${id}`,
      JSON.stringify(data),
      axiosHeaders
    );
  } catch (e) {
    console.log(e);

    return `${e}`;
  }
};

export { getClapCount, updateClapCount };
