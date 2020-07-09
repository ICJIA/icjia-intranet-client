<template>
  <ApolloQuery :query="GET_HOME" notifyOnNetworkStatusChange>
    <template slot-scope="{ result }">
      <div v-if="isLoading(result.loading)">
        <Loader></Loader>
      </div>

      <div v-if="!isLoading(result.loading) && !result.error">
        <!-- START: home components -->
        <HomeAlert
          :type="result.data.home.alert.alertType"
          :text="result.data.home.alert.text"
          :dismissable="result.data.home.alert.dismissable"
        ></HomeAlert>

        <HomeSlider :slides="result.data.home.slider"></HomeSlider>

        <!-- END: home components -->
      </div>
      <div v-if="result.error" class="text-center error apollo">
        {{ result.error }}
      </div>
    </template>
  </ApolloQuery>
</template>
<script>
import { GET_HOME } from "@/graphql/queries/home.js";
export default {
  name: "Home",
  components: {},

  data() {
    return {
      GET_HOME,
    };
  },
  methods: {
    isLoading(loading) {
      // eslint-disable-next-line no-undef
      loading ? NProgress.start() : NProgress.done();
      return loading ? true : false;
    },
  },
};
</script>

<style>
.hover {
  cursor: pointer;
}
.card:hover {
  box-shadow: 0px 0px 15px #000000;
  z-index: 2;
  -webkit-transition: all 100ms ease-in;
  -webkit-transform: scale(1.01);
  -ms-transition: all 100ms ease-in;
  -ms-transform: scale(1.01);
  -moz-transition: all 100ms ease-in;
  -moz-transform: scale(1.01);
  transition: all 100ms ease-in;
  transform: scale(1.01);
  cursor: pointer;
  background: #fafafa;
}
</style>
