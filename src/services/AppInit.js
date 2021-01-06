import config from "@/config.json";

import siteMeta from "../assets/site-meta.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

let myApp = {
  config,
  siteMeta,

  computedPublicPath,
};

export { myApp };
