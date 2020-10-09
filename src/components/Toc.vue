<template>
  <div>
    <div>Table of Contents</div>
    <!-- <ul class="toc-list">
      <li v-for="(item, index) in toc" :key="index">
        <span :id="`scrollTo-${item.id}`" class="tocItem">{{ item.text }}</span>
      </li>
    </ul> -->
    {{ toc }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      toc: [],
    };
  },
  async mounted() {
    await this.setToc();
  },
  methods: {
    scrollTo(id) {
      //console.log(id);
      this.$vuetify.goTo(`#${id}`, { offset: 100 });
    },
    setToc() {
      const sections = Array.from(document.querySelectorAll("h2, h3"));
      sections.forEach((section) => {
        let obj = {};
        obj.text = section.innerText;
        obj.id = section.id;
        obj.nodeName = section.nodeName;
        obj.isParent = section.nodeName === "H2" ? true : false;
        this.toc.push(obj);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
