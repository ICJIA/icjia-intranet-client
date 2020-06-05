const config = {
  api: {
    base: "https://intranet.icjia-api.cloud",
    baseClient: "https://strapi-auth.netlify.com",
    forgetPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    resetPasswordCallback: "/reset",
    posts: "/posts",
    login: "/auth/local",
    timeout: 10000,
    register: "/auth/local/register"
  }
};

export default config;
