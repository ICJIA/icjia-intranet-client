<template>
  <div class="read-progress-container">
    <span
      class="read-progress-bar"
      :class="{ 'with-shadow': shadow }"
      :style="{
        width: readProgress + '%',
        color: color,
        height: height,
        opacity: opacity,
        backgroundColor: color,
      }"
    ></span>
  </div>
</template>

<script>
export default {
  name: "VueReadProgress",
  props: {
    color: {
      type: String,
      default: "#0d4474",
    },
    height: {
      type: String,
      default: "3px",
    },
    opacity: {
      type: [String, Number],
      default: 1,
    },
    shadow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      readProgress: 0,
    };
  },
  created() {
    if (process.browser) {
      window.addEventListener("scroll", this.updateReadProgress);
    }
  },
  beforeDestroy() {
    if (process.browser) {
      window.removeEventListener("scroll", this.updateReadProgress);
    }
  },
  methods: {
    updateReadProgress() {
      if (process.browser) {
        this.readProgress = this.currentScrollPosition(window.scrollY);
      }
    },
    currentScrollPosition(position) {
      if (process.browser) {
        return (
          (position /
            (document.body.clientHeight -
              document.documentElement.clientHeight)) *
          100
        );
      } else {
        return 0;
      }
    },
  },
};
</script>

<style scoped>
.read-progress-container {
  width: 100%;
  background-color: transparent;
  position: fixed;
  display: block;
  z-index: 9999;
  top: 0px;
  left: 0;
}
.read-progress-container .read-progress-bar {
  display: block;
  width: 0%;
  height: inherit;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
</style>
