<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useThemeStore } from './stores/themeStore';
import { onMounted } from 'vue';

const themeStore = useThemeStore();
onMounted(() => {
  themeStore.getTheme();
})
</script>

<template>
  <div :class="themeStore.theme" class="bg-background">
    <RouterView class="h-[100vh] w-[100wh] bg-background" />
  </div>
</template>

<style scoped></style>
