<template>
  <div class="ml-5">
    <div class="mb-3" style="font-weight: bold">NAVIGATION</div>
    <ul class="hover toc">
      <span v-for="(item, index) in toc" :key="index">
        <li v-if="!item.parent" @click="scrollTo(`${item.target}`)">
          <span :id="`scrollTo-${item.id}`" class="tocItem tocParent">{{
            item.text
          }}</span>
        </li>
        <li v-else @click="scrollTo(`${item.target}`)">
          <ul class="toc">
            <li>
              <span :id="`scrollTo-${item.id}`" class="tocItem tocParent">{{
                item.text
              }}</span>
            </li>
          </ul>
        </li>
      </span>
    </ul>
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
      this.$vuetify.goTo(`#${id}`, { offset: 10 });
    },
    setToc() {
      const sections = Array.from(document.querySelectorAll("h2, h3"));

      let parent;
      sections.forEach((section) => {
        let obj = {};
        obj.text = section.innerText;
        obj.target = section.id;
        obj.nodeName = section.nodeName;
        if (section.nodeName === "H2") {
          parent = section.id;
          obj.parent = null;
        } else {
          obj.parent = parent;
        }
        this.toc.push(obj);
      });
    },
  },
};
</script>

<style>
.divider {
  border-left: 1px solid #ccc;
}

.visible {
  color: #116bb9 !important;
  font-weight: bold;
}
ul.toc {
  list-style: none;
}

ul.toc li {
  margin-left: -10px;
}

li .tocItem:hover {
  color: #aaa;
}

.tocItem {
  font-weight: 700;
}
</style>
