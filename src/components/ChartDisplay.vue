<template>
  <div
    class="flex p-2 justify-between align-middle text-xs md:text-sm text-sky-200"
  >
    <button
      @click="toggleChartDisplay"
      class="flex my-auto gap-2 justify-items-center text-center"
    >
      <p v-if="!chartDisplayActive" class="font-bold">{{ $t('showChart') }}</p>
      <p v-if="chartDisplayActive">{{ $t('hideChart') }}</p>
      <ChevronDownIcon
        v-if="!chartDisplayActive"
        class="h-[14px] w-auto my-auto"
      />
      <ChevronUpIcon
        v-if="chartDisplayActive"
        class="h-[14px] w-auto my-auto"
      />
    </button>
    <div v-if="chartDisplayActive" class="flex gap-3 items-center">
      <button
        :title="$t('every3hourForecastsTitle')"
        @click="showChart('current')"
        :class="{
          'font-bold': selectedChart === 'current',
        }"
      >
        {{ $t('every3hourForecasts') }}
      </button>
      <span class="opacity-40">|</span>
      <button
        :title="$t('sevenDayTempChartTitle')"
        @click="showChart('weekly')"
        :class="{
          'font-bold': selectedChart === 'weekly',
        }"
      >
        {{ $t('sevenDayTempChart') }}
      </button>
    </div>
  </div>
  <div class="rounded-lg overflow-hidden bg-black/20 text-white">
    <div v-if="chartDisplayActive" class="flex p-2 md:px-4 overflow-auto">
      <CurrentChart
        v-if="selectedChart === 'current'"
        width="1000"
        height="240"
        aria-label="Current Weather Line Chart"
      />
      <WeeklyChart
        v-if="selectedChart === 'weekly'"
        height="240"
        aria-label="Weekly Weather Line Chart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue';
import { useChartDisplay } from '@/store/chartDisplay';
import WeeklyChart from './WeeklyChart.vue';
import CurrentChart from './CurrentChart.vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import { ChevronUpIcon } from '@heroicons/vue/24/solid';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

onBeforeMount(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );
});

// Toggle chart display
const useChartDisplayStore = useChartDisplay();
const { toggleChartDisplay } = useChartDisplay();
const chartDisplayActive = computed(
  () => useChartDisplayStore.chartDisplayActive
);

// Control switch between charts
const selectedChart = ref('current');
const showChart = (chart: string) => {
  selectedChart.value = chart;
};
</script>
