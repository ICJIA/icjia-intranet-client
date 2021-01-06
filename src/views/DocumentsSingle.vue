<template>
  <div>
    <Breadcrumb :key="$route.path" :title="$route.params.slug"></Breadcrumb>
    <v-container>
      <v-row>
        <v-col>
          <div class="text-center">
            <h1>{{ $route.params.slug }} here</h1>
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
