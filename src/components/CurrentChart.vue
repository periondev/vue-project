<template>
  <Line
    v-if="chartDataReady"
    :options="chartOptions"
    :data="chartData"
    aria-label="Current Weather Line Chart"
    width="1000"
  />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue';
import { useCurrentWeather } from '@/store/currentWeather';
import { Line } from 'vue-chartjs';
import i18n from '../utils/vue-i18n';
const { t } = i18n.global;
const currentStore = useCurrentWeather();
const { currentChartData } = toRefs(currentStore);

// (在渲染組件前) 檢查currentChartData是否已定義並包含有效數據
const chartDataReady = computed(() => {
  return currentChartData.value.date && currentChartData.value.date.length > 0;
});

// Chart data of current weather forecast
const chartData = computed(() => ({
  labels: currentChartData.value.date,
  datasets: [
    {
      label: t('temp'),
      data: currentChartData.value.temp,
      backgroundColor: '#a5f3fc',
      borderColor: '#a5f3fc',
      hoverRadius: 6,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4,
      datalabels: {
        color: '#fff',
        align: 'end' as const,
        anchor: 'start' as const,
        font: {
          weight: 'bold' as const,
        },
      },
    },
    {
      label: t('apparentTemp'),
      data: currentChartData.value.at,
      backgroundColor: '#fb923c',
      borderColor: '#fb923c',
      hoverRadius: 6,
      cubicInterpolationMode: 'monotone' as const,
      tension: 0.4,
      datalabels: {
        color: '#fff',
        align: 'end' as const,
        anchor: 'start' as const,
        font: {
          weight: 'bold' as const,
        },
      },
    },
  ],
}));
// Chart options
const chartOptions = computed(() => ({
  responsive: false, // set false to enable overflow canvas with scrollbar
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: 'start' as const,
      labels: {
        boxWidth: 24,
        boxHeight: 10,
        color: '#fff',
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: '#3f3f46',
      },
      ticks: {
        color: '#d4d4d4',
        autoSkip: false, // Disable automatic skipping
        maxRotation: 0, // Disable rotation
      },
    },
    y: {
      grid: {
        color: '#3f3f46',
      },
      ticks: {
        color: '#d4d4d4',
      },
      suggestedMax: 32,
      suggestedMin: 20,
    },
  },
}));
</script>
