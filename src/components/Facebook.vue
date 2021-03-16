<template>
  <div>
    <div id="fb-root"></div>
    <div
      class="fb-page"
      data-href="https://www.facebook.com/ICJIA/"
      data-tabs="timeline"
      data-width="500"
      data-height="1500"
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true"
      data-show-facepile="true"
    >
      <div class="fb-xfbml-parse-ignore">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            aria-label="Progress bar: Loading"
            color="primary"
            size="50"
            class="mb-4"
          ></v-progress-circular>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    //console.log(window.FB);
    this.$loadScript(
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
    )
      .then(() => {
        console.log("FB script loaded");
        this.isLoading = false;
        window.FB.XFBML.parse();
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
      });
  },
  beforeDestroy() {
    this.$unloadScript(
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
    )
      .then(() => {
        console.log("FB script unloaded");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped></style>
