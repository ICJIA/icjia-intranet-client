<template>
  <v-menu
    v-model="required"
    :close-on-content-click="true"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="computedDateFieldFormatted"
        :label="label"
        persistent-hint
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :ref="refName"
        :class="{ heavy: heavy }"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dateField"
      no-title
      @input="required = false"
    ></v-date-picker>
  </v-menu>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      dateField: new Date().toISOString().substr(0, 10),
      dateFieldFormatted: this.formatDate(
        new Date().toISOString().substr(0, 10)
      ),
      required: false,
    };
  },

  computed: {
    computedDateFieldFormatted() {
      //console.log("click from child");
      let obj = {
        refName: this.refName,
        value: this.formatDate(this.dateField),
      };
      this.$emit(this.refName, obj);
      return this.formatDate(this.dateField);
    },
  },

  watch: {
    dateField() {
      this.dateFieldFormatted = this.formatDate(this.dateField);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      // const [year, month, day] = date.split("-");
      // return `${month}/${day}/${year}`;
      return moment(date).format(this.format);
    },
    sendData() {
      //console.log("click from child");
      this.$emit(this.refName, this.dateFieldFormatted);
    },
  },
  props: {
    refName: {
      type: String,
      required: true,
      default: null,
    },
    label: {
      type: String,
      required: true,
      default: "Default Label",
    },
    format: {
      type: String,
      required: false,
      default: "dddd, MMMM Do, YYYY",
    },
    heavy: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
