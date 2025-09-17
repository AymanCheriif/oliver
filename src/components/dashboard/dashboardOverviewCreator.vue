<template>
  <div>
    <template v-if="i18nReady">
      <h1>{{ pageTitle }}</h1>
      <p>{{ welcomeMessage }}</p>
      <button @click="logout" :aria-label="logoutLabel">
        {{ logoutLabel }}
      </button>

      <nav style="margin-top: 1rem; display: flex; gap: 1rem">
        <router-link to="/dashboard/edit-profile">
          <button class="dash-btn" :aria-label="editProfileLabel">
            {{ editProfileLabel }}
          </button>
        </router-link>
        <router-link to="/dashboard/edit-settings">
          <button class="dash-btn" :aria-label="editSettingsLabel">
            {{ editSettingsLabel }}
          </button>
        </router-link>
        <router-link to="/dashboard/my-media">
          <button class="dash-btn" :aria-label="myMediaLabel">
            {{ myMediaLabel }}
          </button>
        </router-link>
      </nav>
    </template>
    <template v-else>
      <p>{{ loadingText }}</p>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const authStore = useAuthStore();
const router = useRouter();
const { t } = useI18n();

const i18nReady = computed(() => i18nRuntimeState.ready);

const pageTitle = computed(() => t("dashboard.page.title"));
const welcomeMessage = computed(() =>
  t("dashboard.messages.welcome", [authStore.currentUser?.email || ""])
);
const logoutLabel = computed(() => t("auth.common.logout", "Logout"));
const editProfileLabel = computed(() =>
  t("dashboard.actions.editProfile", "Edit Profile")
);
const editSettingsLabel = computed(() =>
  t("dashboard.actions.editSettings", "Edit Settings")
);
const myMediaLabel = computed(() => t("dashboard.actions.myMedia", "My Media"));
const loadingText = computed(() => t("common.loading"));

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
