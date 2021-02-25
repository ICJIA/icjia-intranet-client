<template>
  <div style="font-size: 10px" class="pt-4">
    <!-- <span v-if="showText">Tags:&nbsp;&nbsp;</span> -->
    <span v-for="(tag, index) in tags" :key="index">
      <router-link :to="`/tags/${tag.slug}/`">{{ tag.title }}</router-link
      ><span v-if="index != tags.length - 1">,</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
