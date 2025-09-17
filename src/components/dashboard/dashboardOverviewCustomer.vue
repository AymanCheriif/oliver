<script setup>
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
</script>

<script>
export const assets = {
  critical: ["/css/dashboard.css"],
  high: [],
  normal: [],
};
</script>

<template>
  <section class="dashboard-overview-customer">
    <template v-if="i18nRuntimeState && i18nRuntimeState.ready">
      <h2>
        {{
          $t("dashboard.customerDashboard.title", "Customer Dashboard Overview")
        }}
      </h2>
      <p>
        {{
          $t(
            "dashboard.customerDashboard.description",
            "Customer-specific content."
          )
        }}
      </p>
    </template>
    <template v-else>
      <p>{{ t("common.loading", "Loading...") }}</p>
    </template>
  </section>
</template>
