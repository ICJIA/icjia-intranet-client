<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-menu
          v-model="required"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="computeddateRequiredFormatted"
              label="Date requested"
              persistent-hint
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              ref="dateRequired"
              :id="$id('dateRequired')"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateRequired"
            no-title
            @input="required = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dateRequired: new Date().toISOString().substr(0, 10),
      dateRequiredFormatted: this.formatDate(
        new Date().toISOString().substr(0, 10)
      ),
      required: false,
    };
  },

  computed: {
    computeddateRequiredFormatted() {
      return this.formatDate(this.dateRequired);
    },
  },

  watch: {
    dateRequired() {
      this.dateRequiredFormatted = this.formatDate(this.dateRequired);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
  },
};
</script>
