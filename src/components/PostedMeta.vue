<template>
  <div>
    <span v-if="showUpdatedInText">
      <span style="font-weight: 900" v-if="postedMeta.showUpdated"
        >Updated: {{ postedMeta.updated_at | format }}&nbsp;//&nbsp;</span
      ></span
    >Posted {{ postedMeta.created_at | format }} by {{ postedMeta.firstname }}
    {{ postedMeta.lastname }}
  </div>
</template>

<script>
import moment from "moment";
export default {
  computed: {
    postedMeta() {
      let obj = {};
      obj.created_at = this.meta.created_at;
      obj.updated_at = this.meta.updated_at;
      obj.firstname =
        (this.meta.created_by && this.meta.created_by.firstname) || "Intranet";
      obj.lastname =
        (this.meta.created_by && this.meta.created_by.lastname) ||
        "Administrator";
      let start = moment(this.meta.created_at);
      let end = moment(this.meta.updated_at);
      let duration = moment.duration(end.diff(start));
      obj.showUpdated =
        duration.asHours() > this.$myApp.config.hoursToShowUpdated;
      obj.hoursSinceCreated = duration.asHours();

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
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
