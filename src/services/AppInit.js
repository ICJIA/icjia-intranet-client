import config from "@/config.json";
//import searchIndex from "../../public/searchIndex.json";

const computedPublicPath =
  process.env.NODE_ENV === `production` ? config.publicPath : "";

let myApp = {
  config,
  //   searchIndex,
  computedPublicPath
};

export { myApp };
