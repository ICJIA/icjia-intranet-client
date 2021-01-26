<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <ul>
            <li>
              <router-link to="/forms/conference/" style="background: none"
                >Conference Room Reservation</router-link
              >
            </li>

            <li>
              <router-link to="/forms/laptop/" style="background: none"
                >Laptop Request</router-link
              >
            </li>
            <li>
              <router-link to="/forms/supply/" style="background: none"
                >Office Supply Request</router-link
              >
            </li>
            <li>
              <router-link to="/forms/support/" style="background: none"
                >Technical Support Request</router-link
              >
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
