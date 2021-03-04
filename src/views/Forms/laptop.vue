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
                  <h1 class="mb-6">ICJIA Laptop Request</h1>
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
                  <v-col cols="12" md="4">
                    <h2 class="mt-5">Pickup Date:</h2>
                    <Datepicker
                      refName="pickup_date"
                      @pickup_date="getFieldData"
                      label="Date required"
                      :key="render"
                    ></Datepicker>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2 class="mt-5 mb-8">Pickup time:</h2>
                    <v-select
                      :items="pickup_intervals"
                      class="heavy"
                      label="Select pickup time"
                      dense
                      v-if="pickup_intervals"
                      v-model="pickup_time"
                      aria-label="Select Pickup Time"
                      prepend-icon="mdi-clock"
                      :error-messages="pickupTimeErrors"
                      @input="$v.pickup_time.$touch()"
                      @change="$v.pickup_time.$touch()"
                      @blur="$v.pickup_time.$touch()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="4">
                    <h2 class="mt-5">Return date:</h2>
                    <Datepicker
                      refName="return_date"
                      @return_date="getFieldData"
                      label="Date to Return"
                      :key="render"
                      class="heavy"
                    ></Datepicker> </v-col
                ></v-row>
                <v-row class="mt-10">
                  <v-col>
                    <h2 class="mt-5">Requested accessories:</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    v-for="(accessory, index) in accessories"
                    :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-checkbox
                      v-model="accessories_requested"
                      :label="accessory"
                      :value="accessory"
                      class="heavy"
                    ></v-checkbox>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <h2 class="mt-10">Additional Requests:</h2>
                    <v-textarea
                      v-model="comment"
                      auto-grow
                      filled
                      label="Requests"
                      rows="10"
                      class="mt-3"
                      @click="clearAxiosError"
                      ref="comment"
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
              <div
                v-if="$v.$anyError"
                style="color: red; font-weight: bold"
                class="mt-5 text-center"
              >
                The form has errors. Please double-check.
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
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
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
    this.pickup_intervals = generateHours();
  },

  validations: {
    name: { required },
    email: { required, email },
    unit: { required },
    pickup_time: { required },
  },
  data() {
    return {
      name: "",
      email: this.$store.state.auth.userMeta.email || null,
      unit: "",
      comment: "",
      pickup_time: "8:00 AM",
      pickup_intervals: null,
      dates: [],
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
      accessories: [" Bag", " Power Cord", " Verizon Air Card", " Mouse"],
      accessories_requested: [],
    };
  },
  computed: {
    title() {
      return "Laptop Request";
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
    pickupTimeErrors() {
      const errors = [];
      if (!this.$v.pickup_time.$dirty) return errors;
      !this.$v.pickup_time.required && errors.push("Pickup time is required");
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
          comment: this.comment,
          accessories_requested: this.accessories_requested,
        };

        let dates = {
          pickup_date: this.pickup_date,
          pickup_time: this.pickup_time,
          return_date: this.return_date,
        };
        this.form = { ...text, ...dates };

        let options = {
          method: "POST",
          data: this.form,
          url: "https://mail.icjia.cloud/intranet/laptop",
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
      this.pickup_time = "";
      this.accessories_requested = [];
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
