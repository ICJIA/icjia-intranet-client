<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto px-2 py-5"
            style="background: #fff;"
            elevation="0"
            height="200"
          >
            <v-card-text>
              <div>Lorem markdownum</div>
              <h2 style="font-size: 24px; color: #333;" class="mt-3 mb-4">
                Online forms
              </h2>

              <div style="color: #333;">
                Request a conference room, laptop, or rental car.
              </div>
            </v-card-text>

            <!-- <v-btn absolute dark fab bottom right color="#0D4474">
              <v-icon>more_vert</v-icon>
            </v-btn> -->
            <v-menu
              right
              top
              offset-y
              nudge-left="70"
              nudge-bottom="30"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="blue darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3">
                <v-list-item v-for="n in 4" :key="n" :to="`/forms/form-${n}`">
                  <v-list-item-title style="font-size: 12px;"
                    >Form {{ n }}</v-list-item-title
                  >
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item to="/forms">
                  <v-list-item-title
                    style="font-size: 12px; font-weight: bold; color: #aaa;"
                    class="py-2 text-center"
                    >All forms</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto px-2 py-5"
            style="background: #fff;"
            elevation="0"
            height="200"
          >
            <v-card-text>
              <div>Lorem markdownum</div>
              <h2 style="font-size: 24px; color: #333;" class="mt-3 mb-4">
                Technical Support
              </h2>

              <div style="color: #333;">
                Lorem markdownum Lorem markdownum Lorem markdownum
              </div>
            </v-card-text>

            <!-- <v-btn absolute dark fab bottom right color="#0D4474">
              <v-icon>more_vert</v-icon>
            </v-btn> -->
            <v-menu
              right
              top
              offset-y
              nudge-left="70"
              nudge-bottom="30"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="blue darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3">
                <v-list-item
                  v-for="n in 4"
                  :key="n"
                  :to="`/support/support-${n}`"
                >
                  <v-list-item-title style="font-size: 12px;"
                    >Technical support {{ n }}</v-list-item-title
                  >
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item to="/support">
                  <v-list-item-title
                    style="font-size: 12px; font-weight: bold; color: #aaa;"
                    class="py-2 text-center"
                    >All tech support links</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card
            class="mx-auto px-2 py-5"
            style="background: #fff;"
            elevation="0"
            height="200"
          >
            <v-card-text>
              <div>Lorem markdownum</div>
              <h2 style="font-size: 24px; color: #333;" class="mt-3 mb-4">
                Featured Documents
              </h2>

              <div style="color: #333;">
                Lorem markdownum Lorem markdownum Lorem markdownum
              </div>
            </v-card-text>

            <!-- <v-btn absolute dark fab bottom right color="#0D4474">
              <v-icon>more_vert</v-icon>
            </v-btn> -->
            <v-menu
              right
              top
              offset-y
              nudge-left="70"
              nudge-bottom="30"
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <!-- <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn> -->
                <v-btn
                  absolute
                  dark
                  fab
                  bottom
                  right
                  color="blue darken-4"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list class="px-3">
                <v-list-item
                  v-for="n in 4"
                  :key="n"
                  :to="`/documents/document-${n}`"
                >
                  <v-list-item-title style="font-size: 12px;"
                    >Document {{ n }}</v-list-item-title
                  >
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item to="/documents">
                  <v-list-item-title
                    style="font-size: 12px; font-weight: bold; color: #aaa;"
                    class="py-2 text-center"
                    >All documents</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
