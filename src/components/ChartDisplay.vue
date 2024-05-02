<template>
  <div
    class="flex p-2 justify-between align-middle text-xs md:text-sm text-sky-200"
  >
    <button
      @click="toggleChartDisplay"
      class="flex my-auto gap-2 justify-items-center text-center font-bold"
    >
      <p v-if="!chartDisplayActive">{{ $t('showChart') }}</p>
      <p v-if="chartDisplayActive">{{ $t('hideChart') }}</p>
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
        :title="$t('every3hourForecastsTitle')"
        @click="showChart('current')"
        :class="{ 'font-bold': selectedChart === 'current' }"
      >
        {{ $t('every3hourForecasts') }}</button
      ><button
        :title="$t('sevenDayTempChartTitle')"
        @click="showChart('weekly')"
        :class="{ 'font-bold': selectedChart === 'weekly' }"
      >
        {{ $t('sevenDayTempChart') }}
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
