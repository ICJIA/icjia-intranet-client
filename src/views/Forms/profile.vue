<template>
  <div class="markdown-body page-form">
    <Breadcrumb
      :key="$route.path"
      title="User Profile"
      subPath="Forms"
      subPathURL="/forms/"
    ></Breadcrumb>
    <v-container v-if="isLoading">
      <v-row>
        <v-col>
          <Loader></Loader>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col>
          <v-card class="py-5 px-5 mt-5">
            <!-- <div v-if="mode">Mode: {{ mode }}</div> -->

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
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="email"
                      class="heavy"
                      label="E-mail"
                      disabled
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="phone"
                      class="heavy"
                      label="Office Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="firstName"
                      class="heavy"
                      label="First Name"
                      @click="clearStatusMessages"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="lastName"
                      class="heavy"
                      label="Last Name"
                      required
                      @click="clearStatusMessages"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      :items="units"
                      label="Select Unit"
                      dense
                      v-if="units"
                      v-model="unit"
                      class="heavy"
                      aria-label="Select Unit"
                      @click="clearStatusMessages"
                    ></v-select
                  ></v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      style="margin-top: -13px"
                      v-model="title"
                      class="heavy"
                      label="Job Title"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row class="mt-8">
                  <v-col cols="12">
                    <div
                      style="font-size: 10px; margin-top: -20px"
                      class="text-right mb-2"
                    >
                      For more information about editing your profile in
                      markdown, see:
                      <a
                        href="https://www.markdownguide.org/getting-started/"
                        target="_blank"
                        >https://www.markdownguide.org/</a
                      >
                    </div>
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
                        >Preview
                      </v-btn>
                      <v-btn
                        x-small
                        v-else
                        @click="markdownMode = !markdownMode"
                        >Edit</v-btn
                      >
                    </v-app-bar>

                    <v-textarea
                      v-model="bio"
                      v-if="markdownMode"
                      auto-grow
                      filled
                      label="Enter your biographical information. Markdown allowed."
                      rows="10"
                      @click="clearStatusMessages"
                      ref="bio"
                      aria-label="Biography Information"
                    ></v-textarea>

                    <div
                      v-if="!markdownMode"
                      style="border: 1px solid #eee"
                      class="markdown-body py-6 px-5 mb-8"
                      v-html="renderMarkdown(bio)"
                    ></div>
                  </v-col>
                </v-row>
              </v-container>

              <div class="text-center mt-5">
                <v-btn @click="submit" dark color="blue darken-4">{{
                  mode
                }}</v-btn>
                <!-- <v-btn @click="clear" class="ml-2">clear</v-btn>&nbsp; -->
                <span v-if="showLoader" class="ml-2">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </span>
              </div>

              <!-- <div>
                {{ form }}
              </div> -->

              <div class="text-center mt-3" style="color: green">
                {{ successMessage }}
              </div>
              <div
                v-if="showAxiosError"
                style="color: red; font-size: 14px"
                class="mt-10 text-center"
              >
                <b style="font-size: 20px">USER PROFILE NOT UPDATED</b>
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
const slugs = require("slugs");
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import DOMPurify from "dompurify";
import {
  dbInsert,
  getUserProfile,
  updateUserProfile,
  createUserProfile,
} from "@/services/Forms";
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
    email: { required, email },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      id: null,
      unit: "",
      bio: "",
      slug: null,
      title: "",
      phone: "(312) 793-8550",
      mode: null,
      email: this.$store.state.auth.userMeta.email,
      form: null,
      showSubmit: true,
      showAxiosError: false,
      axiosError: "",
      showLoader: false,
      markdownMode: true,
      successMessage: "",
      units: null,
      render: false,
      isLoading: true,
      fatalError: false,
    };
  },
  computed: {
    permalink() {
      return null;
    },

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
      window.NProgress.start();
      this.isLoading = true;
      let { data } = await getUserProfile(
        this.$store.state.auth.jwt,
        this.email
      );

      if (data.length) {
        this.mode = "update";
        let {
          id,
          firstName = null,
          lastName = null,
          unit = null,
          bio = null,
          title = null,
          phone = null,
        } = data[0];
        this.firstName = firstName;
        this.lastName = lastName;
        this.title = title;
        this.phone = phone;
        this.bio = bio;
        this.id = id;
        if (unit) {
          this.unit = JSON.stringify(unit.id);
        }
      } else {
        this.mode = "create";
      }
      console.log("mode: ", this.mode);
      window.NProgress.done();
      this.isLoading = false;
    },

    clearStatusMessages() {
      this.showAxiosError = false;
      this.successMessage = "";
      return;
    },
    async reload() {
      this.render = false;
      this.mode = null;
      this.getProfile();
      await this.$nextTick();
      this.render = true;
    },

    async submit() {
      this.$v.$touch();
      this.showAxiosError = false;
      this.successMessage = "";
      if (this.isSuccess) {
        window.NProgress.start();
        this.showLoader = true;
        let slug = slugs(this.email.split("@")[0]);

        this.form = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          unit: this.unit,
          bio: this.bio,
          title: this.title,
          phone: this.phone,
          slug,
        };

        if (this.mode === "update") {
          //console.log("call dbUpdate for user: ", this.id);
          let dbResponse = await updateUserProfile(
            this.$store.state.auth.jwt,
            this.id,
            this.form
          );
          if (dbResponse.status === 200) {
            console.log("dbUpdate: ", dbResponse);
            this.success("User profile updated successfully");
          } else {
            this.failed(dbResponse);
          }
        } else {
          let dbResponse = await createUserProfile(
            this.$store.state.auth.jwt,
            this.form
          );
          if (dbResponse.status === 200) {
            console.log("dbCreate: ", dbResponse);
            this.success("User profile created successfully");
          } else {
            this.failed(dbResponse);
          }
        }
      }
    },
    failed(res) {
      this.showAxiosError = true;
      this.axiosError = res;
      this.showLoader = false;
      window.NProgress.done();
      this.reload();
    },
    success(msg) {
      this.showAxiosError = false;
      this.showError = "";
      this.successMessage = msg;
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
