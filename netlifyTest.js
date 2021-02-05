"use strict";
const axios = require("axios");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

async function main() {
  axios
    .post(process.env.NETLIFY_BUILD_HOOK)
    .then((response) => {
      // Success 🎉
      console.log("===> Success! with afterCreate build: ", response.data);
    })
    .catch((err) => {
      console.log("===> Error with afterCreate build ", err);
    });
}

main();
