<template>
  <div style="font-size: 10px" class="mt-3 mb-2">
    <!-- <span v-if="showText">Tags:&nbsp;&nbsp;</span> -->
    <span v-for="(tag, index) in tags" :key="index">
      <v-chip x-small class="mr-1">
        <router-link
          :to="`/tags/${tag.slug}/`"
          style="background: none !important"
          >{{ tag.title }}</router-link
        >
      </v-chip>
      <!-- <span v-if="index != tags.length - 1">,</span> -->
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
