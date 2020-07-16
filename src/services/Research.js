import { EventBus } from "@/event-bus";
import NProgress from "nprogress";

const axios = require("axios");
const api = axios.create({
  baseURL: "https://researchhub.icjia-api.cloud/graphql",
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

async function queryEndpoint(query) {
  let content = await api({
    method: "post",
    data: {
      query,
    },
  });
  return content;
}

const getRecentArticlesQuery = (start, limit) => {
  return `{
      articles (sort: "date:desc", limit: ${limit}, start: ${start}, where: {status: "published"}) {
        title
        status
       createdAt
        abstract
        authors 
        slug
        thumbnail
        splash
        date
      }
    }`;
};

const getRecentArticles = async (start, limit) => {
  try {
    let articles = await queryEndpoint(getRecentArticlesQuery(start, limit));
    //console.log(articles.data.data.articles);
    return articles.data.data.articles;
  } catch (e) {
    console.log("researchHub error: ", e.toString());
    EventBus.$emit("error", e.toString());
    NProgress.done();
    return null;
  }
};

export { getRecentArticles };
