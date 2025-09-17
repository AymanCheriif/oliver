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
  <section>
    <template>
      <section class="dashboard-overview-agent" v-if="i18nRuntimeState.ready">
        <h2>
          {{ $t("dashboard.agentDashboard.title", "Agent Dashboard Overview") }}
        </h2>
        <p>
          {{
            $t(
              "dashboard.agentDashboard.description",
              "Manage your account preferences"
            )
          }}
        </p>
      </section>
      <section v-else>
        <p>{{ $t("common.loading", "Loading...") }}</p>
      </section>
    </template>
  </section>
</template>
