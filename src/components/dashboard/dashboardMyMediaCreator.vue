<script setup>
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
</script>

<script>
export const assets = {
  critical: ["/css/dashboard.css", "/js/brands.min.js"],
  high: ["/js/vendor-charts.js"],
  normal: ["/images/image.jpg"],
};
</script>

<template>
  <section class="dashboard-overview-creator">
    <template v-if="i18nRuntimeState.ready">
      <h2>
        {{
          $t("dashboard.sections.myMedia.title", t("dashboard.actions.myMedia"))
        }}
      </h2>
      <p>
        {{
          $t("dashboard.myMedia.description", t("dashboard.actions.myMedia"))
        }}
      </p>
    </template>
    <template v-else>
      <p>{{ $t("common.loading") }}</p>
    </template>
  </section>
</template>

<style scoped>
/* Ensure CSS is applied */
@import "../../assets/css/dashboard.css";
</style>
