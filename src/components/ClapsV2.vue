<template>
  <div class="text-center" style="margin-top: 100px">
    <div style="position: relative">
      <button id="clap" class="clap">
        <span>
          <!--  SVG Created by Luis Durazo from the Noun Project  -->
          <svg
            id="clap--icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-549 338 100.1 125"
          >
            <path
              d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z"
            />
            <path
              d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9"
            />
          </svg>
        </span>
        <span id="clap--count" class="clap--count"></span>
        <span id="clap--count-total" class="clap--count-total">{{
          clapTotalCount
        }}</span>
      </button>

      <div
        style="font-size: 12px; font-weight: 500"
        class="px-3 mt-5"
        v-if="clapCount >= clapMax"
      >
        You've maxed out your applause for this post. <br />Thank you!
      </div>
      <div style="font-size: 12px; font-weight: 300" class="mt-5" v-else>
        Like this page? Find it useful? Give it a clap!<br />(Or two or three
        ...)
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
//import { getClaps, createClapEntry, updateClapEntry } from "@/services/Claps";
import { getClapCount, updateClapCount } from "@/services/ClapsV2";
import { EventBus } from "@/event-bus";
//import { MD5 } from "@/utils";
export default {
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      this.getInitialNumberOfClaps();
      const clapTotalCount = document.getElementById("clap--count-total");
      clapTotalCount.innerHTML = this.initialNumberOfClaps;
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
  },
  computed: {
    localStorageKey() {
      return this.localStoragePrefix + this.pageID;
    },
  },
  data() {
    return {
      clapCount: 0,

      claps: null,
      initialNumberOfClaps: null,
      clapMax: 125,
      clapTotalCount: null,
      startup: true,
    };
  },
  methods: {
    async getUserClaps() {
      let numberOfClaps;
      console.log("Get user clap count from session storage");
      if (localStorage.getItem(this.localStorageKey) === null) {
        console.log("user has not clapped");
        localStorage.setItem(this.localStorageKey, Number(0));
        numberOfClaps = 0;
      } else {
        console.log(
          "user has already clapped: ",
          localStorage.getItem(this.localStorageKey),
          " times."
        );
        numberOfClaps = Number(localStorage.getItem(this.localStorageKey));
      }
      return numberOfClaps;
    },

    async getInitialNumberOfClaps() {
      console.log(this.id);
      window.NProgress.start();
      let initialNumberOfClaps;

      let res = await getClapCount(this.$store.state.auth.jwt, this.id);
      console.log("claps: ", res.data.data.posts[0].claps);
      initialNumberOfClaps = res.data.data.posts[0].claps;

      window.NProgress.done();
      this.clapTotalCount = initialNumberOfClaps;
      console.log("initial claps: ", initialNumberOfClaps);
      return initialNumberOfClaps;
    },
  },
  async created() {},
  async mounted() {
    const vm = this;
    this.initialNumberOfClaps = await this.getInitialNumberOfClaps();
    this.initialNumberOfClaps++;
    console.log("Fetch in component claps", this.initialNumberOfClaps);

    const clap = document.getElementById("clap");
    const clapIcon = document.getElementById("clap--icon");
    const clapCount = document.getElementById("clap--count");
    const clapTotalCount = document.getElementById("clap--count-total");
    clapTotalCount.innerHTML = this.initialNumberOfClaps;
    console.log("dom element set: ", clapTotalCount);

    //const initialNumberOfClaps = this.initialNumberOfClaps;
    const clapMax = this.clapMax;
    const tlDuration = 300;
    let numberOfClaps = await this.getUserClaps();
    this.clapCount = numberOfClaps;
    let clapHold;

    const triangleBurst = new window.mojs.Burst({
      parent: clap,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        scale: 1,
        stroke: "rgba(211,84,0 ,0.5)",
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: window.mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: tlDuration,
      },
    });
    const circleBurst = new window.mojs.Burst({
      parent: clap,
      radius: { 50: 75 },
      angle: 25,
      duration: tlDuration,
      children: {
        shape: "circle",
        fill: "rgba(149,165,166 ,0.5)",
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: window.mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });
    const countAnimation = new window.mojs.Html({
      el: "#clap--count",
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: tlDuration,
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: tlDuration / 2,
    });
    const countTotalAnimation = new window.mojs.Html({
      el: "#clap--count-total",
      isShowStart: false,
      isShowEnd: true,
      opacity: { 0: 1 },
      delay: (3 * tlDuration) / 2,
      duration: tlDuration,
      y: { 0: -3 },
    });
    const scaleButton = new window.mojs.Html({
      el: "#clap",
      duration: tlDuration,
      scale: { 1.3: 1 },
      easing: window.mojs.easing.out,
    });
    clap.style.transform = "scale(1, 1)"; /*Bug1 fix*/

    const animationTimeline = new window.mojs.Timeline();
    animationTimeline.add([
      triangleBurst,
      circleBurst,
      countAnimation,
      countTotalAnimation,
      scaleButton,
    ]);

    const maxAnimationTimeline = new window.mojs.Timeline();
    maxAnimationTimeline.add([countTotalAnimation]);

    const startupTimeline = new window.mojs.Timeline();
    startupTimeline.add([circleBurst, countTotalAnimation]);

    clap.addEventListener("click", function () {
      vm.startup = false;
      repeatClapping();
    });

    clap.addEventListener("mousedown", function () {
      clapHold = setInterval(function () {
        vm.startup = false;
        repeatClapping();
      }, 400);
    });

    clap.addEventListener("mouseup", function () {
      vm.startup = false;
      clearInterval(clapHold);
    });

    function repeatClapping() {
      if (numberOfClaps < clapMax) {
        updateNumberOfClaps();
        animationTimeline.replay();
        clapIcon.classList.add("checked");
      } else {
        clapTotalCount.innerHTML = vm.clapTotalCount;
        maxAnimationTimeline.replay();
        clapIcon.classList.add("checked");
      }
    }

    async function updateNumberOfClaps() {
      console.log("initial: ", vm.initialNumberOfClaps);
      numberOfClaps++;
      vm.clapCount = numberOfClaps;
      clapCount.innerHTML = "+" + numberOfClaps;
      //clapCount.innerHTML = "+1";
      clapTotalCount.innerHTML = vm.initialNumberOfClaps++;
      console.log("clap count set", clapTotalCount.innerHTML);
      localStorage.setItem(vm.localStorageKey, numberOfClaps);
      let dbObj = {
        id: vm.id,
        claps: Number(clapTotalCount.innerHTML),
      };
      vm.clapTotalCount = Number(clapTotalCount.innerHTML);
      let res = await updateClapCount(vm.$store.state.auth.jwt, dbObj, vm.id);
      console.log("dbInsert: ", res);
      EventBus.$emit("updateClaps");
    }
    startupTimeline.replay();
  },
};
</script>

<style lang="scss" scoped>
/*========================
    SASS definitions
  =======================*/
$btn-dimension: 80px;
$primary-color: rgba(189, 195, 199, 1);
$secondary-color: rgb(28, 49, 168);
@mixin debug {
  outline: 1px solid red;
}

/*========================
    BUTTON styles
  =======================*/
.clap {
  position: relative;
  outline: 1px solid transparent;
  border-radius: 50%;
  border: 2px solid $primary-color;
  width: $btn-dimension;
  height: $btn-dimension;
  background: none;
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 50%;
    //border: 1px solid $primary-color;
    width: $btn-dimension - 1px;
    height: $btn-dimension - 1px;
  }
  &:hover {
    cursor: pointer;
    border: 1px solid $secondary-color;
    transition: border-color 0.3s ease-in;
    &:after {
      animation: shockwave 1s ease-in infinite;
    }
  }
  svg {
    width: 40px;
    fill: none;
    stroke: $secondary-color;
    stroke-width: 2px;
    &.checked {
      fill: $secondary-color;
      stroke: #fff;
      stroke-width: 1px;
    }
  }
  .clap--count {
    position: absolute;
    top: -$btn-dimension/1.6;
    left: $btn-dimension/4;
    font-size: 0.8rem;
    color: white;
    background: $secondary-color;
    border-radius: 50%;
    height: $btn-dimension/2;
    width: $btn-dimension/2;
    line-height: $btn-dimension/2;
  }
  .clap--count-total {
    position: absolute;
    font-size: 0.9rem;
    width: $btn-dimension;
    text-align: center;
    left: 0;
    top: -$btn-dimension/2.5;
    color: #777;
    font-weight: 900;
  }
}
</style>
