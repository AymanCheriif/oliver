<template>
  <div>
    <h1>{{ $t("auth.confirmEmail.title") }}</h1>
    <form @submit.prevent="handleConfirm">
      <input
        v-model="email"
        type="email"
        :placeholder="$t('auth.confirmEmail.emailPlaceholder')"
        :aria-label="$t('auth.confirmEmail.emailPlaceholder')"
        required
      />
      <input
        v-model="code"
        type="text"
        :placeholder="$t('auth.confirmEmail.codePlaceholder')"
        :aria-label="$t('auth.confirmEmail.codePlaceholder')"
        required
      />
      <button type="submit">{{ $t("auth.confirmEmail.button") }}</button>
    </form>
    <p v-if="error">{{ $t(error) }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authHandler } from "@/services/authHandler";

const email = ref("");
const code = ref("");
const error = ref("");
const router = useRouter();

async function handleConfirm() {
  try {
    await authHandler.confirmSignUp(email.value, code.value);
    router.push("/log-in"); // Redirect to login after confirmation
  } catch (err) {
    error.value = err.message || "Confirmation failed";
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
