<template>
  <div class="markdown-body page-form">
    <v-container :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h1 class="mb-6">Contact ICJIA Web Support</h1>
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
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      filled
                      label="Please provide as much detail as possible"
                      rows="10"
                      class="mt-3"
                      @click="clearAxiosError"
                      ref="comment"
                      aria-label="Request"
                      :error-messages="commentErrors"
                      @input="$v.comment.$touch()"
                      @change="$v.comment.$touch()"
                      @blur="$v.comment.$touch()"
                    ></v-textarea>
                    <!-- <div v-if="formData">
                      {{ formData }}
                    </div> -->
                  </v-col>
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
                <div class="my-3">
                  &laquo; <router-link to="/login/">Back to login</router-link>
                </div>
              </div>
              <div
                v-if="showAxiosError"
                style="color: red; font-size: 14px"
                class="mt-10 text-center"
              >
                <b style="font-size: 20px">WEB SUPPORT REQUEST NOT SENT</b>
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
import { required, email } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";
import { generateHours } from "@/services/Utils";
import { dbInsert } from "@/services/Forms";
// import NProgress from "nprogress";

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
    comment: { required },
  },
  data() {
    return {
      name: "",
      email: null,
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
    };
  },
  computed: {
    title() {
      return "Technical Support Request";
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
    commentErrors() {
      const errors = [];
      if (!this.$v.comment.$dirty) return errors;
      !this.$v.comment.required && errors.push("Comment is required");
      return errors;
    },

    // eslint-disable-next-line no-unused-vars
    isSuccess(v) {
      return !this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
    async recaptcha() {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded();

      // Execute reCAPTCHA with action "login".
      const token = await this.$recaptcha("login");

      // Do stuff with the received token.
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
          type: "Technical Support Request",
          name: this.name,
          email: this.email,
          unit: this.unit,
          comment: this.comment,
        };

        let options = {
          method: "POST",
          data: this.form,
          url: "https://mail.icjia.cloud/intranet/web",
        };

        // let dbResponse = await dbInsert(this.$store.state.auth.jwt, this.form);
        // console.log("dbinsert: ", dbResponse);

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
      this.$v.$reset();
      this.showSubmit = true;
      this.name = "";
      this.email = null;
      this.comment = "";
      this.unit = "";
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
      this.form = null;
      this.reload();
    },
  },
};
</script>

<style scoped>
.grecaptcha-badge {
  display: block !important;
}
</style>
