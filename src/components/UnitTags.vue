<template>
  <div>
    <span v-for="(unit, index) in units" :key="`unit-${index}`">
      <span
        class="tag hover"
        @click.prevent.stop="$router.push(`/units/${unit.slug}`)"
        >{{ unit.title }}</span
      >
    </span>
  </div>
</template>

<script>
export default {
  props: {
    units: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.tags {
  list-style: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
}

.tags li {
  float: left;
}

.tag {
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #222;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
  font-weight: 900;
  -webkit-transition: color 0.2s;
}

.tag::before {
  background: #fff;
  border-radius: 10px;
  box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
  content: "";
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
  top: 10px;
}

.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: "";
  position: absolute;
  right: 0;
  top: 0;
}

.tag:hover {
  background-color: #aaa;
  color: white;
}

.tag:hover::after {
  border-left-color: #aaa;
}
</style>
