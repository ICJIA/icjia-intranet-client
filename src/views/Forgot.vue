<template>
  <div class="fill-height" style="background-color: #eee">
    <v-row class="fill-height" align="center" justify="center">
      <v-card class="pt-1 pb-5" style="width: 350px">
        <div class="text-center mt-5">
          <h2>FORGOT PASSWORD</h2>
        </div>
        <form class="pt-5 pl-3 pr-3" @submit="submit" onSubmit="return false;">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            prepend-icon="email"
            label="Your @illinois.gov email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            aria-label="Email"
            @click.native="clearStatus"
            :disabled="disabled"
            ref="email"
          ></v-text-field>

          <div class="text-center mt-3">
            <v-btn @click="submit" :disabled="disabled">Send Reset Link</v-btn
            >&nbsp;
            <v-progress-circular
              v-if="isLoading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>

          <!-- <div v-else class="text-xs-center">
                <v-btn to="/login">Back to Log in</v-btn>
            </div>-->
          <div
            class="text-center mt-5"
            style="color: red; font-size: 12px; font-weight: bold"
          >
            {{ $store.getters["auth/authStatus"] }}
          </div>
        </form>

        <!-- <tree-view :data="this.$v" :options="{maxDepth: 3}"></tree-view> -->
        <div class="text-center mt-5" style="font-size: 14px" v-if="disabled">
          &laquo;
          <router-link to="/login/" style="background: none"
            >Back to login</router-link
          >
        </div>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import illinoisDotGov from "../validators/illinoisDotGov";

export default {
  mixins: [validationMixin],

  components: {},
  created() {
    this.$store.commit("auth/CLEAR_STATUS");
    this.$store.dispatch("auth/logout");
  },

  mounted() {
    this.$nextTick(this.$refs.email.focus);
  },

  validations: {
    email: { required, email, illinoisDotGov },
  },
  data() {
    return {
      name: "",
      email: "",
      showSubmit: true,
      showLoader: false,
      successMessage: "",
      disabled: false,
    };
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.email && errors.push("Not a valid e-mail address.");
      !this.$v.email.illinoisDotGov &&
        errors.push("You must use a valid @illinois.gov email adddress.");
      return errors;
    },

    isLoading() {
      return this.$store.getters["auth/isLoading"];
    },

    isSuccess() {
      return !this.$v.$invalid && this.$v.$dirty;
    },
  },
  methods: {
    clearStatus() {
      this.$store.commit("auth/CLEAR_STATUS");
    },
    submit() {
      this.$v.$touch();

      if (this.isSuccess) {
        let email = this.email.toString().toLowerCase();
        this.$store.dispatch("auth/forgot", email).then((r) => {
          if (r.data.ok) {
            this.disabled = true;
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>
