<template>
  <div>
    <v-btn @click="clapOnce">Claps: {{ grandTotalClaps }} id: {{ id }}</v-btn>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getClapCount, updateClapCount } from "@/services/ClapsV2";
// eslint-disable-next-line no-unused-vars
import { EventBus } from "@/event-bus";
export default {
  async mounted() {
    console.log("mounted. ID: ", this.id);

    this.grandTotalClaps = await this.getInitialNumberOfClaps();
    console.log(this.grandTotalClaps);
  },
  data() {
    return {
      grandTotalClaps: null,
    };
  },
  methods: {
    async getInitialNumberOfClaps() {
      window.NProgress.start();
      let initialNumberOfClaps;
      let res = await getClapCount(this.$store.state.auth.jwt, this.id);
      initialNumberOfClaps = res.data.data.posts[0].claps;
      window.NProgress.done();
      this.clapTotalCount = initialNumberOfClaps;
      console.log("initial claps: ", initialNumberOfClaps);
      return initialNumberOfClaps;
    },
    clapOnce() {
      this.grandTotalClaps++;
      console.log(this.grandTotalClaps);
      console.log("update database here");
    },
  },

  props: {
    pageID: {
      type: String,
      default: null,
      required: true,
    },
    localStoragePrefix: {
      type: String,
      default: "pageClap-",
    },
    id: {
      type: String,
      default: null,
      required: true,
    },
    initialClaps: {
      type: Number,
      default: null,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
