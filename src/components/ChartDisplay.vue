<template>
  <div
    class="flex p-2 justify-between align-middle text-xs md:text-sm text-sky-200"
  >
    <button
      @click="toggleChartDisplay"
      class="flex my-auto gap-2 justify-items-center text-center font-bold"
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
    <div v-if="chartDisplayActive" class="flex gap-3">
      <button
        title="逐三小時溫度曲線"
        @click="showChart('current')"
        :class="{ 'font-bold': selectedChart === 'current' }"
      >
        逐三小時預報</button
      ><button
        title="一週溫度曲線"
        @click="showChart('weekly')"
        :class="{ 'font-bold': selectedChart === 'weekly' }"
      >
        一週溫度
      </button>
    </div>
  </div>
  <div v-if="chartDisplayActive">
    <div
      v-if="selectedChart === 'current'"
      class="flex p-3 md:px-12 rounded-lg bg-black/20 text-white"
    >
      <CurrentChart />
    </div>
    <div
      v-if="selectedChart === 'weekly'"
      class="flex p-3 md:px-12 rounded-lg bg-black/20 text-white"
    >
      <WeeklyChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeeklyChart from './WeeklyChart.vue';
import CurrentChart from './CurrentChart.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { ChevronUpIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';

const chartDisplayActive = ref(true);
const selectedChart = ref('current');

// Control chart display
const toggleChartDisplay = () => {
  chartDisplayActive.value = !chartDisplayActive.value;
};

// Control switch between charts
const showChart = (chart: string) => {
  selectedChart.value = chart;
};
</script>
