<template>
    <div class="flex flex-col items-center justify-center my-10">
        <h1 class="text-4xl font-bold mb-4 text-text">Study Timer</h1>
        <div class="text-9xl font-mono text-text" :class="{ 'flash': timerStore.onBreak }">{{ timerStore.formattedTime
            }}</div>
        <div v-if="timerStore.breakTime || timerStore.onBreak" class="text-2xl font-mono text-text">Time on break: {{
            timerStore.formattedBreakTime
        }}
        </div>
        <div class="flex mt-4 min-w-full justify-center items-center">
            <button id="start-button" @click="timerStore.start"
                class="flex gap-2 bg-secondary text-white px-4 py-2 rounded mr-2" v-if="!timerStore.isRunning">
                <i>
                    <img src="@/assets/playPause.svg" class="h-6 w-6" />
                </i>
                {{ timerStore.onBreak ? 'Finish break' : 'Start' }}
            </button>
            <!-- <button @click="timerStore.pause" class="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                v-if="timerStore.isRunning">
                Pause
            </button> -->
            <button id="take-a-break-button" @click="timerStore.takeBreak"
                class="flex gap-2 bg-orange-500 text-white px-4 py-2 rounded mr-2" v-if="timerStore.isRunning">
                <i>
                    <img src="@/assets/coffee.svg" class="h-6 w-6" />
                </i>
                Take a break
            </button>
            <button id="log-time-button" v-if="timerStore.isRunning || timerStore.onBreak" @click="timerStore.reset"
                class="flex gap-2 bg-red-500 text-white px-4 py-2 rounded">
                <i>
                    <img src="@/assets/clockCheckmark.svg" class="h-6 w-6" />
                </i>
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