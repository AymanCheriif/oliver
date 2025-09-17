<template>
  <div>
    <template v-if="i18nReady">
      <h1>{{ registerTitle }}</h1>
      <form @submit.prevent="handleSignUp" novalidate>
        <input
          v-model="name"
          type="text"
          :placeholder="firstNamePlaceholder"
          :aria-label="firstNamePlaceholder"
          autocomplete="given-name"
          required
        />
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
          autocomplete="new-password"
          required
        />
        <select v-model="role" :aria-label="roleLabel" required>
          <option value="creator">{{ userRole }}</option>
          <option value="vendor">{{ adminRole }}</option>
          <option value="customer">{{ guestRole }}</option>
          <option value="agent">{{ userRole }}</option>
        </select>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? loadingText : registerButton }}
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { authHandler } from "@/services/authHandler";
import { useI18n } from "vue-i18n";
import { i18nRuntimeState } from "@/main";

const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("creator");
const errorKey = ref("");
const isLoading = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

// i18n readiness
const i18nReady = computed(() => i18nRuntimeState.ready);

// Computed translation bindings
const registerTitle = computed(() => t("auth.register.title"));
const firstNamePlaceholder = computed(() => t("auth.register.firstName"));
const emailPlaceholder = computed(() => t("auth.register.emailPlaceholder"));
const passwordPlaceholder = computed(() =>
  t("auth.register.passwordPlaceholder")
);
const registerButton = computed(() => t("auth.register.button"));
const userRole = computed(() => t("auth.common.user"));
const adminRole = computed(() => t("auth.common.admin"));
const guestRole = computed(() => t("auth.common.guest"));
const loadingText = computed(() => t("common.loading"));
const roleLabel = computed(() => t("auth.register.roleLabel", "Role"));

async function handleSignUp() {
  try {
    isLoading.value = true;
    console.log("[SIGNUP] Attempting signup with:", {
      email: email.value,
      role: role.value,
    });
    await authHandler.register(email.value, password.value, {
      email: email.value,
      name: name.value,
      "custom:role": role.value,
    });
    console.log("[SIGNUP] Success; redirecting to confirm-email");
    router.push("/confirm-email");
  } catch (err) {
    console.error("[SIGNUP] Signup failed:", err);
    // Use standardized error key; fallback to generic register error if custom message isn't mapped
    errorKey.value = "auth.messages.registerError";
  } finally {
    isLoading.value = false;
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
