const axios = require("axios");
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();

const api = axios.create({
  timeout: 15000,
});

const getUserProfile = async function (email) {
  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.JWT}`,
    },
  };

  try {
    let res = await api.get(
      `https://dev.icjia-api.cloud/biographies?email=${email}`,
      axiosHeaders
    );
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};

getUserProfile("christopher.schweda@illinois.gov");
