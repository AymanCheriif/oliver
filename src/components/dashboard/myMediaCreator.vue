<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
const i18nReady = computed(() => i18nRuntimeState.ready);
const mediaTitle = computed(() =>
  t("dashboard.sections.myMedia.title", "My Media")
);
const mediaDescription = computed(() =>
  t("dashboard.sections.myMedia.description", "Manage your media files")
);
const loadingText = computed(() => t("common.loading", "Loading..."));
</script>

<template>
  <section class="dashboard-my-media-creator">
    <template v-if="i18nReady">
      <h1 :aria-label="mediaTitle">{{ mediaTitle }}</h1>
      <p>{{ mediaDescription }}</p>
    </template>
    <template v-else>
      <p>{{ loadingText }}</p>
    </template>
  </section>
</template>
