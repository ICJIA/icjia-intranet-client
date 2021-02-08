<template>
  <div>
    <div id="widget">
      <a
        class="twitter-timeline"
        href="https://twitter.com/ICJIA_Illinois"
        data-width="1000"
        data-height="500"
      >
        Tweets by @ICJIA_Illinois
      </a>
    </div>
    <v-btn @click="reloadTimeline" class="mt-5">Reload</v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    //window.twttr.widgets.load();
  },
  methods: {
    reloadTimeline() {
      //let el = document.getElementById("widget");
      window.twttr.widgets.load();
      console.log("reloaded");
    },
  },
};
</script>
