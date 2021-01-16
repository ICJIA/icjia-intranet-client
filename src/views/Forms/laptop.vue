<template>
  <div class="markdown-body">
    <v-container>
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <v-container>
              <v-row>
                <v-col class="text-center">
                  <h1 class="mb-6">Laptop Request</h1>
                </v-col>
              </v-row>
            </v-container>
            <form style="margin-top: 0px">
              <v-container>
                <v-row>
                  <v-col>
                    <h2>Information</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="name"
                      :error-messages="nameErrors"
                      label="Name"
                      required
                      @input="$v.name.$touch()"
                      @blur="$v.name.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="email"
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
                  <v-col>
                    <v-select
                      :items="items"
                      label="Select Unit"
                      dense
                      solo
                      v-if="items"
                      v-model="unit"
                      aria-label="Select Unit"
                      :error-messages="unitErrors"
                      @input="$v.unit.$touch()"
                      @change="$v.unit.$touch()"
                      @blur="$v.unit.$touch()"
                    ></v-select
                  ></v-col>
                </v-row>

                <v-row>
                  <v-col>
                    <h2 class="mt-5">Date required?</h2>
                    <Datepicker
                      refName="required"
                      @required="getFieldData"
                      label="Date required"
                    ></Datepicker>
                  </v-col>
                  <v-col>
                    <h2 class="mt-5">Return on:</h2>
                    <Datepicker
                      refName="returned"
                      @returned="getFieldData"
                      label="Date Returned"
                    ></Datepicker> </v-col
                ></v-row>
              </v-container>

              <v-textarea
                v-model="comment"
                auto-grow
                filled
                label="Additional Comments or special requests"
                rows="10"
                class="mt-3"
                @click="clearAxiosError"
                ref="comment"
              ></v-textarea>
              <div v-if="formData">
                {{ formData }}
              </div>

              <div v-if="showSubmit" class="text-center">
                <v-btn @click="submit" dark color="blue darken-4">submit</v-btn>
                <v-btn @click="clear" class="ml-2">clear</v-btn>&nbsp;
                <span v-if="showLoader">
                  <v-progress-circular
                    indeterminate
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
                class="mt-3 text-center"
              >
                <b style="font-size: 20px">LAPTOP REQUEST NOT SENT</b>
                <br />
                <br />
                {{ axiosError }}
              </div>
            </form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";

//const config = require("@/config.json");
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  mixins: [validationMixin],

  head() {
    return {};
  },
  mounted() {
    this.items = this.$myApp.units.map((unit) => {
      let obj = {};
      obj.text = `${unit.title}`;
      obj.value = unit.title;
      return obj;
    });
  },

  validations: {
    name: { required },
    email: { required, email },
    unit: { required },
  },
  data() {
    return {
      name: "Test Name",
      email: this.$store.state.auth.userMeta.email || null,
      unit: "Information Systems Unit",
      comment: "",
      dates: [],
      formData: null,
      showSubmit: true,
      showAxiosError: false,
      axiosError: "",
      showLoader: false,
      id: "",
      successMessage: "",
      isIE: null,
      items: null,
    };
  },
  computed: {
    title() {
      return "Contact the Admin";
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
    getFieldData(v) {
      //console.log("value: ", v);
      this[v.refName] = v.value;
      //console.log(this[v.refName]);
    },
    clearAxiosError() {
      return (this.showAxiosError = false);
    },

    submit() {
      this.$v.$touch();

      if (this.isSuccess) {
        this.showLoader = true;
        // sanitize comment, then strip html
        const cleanComment = DOMPurify.sanitize(this.comment).replace(
          /(<([^>]+)>)/gi,
          ""
        );

        this.comment = cleanComment;

        let form = {
          name: this.name,
          email: this.email,
          unit: this.unit,
          comment: this.comment,
        };

        let dates = {
          required: this.required,
          returned: this.returned,
        };

        this.formData = { ...form, ...dates };
        console.table(this.formData);
        // console.log("submit: ", data);
        this.showLoader = false;

        // const vm = this;
        // // eslint-disable-next-line no-unused-vars
        // let obj = axios({
        //   method: "post",
        //   url: "http://localhost:5050/intranet/support",
        //   data: formData,
        //   config: { headers: { "Content-Type": "multipart/form-data" } },
        // })
        //   .then(function (response) {
        //     //handle success
        //     //console.log(response.data)
        //     console.log("SUCCESS!", response.data.status, response.data.msg);
        //     vm.showSubmit = false;
        //     vm.showAxiosError = false;
        //     vm.showError = "";
        //     vm.successMessage = response.data.msg;
        //     vm.showLoader = false;
        //   })
        //   .catch(function (err) {
        //     //handle error
        //     //console.log(err)
        //     console.log("FAILED...", err);
        //     vm.showAxiosError = true;
        //     vm.axiosError = err;
        //     vm.showLoader = false;
        //     vm.$forceUpdate();
        //   });
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = this.$store.state.auth.userMeta.email || null;
      this.comment = "";
      this.unit = "";
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
      this.formData = null;
    },
  },
};
</script>
