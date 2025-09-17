<script setup>
import { ref, computed } from "vue";
import { enterpriseI18n } from "@/i18n/enterprise/i18n";
import { i18nRuntimeState } from "@/main";

const currentLocale = ref(enterpriseI18n.currentLocale);
const samples = [
  "auth.login.title",
  "dashboard.page.title",
  "shop.page.title",
  "common.loading",
];

function switchLocale() {
  const next = currentLocale.value === "en" ? "vi" : "en";
  enterpriseI18n.setLocale(next).then(() => {
    currentLocale.value = next;
  });
}

const ready = computed(() => i18nRuntimeState.ready);
</script>

<template>
  <div class="test-translation">
    <h1>Translation Test Page</h1>
    <p>
      Current locale: <strong>{{ currentLocale }}</strong>
    </p>
    <button @click="switchLocale">Switch Locale</button>
    <ul v-if="ready">
      <li v-for="key in samples" :key="key">
        <code>{{ key }}</code> → <strong>{{ $t(key) }}</strong>
      </li>
    </ul>
    <p v-else>Loading translations…</p>
  </div>
</template>

<style scoped>
.test-translation {
  padding: 1rem;
  font-family: system-ui, Arial, sans-serif;
}
button {
  margin: 0.5rem 0 1rem;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 0.3rem 0;
}
code {
  background: #f5f5f5;
  padding: 2px 4px;
  border-radius: 3px;
}
</style>
