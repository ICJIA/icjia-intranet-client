<template>
  <div>
    <Breadcrumb :key="$route.path" title="All Units"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center mb-8">
            <h1>ICJIA Units</h1>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div
            v-for="(unit, index) in $myApp.units"
            :key="`unit-${index}`"
            class="mb-5"
          >
            <v-card
              class="px-6 py-6 info-card markdown-body"
              color="#f3f5f7"
              @click="$router.push(unit.path)"
            >
              <h2 style="font-size: 18px">
                {{ unit.title }}
              </h2>
              <div class="px-3">{{ unit.summary }}</div>
            </v-card>
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
