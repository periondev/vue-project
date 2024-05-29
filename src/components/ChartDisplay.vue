<template>
  <div class="flex p-2 justify-between align-middle text-sm text-sky-200">
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
        @click="selectedChart = 'current'"
        :class="{
          'font-bold': selectedChart === 'current',
        }"
      >
        {{ $t('every3hourForecasts') }}
      </button>
      <span class="opacity-40">|</span>
      <button
        :title="$t('sevenDayTempChartTitle')"
        @click="selectedChart = 'weekly'"
        :class="{
          'font-bold': selectedChart === 'weekly',
        }"
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
</script>
