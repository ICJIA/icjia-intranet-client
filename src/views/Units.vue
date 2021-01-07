<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>ICJIA Unit Pages</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <ul v-for="(unit, index) in $myApp.units" :key="`unit-${index}`">
            <li class="mb-3">
              <router-link
                :to="unit.path"
                style="background: none !important"
                >{{ unit.title }}</router-link
              >
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
    <!-- {{ $myApp.units }} -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
