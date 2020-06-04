const config = {
  api: {
    base: "https://intranet.icjia-api.cloud",
    baseClient: "https://strapi-auth.netlify.com",
    forgetPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    resetPasswordCallback: "/reset",
    posts: "/posts",
    login: "/auth/local"
  }
};

export default config;
