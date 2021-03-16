<template>
  <div class="markdown-body page-form">
    <Breadcrumb
      :key="$route.path"
      :title="title"
      subPath="Forms"
      subPathURL="/forms/"
    ></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h1 class="mb-6">{{ title }}</h1>
                </v-col>
              </v-row>
            </v-container>
            <form style="margin-top: 0px">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h2>Information:</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="name"
                      class="heavy"
                      :error-messages="nameErrors"
                      label="Name"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="email"
                      class="heavy"
                      :error-messages="emailErrors"
                      label="E-mail"
                      required
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select
                      :items="units"
                      label="Select Unit"
                      dense
                      v-if="units"
                      v-model="unit"
                      class="heavy"
                      aria-label="Select Unit"
                      :error-messages="unitErrors"
                      @input="$v.unit.$touch()"
                      @change="$v.unit.$touch()"
                      @blur="$v.unit.$touch()"
                    ></v-select
                  ></v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h2>Supplies:</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div
                      v-for="(v, index) in $v.supplies.$each.$iter"
                      :key="index"
                    >
                      <div class="form-group">
                        <v-row>
                          <v-col cols="12" sm="2">
                            <v-text-field
                              label="Quantity"
                              v-model.trim="v.quantity.$model"
                              :error-messages="quantityErrors(v)"
                              @input="$v.supplies.$touch()"
                              @blur="$v.supplies.$touch()"
                              @click="clearAxiosError"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="9">
                            <v-text-field
                              label="Description"
                              v-model.trim="v.description.$model"
                              :error-messages="descriptionErrors(v)"
                              @input="$v.supplies.$touch()"
                              @blur="$v.supplies.$touch()"
                              @click="clearAxiosError"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="1"
                            v-if="
                              !descriptionErrors(v).length &&
                              !quantityErrors(v).length &&
                              $v.supplies.$anyDirty
                            "
                          >
                            <div style="padding-top: 19px; margin-left: -10px">
                              <v-icon
                                large
                                color="green"
                                style="font-weight: 900"
                                >check_box</v-icon
                              >
                            </div>
                          </v-col>
                        </v-row>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div class="text-center">
                      <v-btn
                        small
                        class="mr-2"
                        @click="
                          supplies.push({ quantity: '', description: '' })
                        "
                        :disabled="$v.supplies.$invalid"
                      >
                        Add Another item
                      </v-btn>

                      <v-btn
                        small
                        class="ml-2"
                        @click="supplies.pop()"
                        :disabled="supplies.length <= 1"
                        >Remove</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h2>Additional Comments:</h2>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      filled
                      label="Additional comments"
                      rows="10"
                      class="mt-3"
                      @click="clearAxiosError"
                      ref="comment"
                      aria-label="Request"
                    ></v-textarea>
                    <!-- <div v-if="form">
                      {{ form }}
                    </div> -->
                  </v-col>
                </v-row>
                <v-row>
                  <v-col> </v-col>
                </v-row>
              </v-container>

              <div v-if="showSubmit" class="text-center">
                <v-btn @click="submit" dark color="blue darken-4">submit</v-btn>
                <v-btn @click="clear" class="ml-2">clear</v-btn>&nbsp;
                <span v-if="showLoader">
                  <v-progress-circular
                    indeterminate
                    aria-label="Progress bar: Loading"
                    color="primary"
                  ></v-progress-circular>
                </span>
              </div>

              <div v-if="!showSubmit" class="text-center" style="color: green">
                {{ successMessage }}
              </div>
              <div
                v-if="showAxiosError"
                style="color: red; font-size: 14px"
                class="mt-10 text-center"
              >
                <b style="font-size: 20px">SUPPORT REQUEST NOT SENT</b>
                <br />
                <br />
                {{ axiosError }}
              </div>
              <div
                v-if="$v.$anyError"
                style="color: red; font-weight: bold"
                class="mt-5 text-center"
              >
                The form has errors.
              </div>
              .
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { validationMixin } from "vuelidate";
import { required, email, integer } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";
import { generateHours } from "@/services/Utils";
import { dbInsert } from "@/services/Forms";

//const config = require("@/config.json");
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  mixins: [validationMixin],

  head() {
    return {};
  },
  mounted() {
    this.units = this.$myApp.units.map((unit) => {
      let obj = {};
      obj.text = `${unit.title}`;
      obj.value = unit.title;
      return obj;
    });
    this.pickup_intervals = generateHours();
  },

  validations: {
    name: { required },
    email: { required, email },
    unit: { required },

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
  data() {
    return {
      name: "",
      email: this.$store.state.auth.userMeta.email || null,
      unit: "",
      comment: "",
      form: null,
      showSubmit: true,
      showAxiosError: false,
      axiosError: "",
      showLoader: false,
      id: "",
      successMessage: "",
      isIE: null,
      units: null,
      render: false,
      counter: 0,
      supplies: [
        {
          quantity: "",
          description: "",
        },
      ],
    };
  },
  computed: {
    title() {
      return "ICJIA Office Supply Request";
    },

    permalink() {
      return null;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    unitErrors() {
      const errors = [];
      if (!this.$v.unit.$dirty) return errors;
      !this.$v.unit.required && errors.push("Unit is required");
      return errors;
    },

    // eslint-disable-next-line no-unused-vars
    isSuccess(v) {
      return !this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
    clearSupplies() {
      this.supplies = [
        {
          quantity: "",
          description: "",
        },
      ];
    },
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

    getFieldData(v) {
      //console.log("value: ", v);
      this[v.refName] = v.value;
      //console.log(this[v.refName]);
    },
    clearAxiosError() {
      return (this.showAxiosError = false);
    },
    async reload() {
      this.render = false;
      await this.$nextTick();
      this.render = true;
    },

    async submit() {
      this.$v.$touch();
      this.showAxiosError = false;
      if (this.isSuccess) {
        window.NProgress.start();
        this.showLoader = true;
        // sanitize comment, then strip html
        const cleanComment = DOMPurify.sanitize(this.comment).replace(
          /(<([^>]+)>)/gi,
          ""
        );
        this.comment = cleanComment;
        this.form = {
          type: "Office Supply Request",
          name: this.name,
          email: this.email,
          unit: this.unit,
          comment: this.comment,
          supplies: JSON.stringify(this.supplies),
        };

        let options = {
          method: "POST",
          data: this.form,
          url: "https://mail.icjia.cloud/intranet/supplies",
        };

        let dbResponse = await dbInsert(this.$store.state.auth.jwt, this.form);
        console.log("dbinsert: ", dbResponse);

        try {
          let res = await axios(options);
          this.success(res);
        } catch (err) {
          this.failed(err);
        }
      }
    },
    failed(res) {
      console.log("email: ", res);
      this.showAxiosError = true;
      this.axiosError = res;
      this.showLoader = false;
      window.NProgress.done();
      this.reload();
    },
    success(res) {
      console.log("email: ", res);
      this.showSubmit = false;
      this.showAxiosError = false;
      this.showError = "";
      this.successMessage = res.data.msg;
      this.showLoader = false;
      window.NProgress.done();
      this.reload();
    },
    clear() {
      this.showSubmit = true;
      this.name = "";
      this.email = this.$store.state.auth.userMeta.email || null;
      this.comment = "";
      this.unit = "";
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
      this.form = null;
      this.clearSupplies();
      this.reload();
      this.$v.$reset();
    },
  },
};
</script>

<style></style>
