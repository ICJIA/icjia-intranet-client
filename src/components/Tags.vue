<template>
  <div style="font-size: 12px; border-top: 1px solid #ccc" class="pt-4">
    <b>File under:&nbsp;&nbsp;</b>
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
  },
};
</script>
