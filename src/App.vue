<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useThemeStore } from './stores/themeStore';

const themeStore = useThemeStore();
</script>

<template>
  <div :class="themeStore.theme">
    <RouterView class="h-[100vh] bg-background" />
  </div>
</template>

<style scoped></style>
