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
            <div v-if="mode">Mode: {{ mode }}</div>

            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h1 class="mb-6">Your Profile</h1>
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
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="firstName"
                      class="heavy"
                      :error-messages="firstNameErrors"
                      label="First Name"
                      required
                      @input="$v.firstName.$touch()"
                      @blur="$v.firstName.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="lastName"
                      class="heavy"
                      :error-messages="lastNameErrors"
                      label="Last Name"
                      required
                      @input="$v.lastName.$touch()"
                      @blur="$v.lastName.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="email"
                      class="heavy"
                      label="E-mail"
                      disabled
                      required
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
                    <!-- <div
                      style="font-size: 12px; margin-top: -25px"
                      class="text-left mb-2"
                    >
                      For a full-featured markdown editor, please see:
                      https://markdown.icjia.cloud
                    </div> -->
                    <v-app-bar
                      dense
                      flat
                      color="grey darken-1"
                      style="margin-bottom: 0px !important"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        x-small
                        v-if="markdownMode"
                        @click="markdownMode = !markdownMode"
                        >Web Preview
                      </v-btn>
                      <v-btn
                        x-small
                        v-else
                        @click="markdownMode = !markdownMode"
                        >Markdown Editor</v-btn
                      >
                    </v-app-bar>
                    <v-textarea
                      v-model="bio"
                      v-if="markdownMode"
                      height="300px"
                      auto-grow
                      filled
                      label="Enter your biographical information"
                      rows="10"
                      @click="clearAxiosError"
                      ref="bio"
                      aria-label="Biography Information"
                    ></v-textarea>
                    <div
                      v-else
                      style="height: 300px; border: 1px solid #eee"
                      class="markdown-body py-6 px-5"
                      v-html="renderMarkdown(bio)"
                    ></div>
                  </v-col>
                </v-row>
              </v-container>

              <div v-if="showSubmit" class="text-center">
                <v-btn @click="submit" dark color="blue darken-4">{{
                  mode
                }}</v-btn>
                <!-- <v-btn @click="clear" class="ml-2">clear</v-btn>&nbsp; -->
                <span v-if="showLoader">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </span>
              </div>

              <div>
                {{ form }}
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
import { required, email } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";
import { dbInsert, getUserProfile } from "@/services/Forms";
import { renderToHtml } from "@/services/Markdown";
// import NProgress from "nprogress";

//const config = require("@/config.json");
// eslint-disable-next-line no-unused-vars
import axios from "axios";

export default {
  mixins: [validationMixin],

  head() {
    return {};
  },
  async mounted() {
    this.units = this.$myApp.units.map((unit) => {
      let obj = {};
      obj.text = `${unit.title}`;
      obj.value = unit.id;
      return obj;
    });
    this.getProfile();
  },

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    unit: { required },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      id: null,
      mode: null,
      email: this.$store.state.auth.userMeta.email || null,
      unit: "",
      bio: "",
      form: null,
      showSubmit: true,
      showAxiosError: false,
      axiosError: "",
      showLoader: false,
      markdownMode: true,
      successMessage: "",
      isIE: null,
      units: null,
      render: false,
    };
  },
  computed: {
    title() {
      return "User Profile";
    },

    permalink() {
      return null;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First name is required.");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last name is required.");
      return errors;
    },

    unitErrors() {
      const errors = [];
      if (!this.$v.unit.$dirty) return errors;
      !this.$v.unit.required && errors.push("Unit is required");
      return errors;
    },
    // bioErrors() {
    //   const errors = [];
    //   if (!this.$v.bio.$dirty) return errors;
    //   !this.$v.bio.required && errors.push("Biography is required");
    //   return errors;
    // },

    // eslint-disable-next-line no-unused-vars
    isSuccess(v) {
      return !this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
    renderMarkdown(content) {
      return renderToHtml(content);
    },
    async getProfile() {
      let { data } = await getUserProfile(
        this.$store.state.auth.jwt,
        this.email
      );
      if (data.length) {
        this.mode = "update";
        let {
          firstName = null,
          lastName = null,
          unit = null,
          bio = null,
        } = data[0];
        this.firstName = firstName;
        this.lastName = lastName;
        this.bio = bio;
        if (unit) {
          this.unit = JSON.stringify(unit.id);
        }
        console.log(this.firstName, this.lastName, this.unit, this.bio);
      } else {
        this.mode = "create";
      }
      console.log("userProfile: ", data);
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

        this.form = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          unit: this.unit,
          bio: this.bio,
        };

        // let options = {
        //   method: "POST",
        //   data: this.form,
        //   url: "https://mail.icjia.cloud/intranet/support",
        // };

        // let dbResponse = await dbInsert(this.$store.state.auth.jwt, this.form);
        // console.log("dbinsert: ", dbResponse);

        // try {
        //   let res = await axios(options);
        //   this.success(res);
        // } catch (err) {
        //   this.failed(err);
        // }
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
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
      window.NProgress.done();
      this.reload();
    },
  },
};
</script>

<style></style>
