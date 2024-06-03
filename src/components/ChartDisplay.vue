<template>
  <div class="flex p-2 justify-between align-middle text-sm text-sky-200">
    <button
      @click="toggleChartDisplay"
      class="flex my-auto gap-2 justify-items-center text-center"
    >
      <p :class="{ 'font-bold': !chartDisplayActive }">
        {{ $t(chartDisplayActive ? 'hideChart' : 'showChart') }}
      </p>
      <component
        :is="chartDisplayActive ? ChevronUpIcon : ChevronDownIcon"
        class="h-[14px] w-auto my-auto"
      />
    </button>
    <div v-if="chartDisplayActive" class="flex gap-3 items-center">
      <button
        :title="$t('every3hourForecastsTitle')"
        @click="setSelectedChart('current')"
        :class="buttonClass('current')"
      >
        {{ $t('every3hourForecasts') }}
      </button>
      <span class="opacity-40">|</span>
      <button
        :title="$t('sevenDayTempChartTitle')"
        @click="setSelectedChart('weekly')"
        :class="buttonClass('weekly')"
      >
        {{ $t('sevenDayTempChart') }}
      </button>
    </div>
  </div>
  <div class="rounded-lg overflow-hidden bg-black/20 text-white">
    <div v-if="chartDisplayActive" class="flex p-3 md:p-7 overflow-auto">
      <component :is="selectedChartComponent" height="240"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useChartDisplay } from '@/store/chartDisplay';
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

// Control chart display and switch between charts
const store = useChartDisplay();
const {
  chartDisplayActive,
  selectedChart,
  toggleChartDisplay,
  selectedChartComponent,
} = toRefs(store);

const setSelectedChart = (chartName: string) => {
  selectedChart.value = chartName;
};

const buttonClass = (chartName: string) => ({
  'font-bold': selectedChart.value === chartName,
  'text-white': selectedChart.value === chartName,
});
</script>
