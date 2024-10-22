<template>
    <div :class="themeStore.theme">
        <header class="flex items-end justify-end">
            <button @click="themeStore.toggleTheme" class="px-4">
                <i v-if="themeStore.theme === 'dark-theme'">
                    <img src="@/assets/lightThemeIcon.svg" alt="Light Icon" class="h-6 w-6" />
                </i>
                <i v-else>
                    <img src="@/assets/darkThemeIcon.svg" alt="Dark Icon" class="h-6 w-6" />
                </i>
            </button>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore';

const themeStore = useThemeStore();

</script>