<template>
  <div>
    <template v-if="i18nRuntimeState.ready">
      <h1>{{ $t("dashboard.page.title") }}</h1>
      <p>
        {{
          $t("dashboard.messages.welcome", [authStore.currentUser?.email || ""])
        }}
      </p>
      <button @click="logout" :aria-label="t('auth.common.logout', 'Logout')">
        {{ $t("auth.common.logout", "Logout") }}
      </button>

      <nav style="margin-top: 1rem; display: flex; gap: 1rem">
        <router-link to="/dashboard/edit-profile">
          <button
            class="dash-btn"
            :aria-label="t('dashboard.actions.editProfile', 'Edit Profile')"
          >
            {{ $t("dashboard.actions.editProfile", "Edit Profile") }}
          </button>
        </router-link>
        <router-link to="/dashboard/edit-settings">
          <button
            class="dash-btn"
            :aria-label="t('dashboard.actions.editSettings', 'Edit Settings')"
          >
            {{ $t("dashboard.actions.editSettings", "Edit Settings") }}
          </button>
        </router-link>
        <router-link to="/dashboard/my-media">
          <button
            class="dash-btn"
            :aria-label="t('dashboard.actions.myMedia', 'My Media')"
          >
            {{ $t("dashboard.actions.myMedia", "My Media") }}
          </button>
        </router-link>
      </nav>
    </template>
    <template v-else>
      <p>{{ $t("common.loading") }}</p>
    </template>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

function logout() {
  authStore.logout();
  router.push("/log-in");
}
</script>
<script>
export const assets = {
  critical: ["/css/dashboard.css"],
  high: ["/js/vendor-charts.js"],
  normal: ["/images/image2.jpg"],
};
</script>

<style scoped>
/* Ensure CSS is applied */
@import "../../assets/css/dashboard.css";

nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
button:hover {
  background-color: #0056b3;
}
.dash-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.dash-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}
</style>
