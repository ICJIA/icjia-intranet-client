<template>
  <div>
    <v-row>
      <v-col>
        <div v-for="(v, index) in $v.supplies.$each.$iter" :key="index">
          <div class="form-group">
            <v-row>
              <v-col cols="12" sm="2">
                <v-text-field
                  label="Quantity"
                  v-model.trim="v.quantity.$model"
                  :error-messages="quantityErrors(v)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="10">
                <v-text-field
                  label="Description"
                  v-model.trim="v.description.$model"
                  :error-messages="descriptionErrors(v)"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>

    <div class="text-center">
      <v-btn
        small
        :disabled="!isValid"
        @click="supplies.push({ quantity: 0, description: '' })"
      >
        Add
      </v-btn>
      <v-btn small @click="supplies.pop()" v-if="supplies.length > 1"
        >Remove</v-btn
      >
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";

import { required, integer } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  computed: {
    isValid() {
      return !this.$v.$invalid;
    },
  },
  methods: {
    quantityErrors(v) {
      const errors = [];
      if (!this.$v.supplies.$anyDirty) return errors;
      !v.quantity.required && errors.push("Quantity is required.");
      !v.quantity.integer && errors.push("Quantity must be a number.");
      return errors;
    },
    descriptionErrors(v) {
      const errors = [];
      if (!this.$v.supplies.$anyDirty) return errors;
      !v.description.required && errors.push("Description is required.");
      return errors;
    },
  },
  data() {
    return {
      supplies: [
        {
          quantity: 0,
          description: "",
        },
      ],
    };
  },
  validations: {
    supplies: {
      required,
      $each: {
        quantity: {
          required,
          integer,
        },
        description: {
          required,
        },
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
