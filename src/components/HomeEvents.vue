<template>
  <div>
    <div v-for="n in 4" :key="n">
      <v-card color="grey lighten-4" class="mb-5 hover card">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-avatar class="mt-7 mx-5" tile>
            <div>
              <span style="font-size: 14px; color: #666;">June</span><br />
              <span style="font-size: 26px; font-weight: 900; color: #0d4474;"
                >23</span
              >
            </div>
          </v-avatar>
          <div style="border-left: 1px solid #ccc;">
            <v-card-title class="headline">title here</v-card-title>

            <v-card-subtitle
              >pasdpas dpasd pasd pasod pasdopsaodak sd;aksdkasd lkasld kalsdkla
              skdlaksdlaskd laskd las dlak sd</v-card-subtitle
            >
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
