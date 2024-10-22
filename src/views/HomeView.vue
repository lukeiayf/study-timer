<template>
    <div class="flex flex-col max-w-3xl mx-auto p-5">
        <ThemeToggler />
        <Timer />
        <BreakRange />
        <LoggedTimes />
    </div>
</template>
<script setup lang="ts">
import LoggedTimes from '@/components/LoggedTimes.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import Timer from '@/components/MainTimer.vue';
import BreakRange from '@/components/BreakRange.vue'


</script>
<style></style>