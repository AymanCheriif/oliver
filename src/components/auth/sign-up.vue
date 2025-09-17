<template>
  <div>
    <template v-if="i18nReady">
      <h1>{{ $t("auth.register.title") }}</h1>
      <form @submit.prevent="handleSignUp" novalidate>
        <input
          v-model="name"
          type="text"
          :placeholder="$t('auth.register.firstName')"
          :aria-label="$t('auth.register.firstName')"
          autocomplete="given-name"
          required
        />
        <input
          v-model="email"
          type="email"
          :placeholder="$t('auth.register.emailPlaceholder')"
          :aria-label="$t('auth.register.emailPlaceholder')"
          autocomplete="email"
          required
        />
        <input
          v-model="password"
          type="password"
          :placeholder="$t('auth.register.passwordPlaceholder')"
          :aria-label="$t('auth.register.passwordPlaceholder')"
          autocomplete="new-password"
          required
        />
        <select
          v-model="role"
          :aria-label="$t('auth.register.roleLabel', 'Role')"
          required
        >
          <option value="creator">{{ $t("auth.common.user") }}</option>
          <option value="vendor">{{ $t("auth.common.admin") }}</option>
          <option value="customer">{{ $t("auth.common.guest") }}</option>
          <option value="agent">{{ $t("auth.common.user") }}</option>
        </select>
        <button type="submit" :disabled="isLoading">
          {{
            isLoading ? $t("auth.common.loading") : $t("auth.register.button")
          }}
        </button>
      </form>
      <p v-if="errorKey" class="error">{{ $t(errorKey) }}</p>
    </template>
    <template v-else>
      <p>{{ $t("common.loading") }}</p>
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

const i18nReady = computed(() => i18nRuntimeState.ready);

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
