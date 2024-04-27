<template>
  <div
    class="flex py-2 px-3 justify-start align-middle"
    @click="toggleChartDisplay"
  >
    <button
      class="flex gap-2 justify-items-center text-center font-bold text-xs md:text-sm text-sky-200"
    >
      <p v-if="!chartDisplayActive">展開折線圖</p>
      <p v-if="chartDisplayActive">收起折線圖</p>
      <ChevronDownIcon
        v-if="!chartDisplayActive"
        class="h-[14px] w-auto hover:scale-110 duration-150 cursor-pointer my-auto"
      />
      <ChevronUpIcon
        v-if="chartDisplayActive"
        class="h-[14px] w-auto hover:scale-110 duration-150 cursor-pointer my-auto"
      />
    </button>
  </div>
  <div
    v-show="chartDisplayActive"
    class="flex p-3 md:px-12 rounded-lg bg-black/20 text-white"
  >
    <WeeklyChart />
  </div>
</template>

<script setup lang="ts">
import WeeklyChart from './WeeklyChart.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { ChevronUpIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

// Control chart display
const chartDisplayActive = ref(true);
const toggleChartDisplay = () => {
  chartDisplayActive.value = !chartDisplayActive.value;
};
</script>
