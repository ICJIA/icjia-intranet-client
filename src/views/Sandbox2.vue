<template>
  <div>
    <v-container fluid>
      <div id="fb-root"></div>
      <v-row>
        <v-col cols="12" md="6" class="text-center">
          <div
            class="fb-page"
            data-href="https://www.facebook.com/ICJIA/"
            data-tabs="timeline"
            data-width="1000"
            data-height=""
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
            <!-- <blockquote
        cite="https://www.facebook.com/ICJIA/"
        class="fb-xfbml-parse-ignore"
      >
        <a href="https://www.facebook.com/ICJIA/"
          >Illinois Criminal Justice Information Authority</a
        >
        
      </blockquote> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
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

<style lang="scss" scoped></style>
