<template>
  <div>
    <v-sheet color="grey lighten-3" class="px-3 py-3">
      <div
        style="
          font-weight: bold;
          border-bottom: 1px solid #ccc;
          padding-bottom: 5px;
          margin-bottom: 15px;
        "
      >
        {{ heading }}
      </div>

      <ul class="mt-2">
        <span
          v-for="(document, index) in documents"
          :key="`eventDoc-${index}`"
          class="download-link"
        >
          <li
            v-if="document.file"
            class="hover"
            @click.stop.prevent="download(document.file)"
          >
            {{ document.title }}
          </li>
          <li
            v-else
            class="hover"
            @click.stop.prevent="goToExternal(document.externalURL)"
          >
            {{ document.title }}&nbsp;<v-icon x-small>open_in_new</v-icon>
          </li>
        </span>
      </ul>
    </v-sheet>
  </div>
</template>

<script>
export default {
  methods: {
    goToExternal(url) {
      window.open(url);
    },
    download(file) {
      let download = `https://dev.icjia-api.cloud${file.url}`;
      //console.log("download: ", download);
      if (file.ext === ".pdf") {
        window.open(download);
      } else {
        location.href = download;
      }
    },
  },
  props: {
    documents: {
      type: Array,
      default: () => [],
    },
    heading: {
      type: String,
      default: "Related",
    },
  },
};
</script>
