<template>
  <div class="fill-height" style="background-color: #eee">
    <v-row class="fill-height" align="center" justify="center">
      <v-card class="pt-1 pb-5" style="width: 350px">
        <div class="text-center mt-5">
          <h2>ICJIA REGISTER</h2>
        </div>

        <form class="pt-5 pl-3 pr-3">
          <v-text-field
            v-model="email"
            prepend-icon="email"
            :error-messages="emailErrors"
            label="Valid @illinois.gov email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            aria-label="Email"
            @click.native="clearStatus"
            @keyup.enter="submit"
            ref="email"
          ></v-text-field>

          <v-text-field
            v-model="password"
            prepend-icon="lock"
            :error-messages="passwordErrors"
            label="Password"
            :append-icon="e3 ? 'visibility' : 'visibility_off'"
            @click:append="() => (e3 = !e3)"
            :type="e3 ? 'password' : 'text'"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            aria-label="Password"
            @click.native="clearStatus"
            @keyup.enter="submit"
            class="mt-2"
          ></v-text-field>
          <v-text-field
            v-model="repeatPassword"
            prepend-icon="lock"
            :error-messages="repeatPasswordErrors"
            label="Verify Password"
            :append-icon="e4 ? 'visibility' : 'visibility_off'"
            @click:append="() => (e4 = !e4)"
            :type="e4 ? 'password' : 'text'"
            aria-label="Verify Password"
            @input="$v.repeatPassword.$touch()"
            @blur="$v.repeatPassword.$touch()"
            class="mt-2"
            @click.native="clearStatus"
            @keyup.enter="submit"
          ></v-text-field>
          <div
            class="text-center mt-2 mb-2"
            style="color: red; font-size: 12px; font-weight: bold"
          >
            {{ $store.getters["auth/authStatus"] }}
          </div>

          <div class="text-center mt-3">
            <v-btn @click="submit" v-if="!disabled">Register</v-btn>&nbsp;
            <v-progress-circular
              v-if="isLoading"
              aria-label="Progress bar: Loading"
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div
            class="mt-5 text-center"
            style="font-size: 12px"
            v-if="!disabled"
          >
            I'm already registered, but I
            <router-link to="/forgot">forgot my password</router-link>
          </div>
        </form>

        <!-- <tree-view :data="this.$v" :options="{maxDepth: 3}"></tree-view> -->
        <div class="text-center mt-3" style="font-size: 14px">
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
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
import passwordComplexity from "@/validators/passwordComplexity";
import illinoisDotGov from "@/validators/illinoisDotGov";

export default {
  mixins: [validationMixin],

  components: {},
  created() {
    this.$store.dispatch("auth/logout");
  },

  mounted() {
    this.$nextTick(this.$refs.email.focus);
  },

  validations: {
    email: { required, email, illinoisDotGov },
    password: {
      required,
      minLength: minLength(8),
      passwordComplexity,
    },
    repeatPassword: {
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      name: "",
      e3: true,
      e4: true,
      email: "",
      password: "",
      repeatPassword: "",
      username: "",
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

    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push("Password must have minimum 8 characters.");
      !this.$v.password.required && errors.push("Password is required.");

      !this.$v.password.passwordComplexity &&
        errors.push(
          "Weak password. Please provide at least one uppercase letter and one number. "
        );
      return errors;
    },
    repeatPasswordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push("Passwords must match");
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
      this.$store.dispatch("auth/logout");
    },
    submit() {
      this.$v.$touch();

      if (this.isSuccess) {
        this.showLoader = true;
        let payload = {
          username: this.email.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
        };
        this.$store
          .dispatch("auth/register", payload)
          .then(() => {
            console.log("Success!");
            this.disabled = true;
          })
          // eslint-disable-next-line no-unused-vars
          .catch((err) => {
            // console.log(JSON.stringify(err));
          });
      }
    },
  },
};
</script>

<style scoped></style>
