<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
const i18nReady = computed(() => i18nRuntimeState.ready);
const AgentDashboardTitle = computed(() =>
  t("dashboard.agentDashboard.title", "Agent Dashboard Overview")
);
const AgentDashboardDescription = computed(() =>
  t("dashboard.agentDashboard.description", "Manage your account preferences")
);
const loadingText = computed(() => t("common.loading", "Loading..."));
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
      <section class="dashboard-overview-agent" v-if="i18nReady">
        <h2>{{ AgentDashboardTitle }}</h2>
        <p>{{ AgentDashboardDescription }}</p>
      </section>
    </template>
  </section>
</template>
