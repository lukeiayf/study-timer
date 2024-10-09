<template>
    <div class="flex flex-col items-center justify-center my-20">
        <h1 class="text-4xl font-bold mb-4">Study Timer</h1>
        <div class="text-9xl font-mono" :class="{ 'flash': timerStore.onBreak }">{{ timerStore.formattedTime
            }}</div>
        <div v-if="timerStore.breakTime || timerStore.onBreak" class="text-2xl font-mono">Time on break: {{
            timerStore.formattedBreakTime
        }}
        </div>
        <div class="flex mt-4 min-w-full justify-center items-center">
            <button id="start-button" @click="timerStore.start" class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                v-if="!timerStore.isRunning">
                {{ timerStore.onBreak ? 'Finish break' : 'Start' }}
            </button>
            <!-- <button @click="timerStore.pause" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                v-if="timerStore.isRunning">
                Pause
            </button> -->
            <button id="take-a-break-button" @click="timerStore.takeBreak"
                class="bg-orange-500 text-white px-4 py-2 rounded mr-2" v-if="timerStore.isRunning">
                Take a break
            </button>
            <button id="log-time-button" v-if="timerStore.isRunning || timerStore.onBreak" @click="timerStore.reset"
                class="bg-red-500 text-white px-4 py-2 rounded">
                Log time
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