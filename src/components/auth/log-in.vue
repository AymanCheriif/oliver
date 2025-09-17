<template>
  <div>
    <template v-if="i18nReady">
      <h1>{{ welcomeText }}</h1>
      <form @submit.prevent="handleLogin" novalidate>
        <input
          v-model="email"
          type="email"
          :placeholder="emailPlaceholder"
          :aria-label="emailPlaceholder"
          autocomplete="email"
          required
        />
        <input
          v-model="password"
          type="password"
          :placeholder="passwordPlaceholder"
          :aria-label="passwordPlaceholder"
          autocomplete="current-password"
          required
        />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? loadingText : loginButton }}
        </button>
      </form>
      <p v-if="errorKey" class="error">{{ t(errorKey) }}</p>
    </template>
    <template v-else>
      <p>{{ loadingText }}</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const email = ref("");
const password = ref("");
const errorKey = ref("");
const router = useRouter();
const auth = useAuthStore();
const isLoading = ref(false);
const { t, locale } = useI18n();

// Computed properties to force re-render when translations change
const welcomeText = computed(() => t("auth.login.title"));
const emailPlaceholder = computed(() => t("auth.login.emailPlaceholder"));
const passwordPlaceholder = computed(() => t("auth.login.passwordPlaceholder"));
const loginButton = computed(() => t("auth.login.button"));
const loadingText = computed(() => t("common.loading"));
const i18nReady = computed(() => i18nRuntimeState.ready);

// Watch locale changes
watch(
  locale,
  (newLocale, oldLocale) => {
    if (oldLocale !== undefined) {
      console.log(`[LOGIN] Locale switched: ${oldLocale} -> ${newLocale}`);
    }
  },
  { immediate: false }
);

onMounted(() => {
  if (i18nReady.value) {
    console.log(`[LOGIN] Mounted with locale: ${locale.value}`);
  } else {
    const stop = watch(i18nReady, (ready) => {
      if (ready) {
        console.log(`[LOGIN] Now ready with locale: ${locale.value}`);
        stop();
      }
    });
  }
});

async function handleLogin() {
  try {
    isLoading.value = true;
    console.log("[LOGIN] Attempting login with:", email.value);
    const { idToken, accessToken, refreshToken } = await authHandler.login(
      email.value,
      password.value
    );

    localStorage.setItem("idToken", idToken);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    auth.setTokenAndDecode(idToken);
    auth.startTokenRefreshLoop();
    isLoading.value = false;
    if (!auth.currentUser.onboardingPassed) {
      router.push("/sign-up/onboarding");
    } else if (
      auth.currentUser.role === "creator" &&
      !auth.currentUser.kycPassed
    ) {
      router.push("/sign-up/onboarding/kyc");
    } else {
      router.push("/dashboard");
    }
  } catch (err) {
    console.error("[LOGIN] Login failed:", err);
    errorKey.value = "auth.login.error";
  }
}
</script>

<script>
export const assets = {
  critical: ["/css/auth.css"],
  high: [],
  normal: ["/images/auth-bg.jpg"],
};
</script>

<style scoped>
.error {
  color: #c0392b;
  margin-top: 0.75rem;
}
button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
