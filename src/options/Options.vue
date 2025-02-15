<script lang="ts" setup>
import { ref, onMounted } from "vue";

const backgroundUrl = ref("");
const saved = ref(false);

// Use the WebExtension storage API (Firefox supports browser.storage)
const storage =
  (window.browser && window.browser.storage) || window.chrome.storage;

const loadSettings = () => {
  storage.local.get(["backgroundUrl"], (result: any) => {
    backgroundUrl.value = result.backgroundUrl || "";
  });
};

const saveSettings = () => {
  storage.local.set({ backgroundUrl: backgroundUrl.value }, () => {
    saved.value = true;
    setTimeout(() => {
      saved.value = false;
    }, 2000);
  });
};

onMounted(() => {
  loadSettings();
});
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">Extension Settings</h1>
    <label class="block mb-2">Background Image URL:</label>
    <input
      type="text"
      v-model="backgroundUrl"
      class="border p-2 w-full"
      placeholder="Enter image URL" />
    <button @click="saveSettings" class="mt-4 bg-blue-500 text-white px-4 py-2">
      Save
    </button>
    <p v-if="saved" class="mt-2 text-green-600">Settings saved!</p>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
