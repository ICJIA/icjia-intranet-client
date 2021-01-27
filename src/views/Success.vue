<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="mt-12">
          <div class="text-center">
            <img src="/icjia-logo.png" width="200" />
            <h1 class="mt-10">Success!</h1>
            <h2>
              Your email is confirmed.<br /><br />
              Please
              <router-link to="/login">login to the ICJIA intranet</router-link>
              now.
            </h2>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
