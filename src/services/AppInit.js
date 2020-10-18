import config from "@/config.json";

import siteMeta from "../../public/site-meta.json";
import fuseIndex from "../../public/fuse-index.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

let myApp = {
  config,
  siteMeta,
  fuseIndex,
  computedPublicPath,
};

export { myApp };
