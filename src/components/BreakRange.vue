<template>
    <!-- Label displaying the current min and max values -->
    <label for="range-slider" class=" flex gap-2 mb-2 text-lg font-medium text-text">
        Total break limit (in minutes): {{ rangeValues.min <= 60 ? rangeValues.min : 'unlimited' }} <i
            class="hover:cursor-pointer" @click="() => hasCustomBreakTime = !hasCustomBreakTime">
            <img src="@/assets/cog.svg" class="h-6 w-6" />
            </i>
    </label>
    <div class="flex flex-col items-center w-full mx-auto mb-4" v-if="hasCustomBreakTime">

        <div class="w-full flex items-center gap-4">
            <!-- Display min value -->
            <span class="text-text">0</span>

            <!-- Range slider for min value -->
            <input type="range" v-model="rangeValues.min" :min="min" :max="max"
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600" />

            <!-- Display max value -->
            <span class="text-text">60</span>
        </div>
    </div>
    <div class="flex justify-center items-center w-full mx-auto mb-4" v-if="hasCustomBreakTime">
        <button id="take-a-break-button" @click="timerStore.setCustomBreakTime(rangeValues.min)"
            class="flex gap-2 bg-orange-500 text-white px-4 py-2 rounded mr-2 mt-2">
            <i>
                <img src="@/assets/clockOnFire.svg" class="h-6 w-6" />
            </i>
            Set custom break limit
        </button>
        <button id="take-a-break-button" @click="timerStore.setCustomBreakTime(99999)"
            class="flex gap-2 bg-orange-900 text-white px-4 py-2 rounded mr-2 mt-2">
            <i>
                <img src="@/assets/clockOnFire.svg" class="h-6 w-6" />
            </i>
            Set unlimited break limit
        </button>
    </div>
</template>

<script setup lang="ts">
import { useTimerStore } from '@/stores/timerStore';
import { reactive, ref, watch, type Ref } from 'vue';

const timerStore = useTimerStore();
const min = 0;
const max = 60;
const hasCustomBreakTime: Ref<boolean> = ref(false);

const rangeValues = reactive({
    min: timerStore.breakLimit,
    max: max,
});

watch(
    () => timerStore.breakLimit,
    (newLimit) => {
        rangeValues.min = newLimit;
    }
);
</script>