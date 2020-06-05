<template>
  <div class="home">
    {{ $myApp }}
    <div v-html="test"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      test: `<div x-data="{ open: false }">
      <button @click="open = true">Open Dropdown</button>

     
      <ul x-show="open" @click.away="open = false">
        Dropdown Body
      </ul>
    </div>`,
    };
  },
};
</script>
