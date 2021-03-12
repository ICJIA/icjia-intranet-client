<template>
  <span>
    <span v-if="showUpdatedInText">
      <span v-if="postedMeta.showUpdated"
        >Updated: <strong>{{ postedMeta.updated_at | format }}</strong>

        &nbsp;|&nbsp;</span
      ></span
    ><span v-if="postedMeta.showUpdated"></span
    ><span style="font-weight: 400">{{
      postedMeta.published_at | format
    }}</span>
  </span>
</template>

<script>
import { dateDiff } from "@/services/DateTime";
export default {
  computed: {
    postedMeta() {
      let obj = {};
      obj.published_at = this.meta.published_at;
      obj.updated_at = this.meta.updated_at;

      if (dateDiff(obj.published_at, obj.updated_at, "hours") > 12) {
        obj.showUpdated = true;
      } else {
        obj.showUpdated = false;
      }
      return obj;
    },
  },
  props: {
    meta: {
      type: Object,
      default: () => {},
    },
    showUpdatedInText: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
