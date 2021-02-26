<template>
  <div style="font-size: 10px" class="mt-3 mb-2">
    <!-- <span v-if="showText">Tags:&nbsp;&nbsp;</span> -->
    <span v-for="(tag, index) in item.tags" :key="index">
      <v-chip
        x-small
        class="mr-1"
        @click.stop.prevent="
          $router.push(`/tags/${tag.slug}/`).catch((err) => {
            $vuetify.goTo(0);
          })
        "
      >
        {{ tag.title }}
      </v-chip>
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
