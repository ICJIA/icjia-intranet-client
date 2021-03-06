<template>
  <div>
    <div v-if="!loading">
      <v-card
        class="mb-5 px-3 py-3 hover info-card"
        style="border: 1px #eee solid"
        elevation="1"
        v-for="(app, index) in apps.length"
        :key="index"
        :ripple="false"
        @click="routeTo(apps[app - 1]['url'])"
        data-aos="fade-up"
        data-aos-offset="100"
        data-aos-delay="0"
      >
        <div class="">
          <v-img
            class="white--text align-end"
            aria-label="ReseearchHub Application image"
            height="225px"
            :src="apps[app - 1]['image']"
          >
            <!-- <div class="card-banner mb-5">
                      <h2 class="px-5">{{ apps[app - 1]["title"] }}</h2>
                    </div> -->
          </v-img>

          <h2 class="px-5 pt-5">
            {{ apps[app - 1]["title"] }}
          </h2>

          <div class="px-4 pt-3">
            By
            {{ apps[app - 1]["contributors"][0]["title"] }}
          </div>

          <v-card-subtitle class="pb-2">{{
            apps[app - 1]["date"] | format
          }}</v-card-subtitle>

          <v-card-text class="text--primary mb-2">
            {{ apps[app - 1]["description"] }}
          </v-card-text>
        </div>

        <v-card-actions class="py-5">
          <v-btn
            v-if="
              apps[app - 1]['articles'].length ||
              apps[app - 1]['datasets'].length
            "
            style="color: #075e60"
            @click.stop.prevent="apps[app - 1]['show'] = !apps[app - 1]['show']"
            >Show Related
            <v-icon v-if="!apps[app - 1]['show']">expand_more</v-icon>
            <v-icon v-else>expand_less</v-icon></v-btn
          >

          <v-spacer></v-spacer>

          <!-- <v-btn x-small target="_blank" :href="`${apps[app - 1]['url']}`"
            >Launch<v-icon small right>open_in_new</v-icon></v-btn
          > -->
        </v-card-actions>

        <v-slide-y-transition>
          <div v-show="apps[app - 1]['show']">
            <div
              style="background: #eee"
              v-if="
                apps[app - 1]['articles'].length ||
                apps[app - 1]['datasets'].length
              "
            >
              <v-card-text>
                <div v-if="apps[app - 1]['articles'].length" class="pb-3 pl-1">
                  <div class="mb-2">
                    <strong>Articles:</strong>
                  </div>
                  <ul
                    v-for="article in apps[app - 1]['articles']"
                    :key="article.title"
                    class="ml-2 related"
                  >
                    <li>
                      <a
                        :href="`https://icjia.illinois.gov/researchhub/articles/${article.slug}`"
                        class="relatedLink"
                        target="_blank"
                        style="background: none"
                        >{{ article.title }}</a
                      >
                    </li>
                  </ul>
                </div>

                <div v-if="apps[app - 1]['datasets'].length" class="pb-3 pl-1">
                  <div class="mb-2">
                    <strong>Datasets:</strong>
                  </div>
                  <ul
                    v-for="dataset in apps[app - 1]['datasets']"
                    :key="dataset.title"
                    class="ml-2 related"
                  >
                    <li>
                      <a
                        :href="`https://icjia.illinois.gov/researchhub/datasets/${dataset.slug}`"
                        class="relatedLink"
                        target="_blank"
                        style="background: none"
                        >{{ dataset.title }}</a
                      >
                    </li>
                  </ul>
                </div>
              </v-card-text>
            </div>
          </div>
        </v-slide-y-transition>
      </v-card>
    </div>
    <div v-else><Loader></Loader></div>
  </div>
</template>

<script>
import { getHubApplications } from "@/services/External";
export default {
  props: {
    limit: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      loading: null,
      apps: [],
      query: null,
    };
  },
  created() {
    this.fetchContent();
    this.alreadySeen = true;
  },
  methods: {
    routeTo(url) {
      window.open(url);
      //console.log(app);
    },

    async fetchContent() {
      this.loading = true;
      this.query = await getHubApplications(this.limit);
      this.apps.push(...this.query);
      this.apps = this.apps.map((apps) => ({
        ...apps,
        show: false,
      }));
      this.loading = false;
    },
  },
};
</script>

<style></style>
