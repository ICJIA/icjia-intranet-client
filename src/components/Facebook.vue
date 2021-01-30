<template>
  <div class="text-center">
    <div id="fb-root"></div>

    <div
      class="fb-page"
      data-href="https://www.facebook.com/ICJIA/"
      data-tabs="timeline"
      data-width="500"
      data-height="1000"
      data-small-header="true"
      data-adapt-container-width="true"
      data-hide-cover="true"
      data-show-facepile="true"
    >
      <div class="fb-xfbml-parse-ignore">
        <Loader
          loadingText="Loading Facebook Timeline..."
          height="100"
          size="35"
        ></Loader>
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
  mounted() {
    this.$loadScript(
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0"
    )
      .then(() => {
        console.log("script loaded");
        this.isLoading = false;
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
        console.log("script unloaded");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
