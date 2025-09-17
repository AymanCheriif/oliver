<script setup>
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const { t } = useI18n();
</script>

<template>
  <section class="dashboard-my-media-creator">
    <template v-if="i18nRuntimeState.ready">
      <h1 :aria-label="t('dashboard.sections.myMedia.title', 'My Media')">
        {{ $t("dashboard.sections.myMedia.title", "My Media") }}
      </h1>
      <p>
        {{
          $t(
            "dashboard.sections.myMedia.description",
            "Manage your media files"
          )
        }}
      </p>
    </template>
    <template v-else>
      <p>{{ $t("common.loading", "Loading...") }}</p>
    </template>
  </section>
</template>
