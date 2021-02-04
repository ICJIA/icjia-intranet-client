<template>
  <div>
    <Timeline
      id="ICJIA_Illinois"
      sourceType="profile"
      :options="{ tweetLimit: '15' }"
      error-message="This timeline could not be loaded. Please <a href='https://intranet.icjia.cloud/social/twitter/'>refresh the page</a>."
      ><Loader size="30" height="10"></Loader
    ></Timeline>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Tweet, Moment, Timeline } from "vue-tweet-embed";
export default {
  components: {
    Timeline,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  created() {
    console.log("created");
  },
  mounted() {
    // console.log("mounted");
    // //console.log(window.FB);
    // this.$loadScript("https://platform.twitter.com/widgets.js")
    //   .then(() => {
    //     console.log("Twitter script loaded");
    //     this.isLoading = false;
    //     // window.FB.XFBML.parse();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.isLoading = false;
    //   });
  },
  beforeDestroy() {
    // this.$unloadScript("https://platform.twitter.com/widgets.js")
    //   .then(() => {
    //     console.log("Twitter script unloaded");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>
