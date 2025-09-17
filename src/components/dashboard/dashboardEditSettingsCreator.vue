<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
const i18nReady = computed(() => i18nRuntimeState.ready);
const settingsTitle = computed(() =>
  t("dashboard.sections.editSettings.title", "Account Settings")
);
const settingsDescription = computed(() =>
  t(
    "dashboard.sections.editSettings.description",
    "Manage your account preferences"
  )
);
const loadingText = computed(() => t("common.loading", "Loading..."));
</script>

<script>
export const assets = {
  critical: ["/css/dashboard.css"],
  high: ["/js/vendor-charts.js"],
  normal: ["/images/above-the-fold-hero.jpg"],
};
</script>

<template>
  <section class="dashboard-overview-creator">
    <template v-if="i18nReady">
      <h2 :aria-label="settingsTitle">{{ settingsTitle }}</h2>
      <p>{{ settingsDescription }}</p>
      <!-- <img
        src="/images/above-the-fold-hero.jpg"
        alt="Hero Image"
        style="width: 100%; height: auto"
      /> -->
    </template>
    <template v-else>
      <p>{{ loadingText }}</p>
    </template>
  </section>
</template>

<style scoped>
/* Ensure CSS is applied */
@import "../../assets/css/dashboard.css";
</style>
