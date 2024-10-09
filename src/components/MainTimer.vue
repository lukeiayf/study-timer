<template>
    <div class="flex flex-col items-center justify-center my-20">
        <h1 class="text-4xl font-bold mb-4">Study Timer</h1>
        <div class="text-9xl font-mono" :class="{ 'flash': timerStore.onBreak }">{{ timerStore.formattedTime
            }}</div>
        <div v-if="timerStore.onBreak" class="text-2xl font-mono">Time on break: {{ timerStore.formattedBreakTime }}
        </div>
        <div class="flex mt-4 min-w-full justify-center items-center">
            <button @click="timerStore.start" class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                v-if="!timerStore.isRunning">
                Start
            </button>
            <button @click="timerStore.pause" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                v-if="timerStore.isRunning">
                Pause
            </button>
            <button @click="timerStore.takeBreak" class="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                v-if="timerStore.isRunning">
                Take a break
            </button>
            <button @click="timerStore.reset" class="bg-red-500 text-white px-4 py-2 rounded">
                Reset
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimerStore } from '@/stores/timerStore';

const timerStore = useTimerStore();
</script>

<style scoped>
@keyframes flash {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }
}

.flash {
    animation: flash 1s infinite;
}
</style>