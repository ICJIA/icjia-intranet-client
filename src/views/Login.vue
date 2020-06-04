<template>
  <v-container fill-height>
    <v-layout row class="text-xs-center" align-center justify-center>
      <v-flex xs4 class="grey lighten-4 animated zoomIn fast">
        <v-card
          class="pt-1 pb-5 pl-3 pr-3"
          v-if="!this.$store.getters.isLoggedIn"
        >
          <div class="text-center mt-5">
            <h2>LOGIN</h2>
          </div>
          <v-form>
            <v-text-field
              prepend-icon="person"
              name="identifier"
              label="username"
              v-model="identifier"
              autocomplete="identifier"
              ref="identifier"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="password"
              type="password"
              v-model="password"
              autocomplete="password"
            ></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="login">Login</v-btn>
            </v-card-actions>
            <div class="mt-4 mb-3 text-center">
              <router-link to="/forgot">I forgot my password</router-link>
            </div>
            <div
              style="height: 50px; font-weight: bold"
              v-html="this.$store.state.status"
            ></div>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("logout");
  },

  mounted() {
    this.$nextTick(this.$refs.identifier.focus);
  },
  data() {
    return {
      identifier: "",
      password: ""
    };
  },
  methods: {
    login() {
      let identifier = this.identifier;
      let password = this.password;
      let payload = {};
      payload.identifier = identifier;
      payload.password = password;
      this.$store
        .dispatch("login", payload)
        .then(() => {
          console.log("logged in");
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  }
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
