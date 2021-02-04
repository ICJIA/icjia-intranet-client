<template>
  <div>
    <!-- <div id="fb-root"></div>
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
        <Loader
          loadingText="Loading Facebook Timeline..."
          height="100"
          size="35"
        ></Loader>
      </div>
    </div> -->
    <a
      class="twitter-timeline"
      href="https://twitter.com/ICJIA_Illinois?ref_src=twsrc%5Etfw"
    >
      <Loader size="30" height="30" loadingText="Loading tweets..."></Loader
    ></a>
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
    this.$loadScript("https://platform.twitter.com/widgets.js")
      .then(() => {
        console.log("Twitter script loaded");
        this.isLoading = false;
        // window.FB.XFBML.parse();
      })
      .catch((err) => {
        console.log(err);
        this.isLoading = false;
      });
  },
  beforeDestroy() {
    this.$unloadScript("https://platform.twitter.com/widgets.js")
      .then(() => {
        console.log("Twitter script unloaded");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
