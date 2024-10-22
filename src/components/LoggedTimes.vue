<template>
    <div class="flex flex-col items-center justify-center ">
        <h3 class="text-4xl font-medium mb-4 text-text">Logged Times</h3>
        <div v-if="timerStore.loggedTimes.length >= 1"
            class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-background bg-clip-border">
            <div class="overflow-y-auto max-h-80 w-full">
                <table class="w-full text-center table-auto min-w-max">
                    <thead>
                        <tr class="border-b border-slate-300 bg-background">
                            <th id='table-header-date' class="p-4 text-sm font-normal leading-none text-text">#
                            </th>
                            <th id='table-header-date' class="p-4 text-sm font-normal leading-none text-text">Date
                            </th>
                            <th id='table-header-time' class="p-4 text-sm font-normal leading-none text-text">
                                Logged
                                Time</th>
                            <th id='table-header-break' class="p-4 text-sm font-normal leading-none text-text">
                                Break
                                Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(log, idx) in timerStore.loggedTimes" :key="idx" class="text-center">
                            <td class="p-4 border-b border-slate-200 py-5">
                                <p :id="`table-number-${idx}`" class="block font-semibold text-sm text-text">{{
                                    idx + 1
                                }}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200 py-5">
                                <p :id="`table-date-${idx}`" class="block font-semibold text-sm text-text">{{
                                    log.date
                                }}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200 py-5">
                                <p :id="`table-total-time-${idx}`" class="block font-semibold text-sm text-text">{{
                                    log.totalTime }}</p>
                            </td>
                            <td class="p-4 border-b border-slate-200 py-5">
                                <p :id="`table-break-time-${idx}`" class="block font-semibold text-sm text-text">{{
                                    log.breakTime != null ?
                                        log.breakTime : "No break time" }}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <section v-else class="w-full text-center min-w-max h-12 mt-2">
            <p class="block font-semibold text-sm text-slate-800 text-text italic">No times registered</p>
        </section>

        <div v-if="timerStore.loggedTimes.length >= 1" class="mt-4">
            <button @click="timerStore.clearLogs" class="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                v-if="!timerStore.isRunning">
                Clear data
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTimerStore } from '@/stores/timerStore';
import { onMounted } from 'vue';

const timerStore = useTimerStore();

onMounted(() => {
    timerStore.getLogs();
})
</script>

<style scoped></style>