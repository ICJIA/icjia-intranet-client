<template>
  <div class="markdown-body page-form">
    <Breadcrumb
      :key="$route.path"
      :title="title"
      subPath="Forms"
      subPathURL="/forms/"
    ></Breadcrumb>
    <v-container :fluid="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <v-container>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h1 class="mb-6">ICJIA Conference Room Request</h1>
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
                <v-row class="mt-10">
                  <v-col cols="12">
                    <h2>Meeting Information:</h2>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      :items="rooms"
                      label="Select conference room"
                      dense
                      v-if="rooms"
                      v-model="room"
                      class="heavy"
                      aria-label="Conference Room"
                      :error-messages="roomErrors"
                      @input="$v.room.$touch()"
                      @change="$v.room.$touch()"
                      @blur="$v.room.$touch()"
                    ></v-select
                  ></v-col>
                  <v-col cols="12" md="6">
                    <Datepicker
                      refName="start_date"
                      @start_date="getFieldData"
                      label="Meeting start date"
                      :key="render"
                    ></Datepicker>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="time_intervals"
                      class="heavy mt-6"
                      label="Meeting start time"
                      dense
                      v-if="time_intervals"
                      v-model="start_time"
                      aria-label="Select Start Time"
                      prepend-icon="mdi-clock"
                      :error-messages="startTimeErrors"
                      @input="$v.start_time.$touch()"
                      @change="$v.start_time.$touch()"
                      @blur="$v.start_time.$touch()"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-10">
                  <v-col cols="12" md="6">
                    <Datepicker
                      refName="end_date"
                      @end_date="getFieldData"
                      label="Meeting end date"
                      :key="render"
                    ></Datepicker>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="time_intervals"
                      class="heavy mt-6"
                      label="Meeting end time"
                      dense
                      v-if="time_intervals"
                      v-model="end_time"
                      aria-label="Meeting end time"
                      prepend-icon="mdi-clock"
                      :error-messages="endTimeErrors"
                      @input="$v.end_time.$touch()"
                      @change="$v.end_time.$touch()"
                      @blur="$v.end_time.$touch()"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-3">
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="number_attending"
                      class="heavy"
                      label="Number attending"
                      required
                      prepend-icon="people"
                      :error-messages="numberAttendingErrors"
                      @input="$v.number_attending.$touch()"
                      @blur="$v.number_attending.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="cleanup"
                      class="heavy"
                      label="Person responsible for cleanup"
                      required
                      prepend-icon="person"
                      :error-messages="cleanupErrors"
                      @input="$v.cleanup.$touch()"
                      @blur="$v.cleanup.$touch()"
                      @click="clearAxiosError"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <h2 class="mt-10">Comments:</h2>
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      filled
                      label="Please indicate any audio/visual requirements or additional requests"
                      rows="10"
                      class="mt-3"
                      @click="clearAxiosError"
                      ref="comment"
                      aria-label="Additional requests"
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

import { validationMixin } from "vuelidate";
import { required, email, integer } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";
import { generateHours } from "@/services/Utils";
import { dbInsert } from "@/services/Forms";
// import NProgress from "nprogress";
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
    this.time_intervals = generateHours();
  },

  validations: {
    name: { required },
    email: { required, email },
    unit: { required },
    room: { required },
    start_time: { required },
    end_time: { required },
    cleanup: { required },
    number_attending: { required, integer },
  },
  data() {
    return {
      name: "",
      email: this.$store.state.auth.userMeta.email || null,
      unit: "",
      number_attending: null,
      cleanup: null,
      room: null,
      comment: "",
      end_time: null,
      start_time: null,
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
      time_intervals: null,
      rooms: [
        "Large conference room",
        "Small conference room",
        "Building conference room",
      ],
    };
  },
  computed: {
    title() {
      return "Conference Room Request";
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
    roomErrors() {
      const errors = [];
      if (!this.$v.room.$dirty) return errors;
      !this.$v.room.required && errors.push("Conference room is required");
      return errors;
    },
    startTimeErrors() {
      const errors = [];
      if (!this.$v.start_time.$dirty) return errors;
      !this.$v.start_time.required && errors.push("Start time is required");
      return errors;
    },
    endTimeErrors() {
      const errors = [];
      if (!this.$v.end_time.$dirty) return errors;
      !this.$v.end_time.required && errors.push("End time is required");
      return errors;
    },
    numberAttendingErrors() {
      const errors = [];
      if (!this.$v.number_attending.$dirty) return errors;
      !this.$v.number_attending.integer && errors.push("Must be a number");
      !this.$v.number_attending.required &&
        errors.push("Number attending is required");
      return errors;
    },
    cleanupErrors() {
      const errors = [];
      if (!this.$v.cleanup.$dirty) return errors;
      !this.$v.cleanup.required &&
        errors.push("Person responsible for cleanup is required.");
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
    async reload() {
      this.render = false;
      await this.$nextTick();
      this.render = true;
    },

    async submit() {
      this.$v.$touch();

      if (this.isSuccess) {
        window.NProgress.start();
        this.showLoader = true;
        // sanitize comment, then strip html
        const cleanComment = DOMPurify.sanitize(this.comment).replace(
          /(<([^>]+)>)/gi,
          ""
        );

        this.comment = cleanComment;

        let text = {
          type: this.title,
          name: this.name,
          email: this.email,
          unit: this.unit,
          room: this.room,
          number_attending: this.number_attending,
          cleanup: this.cleanup,
          comment: this.comment,
        };

        let dates = {
          start_date: this.start_date,
          start_time: this.start_time,
          end_date: this.end_date,
          end_time: this.end_time,
        };

        this.form = { ...text, ...dates };

        let options = {
          method: "POST",
          data: this.form,
          url: "https://mail.icjia.cloud/intranet/conference",
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
      this.$v.$reset();
      this.name = "";
      this.email = this.$store.state.auth.userMeta.email || null;
      this.comment = "";
      this.unit = "";
      this.room = "";
      this.number_attending = null;
      this.cleanup = null;
      this.end_time = null;
      this.start_time = null;
      this.showAxiosError = false;
      this.axiosError = "";
      this.showLoader = false;
      this.form = null;
      this.reload();
    },
  },
};
</script>

<style></style>
