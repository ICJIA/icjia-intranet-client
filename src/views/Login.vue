<template>
  <div class="fill-height" style="background-color: #eee">
    <v-row class="fill-height" align="center" justify="center">
      <v-card class="pt-1 pb-5 pl-3 pr-3" width="350px">
        <div class="text-center">
          <h2>LOGIN</h2>
        </div>
        <v-form>
          <v-text-field
            prepend-icon="email"
            name="identifier"
            label="email"
            v-model="identifier"
            autocomplete="identifier"
            ref="identifier"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            name="password"
            label="password"
            :append-icon="e3 ? 'visibility' : 'visibility_off'"
            @click:append="() => (e3 = !e3)"
            :type="e3 ? 'password' : 'text'"
            v-model="password"
            autocomplete="password"
          ></v-text-field>
          <v-card-actions>
            <v-btn primary large block @click="login">Login</v-btn>
          </v-card-actions>
          <div class="mt-4 text-center">
            <router-link to="/forgot">I forgot my password</router-link>
          </div>
          <div class="text-center mt-4" style="font-size: 12px">
            If this is your first time using the new ICJIA intranet, please
            <router-link to="/register">register here</router-link>.
          </div>
          <!-- <div class="mt-6 mb-3 text-center">
            <router-link to="/register" class="mt-3">Register</router-link>
          </div> -->
          <div
            class="text-center mt-5"
            style="color: red; font-size: 12px; font-weight: bold"
          >
            {{ $store.getters["auth/authStatus"] }}
          </div>
        </v-form>
      </v-card>
    </v-row>
    <v-bottom-sheet v-model="sheet" v-if="showRegistrationModal">
      <v-sheet class="text-center" height="200px">
        <div class="py-8">
          <div class="">
            If this is your first time using the new ICJIA intranet, you must
            register your illinois.gov address and create a password.
          </div>
          <div class="pt-2">
            <router-link to="/register" @click="hideForGood"
              >Click here</router-link
            >
            to register.
          </div>

          <v-btn @click="hideForGood" class="mt-6" large dark color="red">
            I understand
          </v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("auth/logout");
  },

  mounted() {
    // console.log(this.$route.meta);
    // this.$nextTick(this.$refs.identifier.focus);
    console.log(this.$myApp.config.underConstruction);
  },
  data() {
    return {
      identifier: "test12345",
      password: "test12345",
      e3: true,
      e4: true,
      sheet: true,
    };
  },
  computed: {
    showRegistrationModal() {
      //console.log("local storage: ", localStorage.getItem("showCensusModal"));
      if (localStorage.getItem("showRegistrationModal")) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    hideForGood() {
      localStorage.setItem("showRegistrationModal", false);
      this.sheet = false;
    },
    login() {
      let identifier = this.identifier.toLowerCase();
      let password = this.password;
      let payload = {};
      payload.identifier = identifier;
      payload.password = password;
      this.$store
        .dispatch("auth/login", payload)
        .then(() => {
          console.log("logged in");
          this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
a {
  color: #222;
}
</style>
