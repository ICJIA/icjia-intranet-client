<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <v-container>
              <v-row>
                <v-col class="text-center">
                  <h1 class="mb-6">Technical Support Request</h1>
                </v-col>
              </v-row>
            </v-container>
            <form style="margin-top: 0px">
              <v-container>
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
              </v-container>

              <v-textarea
                v-model="comment"
                :error-messages="commentErrors"
                auto-grow
                filled
                required
                label="Technical support request"
                rows="10"
                class="mt-3"
                @click="clearAxiosError"
              ></v-textarea>

              <div v-if="showSubmit" class="text-xs-center">
                <v-btn @click="submit" color="green">submit</v-btn>
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
                <b style="font-size: 20px">SUPPORT REQUEST NOT SENT</b>
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
import axios from "axios";

export default {
  mixins: [validationMixin],

  head() {
    return {};
  },
  mounted() {
    console.log(this.$store.state.auth.userMeta);
  },

  validations: {
    name: { required },
    email: { required, email },
    comment: { required },
  },
  data() {
    return {
      name: "",
      email: this.$store.state.auth.userMeta.email || null,
      comment: "",
      showSubmit: true,
      showAxiosError: false,
      axiosError: "",
      showLoader: false,
      id: "",
      successMessage: "",
      isIE: null,
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
    commentErrors() {
      const errors = [];
      if (!this.$v.comment.$dirty) return errors;
      !this.$v.comment.required && errors.push("A request is required");
      return errors;
    },
    // eslint-disable-next-line no-unused-vars
    isSuccess(v) {
      return !this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
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

        let data = {
          name: this.name,
          email: this.email,
          comment: this.comment,
        };
        //console.log("submit: ", data);

        const vm = this;
        // eslint-disable-next-line no-unused-vars
        let obj = axios({
          method: "post",
          url: "http://localhost:5050/intranet/support",
          data: data,
          config: { headers: { "Content-Type": "multipart/form-data" } },
        })
          .then(function (response) {
            //handle success
            //console.log(response.data)
            console.log("SUCCESS!", response.data.status, response.data.msg);
            vm.showSubmit = false;
            vm.showAxiosError = false;
            vm.showError = "";
            vm.successMessage = response.data.msg;
            vm.showLoader = false;
          })
          .catch(function (err) {
            //handle error
            //console.log(err)
            console.log("FAILED...", err);
            vm.showAxiosError = true;
            vm.axiosError = err;
            vm.showLoader = false;
            vm.$forceUpdate();
          });
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = this.$store.state.auth.userMeta.email || null;
      this.comment = "";
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
    },
  },
};
</script>
